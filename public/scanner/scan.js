import fs from "fs";
import path from "path";
import fg from "fast-glob";
import { jsRules } from "./rules/javascript.js";
import { pyRules } from "./rules/python.js";

const EXT_TO_LANG = {
  ".js": "javascript",
  ".mjs": "javascript",
  ".cjs": "javascript",
  ".jsx": "javascript",
  ".ts": "javascript",
  ".py": "python"
};

const RULESETS = { javascript: jsRules, python: pyRules };
const SEVERITY_SCORE = { low: 10, medium: 20, high: 35 };

export async function scanFolder(root, globs = ["**/*.{js,mjs,cjs,jsx,ts,py}"]) {
  const files = await fg(globs, {
    cwd: root,
    ignore: ["**/node_modules/**", "**/.venv/**", "**/dist/**", "**/build/**"]
  });

  const results = [];
  for (const rel of files) {
    const filePath = path.join(root, rel);
    const ext = path.extname(filePath);
    const lang = EXT_TO_LANG[ext];
    if (!lang) continue;

    const source = fs.readFileSync(filePath, "utf8");
    const rules = RULESETS[lang] || [];
    const findings = runRules(source, rules);

    if (findings.length) results.push({ file: rel, lang, findings });
  }

  const { score, counts } = aggregate(results);
  return { score, counts, results };
}

export function runRules(source, rules) {
  const findings = [];
  const lines = source.split(/\r?\n/);

  for (const rule of rules) {
    const rx = new RegExp(rule.pattern);
    if (!rx.test(source)) continue;

    lines.forEach((line, idx) => {
      if (new RegExp(rule.pattern).test(line)) {
        findings.push({
          ruleId: rule.id,
          title: rule.title,
          severity: rule.severity,
          message: rule.message,
          line: idx + 1,
          excerpt: line.trim().slice(0, 200)
        });
      }
    });
  }
  return findings;
}

function aggregate(results) {
  let score = 0;
  const counts = { high: 0, medium: 0, low: 0 };

  for (const r of results) {
    for (const f of r.findings) {
      counts[f.severity]++;
      score += SEVERITY_SCORE[f.severity] || 0;
    }
  }
  return { score: Math.min(100, score), counts };
}
