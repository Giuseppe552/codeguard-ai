// Import rules + engine from files now inside /public
import { runRules } from "./scanner/scan.js";
import { jsRules } from "./scanner/rules/javascript.js";
import { pyRules } from "./scanner/rules/python.js";

const el = (q) => document.querySelector(q);
const out = el("#output");
const paste = el("#pasteArea");
const scanBtn = el("#scanPaste");
const summary = el("#summary");
const meterFill = el("#meterFill");
const meterScore = el("#meterScore");
const examples = el("#examples");
const copyBtn = el("#copyReport");
const dlBtn = el("#downloadReport");

let lastReport = null;

function detectLang(text) {
  if (/^\s*(def |import |from |class )/m.test(text)) return "python";
  if (/^\s*(function |const |let |var |import )/m.test(text)) return "javascript";
  if (text.includes("=>") || text.includes("console.")) return "javascript";
  return "javascript";
}

function badge(sev) {
  const s = sev.toLowerCase();
  return `<span class="badge ${s}">${s.toUpperCase()}</span>`;
}

function render(findings) {
  if (!findings.length) {
    out.innerHTML = `<div class="ok">✅ No obvious risky patterns found.</div>`;
    summary.innerHTML = `0 High • 0 Medium • 0 Low`;
    meterFill.style.width = "0%";
    meterFill.style.background = "var(--ok)";
    meterScore.textContent = "0/100";
    lastReport = { score: 0, counts: { high: 0, medium: 0, low: 0 }, findings: [] };
    return;
  }

  // Count + score (client-side quick aggregation)
  const counts = { high: 0, medium: 0, low: 0 };
  const sevScore = { low: 10, medium: 20, high: 35 };
  let score = 0;
  for (const f of findings) { counts[f.severity]++; score += sevScore[f.severity] || 0; }
  score = Math.min(100, score);

  summary.innerHTML = `
    <span class="dot high"></span> ${counts.high} High
    <span class="dot medium"></span> ${counts.medium} Medium
    <span class="dot low"></span> ${counts.low} Low
  `;
  meterFill.style.width = `${score}%`;
  meterFill.style.background = score >= 70 ? "var(--danger)" :
                               score >= 30 ? "var(--warn)" : "var(--ok)";
  meterScore.textContent = `${score}/100`;

  const frag = document.createDocumentFragment();
  findings.slice(0, 300).forEach(f => {
    const div = document.createElement("div");
    div.className = "finding";
    div.innerHTML = `
      ${badge(f.severity)} <strong>${f.title}</strong> <span class="muted"> (L${f.line})</span>
      <div class="message">${f.message}</div>
      <pre class="code">${f.excerpt}</pre>
    `;
    frag.appendChild(div);
  });
  out.innerHTML = "";
  out.appendChild(frag);

  lastReport = { score, counts, findings };
}

scanBtn.addEventListener("click", () => {
  const code = paste.value.trim();
  if (!code) {
    out.textContent = "Paste some JS or Python code first.";
    return;
  }
  const lang = detectLang(code);
  const rules = lang === "python" ? pyRules : jsRules;
  const findings = runRules(code, rules);
  render(findings);
});

examples.addEventListener("click", (e) => {
  const id = e.target?.dataset?.ex;
  if (!id) return;
  let code = "";
  if (id === "xss") {
    code = `const q = new URLSearchParams(location.search).get('q');
element.innerHTML = q; // XSS sink`;
  } else if (id === "secrets") {
    code = `const API_KEY = "sk_live_1234567890abcdef";
fetch("https://api.example.com?token=" + API_KEY);`;
  } else if (id === "python") {
    code = `import os, subprocess, yaml
cmd = input("Command: ")
subprocess.run(cmd, shell=True)  # command injection
data = yaml.load(open("cfg.yaml"))  # unsafe load`;
  }
  paste.value = code;
  scanBtn.click();
});

copyBtn.addEventListener("click", () => {
  if (!lastReport) return;
  navigator.clipboard.writeText(JSON.stringify(lastReport, null, 2));
  copyBtn.textContent = "Copied!";
  setTimeout(() => (copyBtn.textContent = "Copy JSON"), 900);
});

dlBtn.addEventListener("click", () => {
  if (!lastReport) return;
  const blob = new Blob([JSON.stringify(lastReport, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `codeguard-report-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
});

// --- UX: Ctrl/Cmd+Enter to scan ---
document.addEventListener("keydown", (e) => {
  const mod = e.ctrlKey || e.metaKey;
  if (mod && e.key === "Enter") {
    e.preventDefault();
    scanBtn.click();
  }
});

// --- Persist textarea across refresh ---
const LS_KEY = "codeguard.paste";
try {
  const saved = localStorage.getItem(LS_KEY);
  if (saved) paste.value = saved;
  paste.addEventListener("input", () => {
    localStorage.setItem(LS_KEY, paste.value);
  });
} catch {}
