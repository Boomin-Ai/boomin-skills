#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const skill = path.join(root, "SKILL.md");
const text = fs.readFileSync(skill, "utf8");

const required = [
  /^---\nname: boomin-referral-installer\n/m,
  /description: .+Boomin.+referral/m,
  /npx @boomin\/cli@latest doctor --json/,
  /npx @boomin\/cli@latest mcp install/,
  /npx @boomin\/cli@latest referral init/,
];

const failures = required.filter((pattern) => !pattern.test(text));
if (failures.length) {
  console.error(`Skill validation failed: ${failures.length} required patterns missing.`);
  process.exit(1);
}

for (const file of ["references/next.md", "references/troubleshooting.md"]) {
  if (!fs.existsSync(path.join(root, file))) {
    console.error(`Missing ${file}`);
    process.exit(1);
  }
}

console.log("Boomin skill validation passed.");
