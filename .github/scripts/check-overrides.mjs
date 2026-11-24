// Checks whether each entry in package.json "pnpm.overrides" is still needed.
//
// For every override, it re-resolves the dependency tree WITHOUT the overrides
// (lockfile-only, in a temp dir) and looks at which versions of that package the
// upstream dependency ranges would pull in on their own. If every resolved
// version is >= the override's minimum version (e.g. "^7.1.3" -> 7.1.3), the
// override is redundant and can be removed.
//
// Outputs (when running in GitHub Actions):
//   - step summary table
//   - `removable` output: space-separated list of removable override keys

import { execFileSync } from "node:child_process";
import { appendFileSync, copyFileSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const overrides = pkg.pnpm?.overrides ?? {};
const keys = Object.keys(overrides);

if (keys.length === 0) {
  console.log("No pnpm.overrides found. Nothing to check.");
  process.exit(0);
}

// "sockjs>uuid" -> "uuid", "@scope/pkg@1" -> "@scope/pkg"
const packageName = (key) => {
  const last = key.split(">").pop();
  const m = last.match(/^(@?[^@]+)/);
  return m[1];
};

// "^7.1.3" / "~7.1.3" / ">=7.1.3" / "7.1.3" -> [7, 1, 3]
const minVersion = (range) => {
  const m = String(range).match(/(\d+)\.(\d+)\.(\d+)/);
  if (!m) throw new Error(`Cannot parse minimum version from override range "${range}"`);
  return m.slice(1).map(Number);
};

const gte = (a, b) => {
  for (let i = 0; i < 3; i++) {
    if (a[i] !== b[i]) return a[i] > b[i];
  }
  return true;
};

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Resolve the dependency tree without overrides in an isolated temp dir.
const dir = mkdtempSync(join(tmpdir(), "override-check-"));
try {
  const stripped = structuredClone(pkg);
  delete stripped.pnpm.overrides;
  if (Object.keys(stripped.pnpm).length === 0) delete stripped.pnpm;
  writeFileSync(join(dir, "package.json"), JSON.stringify(stripped, null, 2) + "\n");
  copyFileSync("pnpm-lock.yaml", join(dir, "pnpm-lock.yaml"));

  execFileSync("pnpm", ["install", "--lockfile-only", "--ignore-scripts", "--no-frozen-lockfile"], {
    cwd: dir,
    stdio: ["ignore", "ignore", "inherit"],
  });

  const lock = readFileSync(join(dir, "pnpm-lock.yaml"), "utf8");

  const results = keys.map((key) => {
    const name = packageName(key);
    const min = minVersion(overrides[key]);
    const re = new RegExp(`^  '?${escapeRe(name)}@(\\d+)\\.(\\d+)\\.(\\d+)[^:']*'?:`, "gm");
    const versions = new Map();
    for (const m of lock.matchAll(re)) {
      versions.set(`${m[1]}.${m[2]}.${m[3]}`, [m[1], m[2], m[3]].map(Number));
    }
    const removable = [...versions.values()].every((v) => gte(v, min));
    return { key, range: overrides[key], resolved: [...versions.keys()], removable };
  });

  const rows = results.map(
    (r) =>
      `| \`${r.key}\` | \`${r.range}\` | ${r.resolved.length ? r.resolved.join(", ") : "(not in tree)"} | ${
        r.removable ? "✅ removable" : "still needed"
      } |`,
  );
  const table = [
    "| Override | Range | Resolved without override | Status |",
    "|---|---|---|---|",
    ...rows,
  ].join("\n");
  console.log(table);

  const removable = results.filter((r) => r.removable).map((r) => r.key);
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, `## pnpm overrides check\n\n${table}\n`);
  }
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, `removable=${removable.join(" ")}\n`);
    appendFileSync(process.env.GITHUB_OUTPUT, `table<<EOF\n${table}\nEOF\n`);
  }
} finally {
  rmSync(dir, { recursive: true, force: true });
}
