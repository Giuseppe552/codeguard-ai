export const jsRules = [
  {
    id: "JS_EVAL",
    title: "Use of eval()",
    severity: "high",
    message: "eval() executes arbitrary code; avoid it.",
    pattern: /\beval\s*\(/g
  },
  {
    id: "JS_NEW_FUNCTION",
    title: "Use of new Function()",
    severity: "high",
    message: "Dynamic code generation is dangerous.",
    pattern: /\bnew\s+Function\s*\(/g
  },
  {
    id: "JS_INNER_HTML",
    title: "Assignment to innerHTML",
    severity: "medium",
    message: "innerHTML is an XSS sink. Prefer textContent or templating.",
    pattern: /\.innerHTML\s*=\s*/g
  },
  {
    id: "JS_DOCUMENT_WRITE",
    title: "document.write",
    severity: "medium",
    message: "Legacy sink; can inject HTML/JS into DOM.",
    pattern: /\bdocument\.write\s*\(/g
  },
  {
    id: "JS_CHILD_PROCESS",
    title: "child_process exec/spawn",
    severity: "high",
    message: "Command execution risk (command injection).",
    pattern: /\bchild_process\.(exec|execSync|spawn|spawnSync)\s*\(/g
  },
  {
    id: "JS_SECRETS",
    title: "Possible hardcoded secret",
    severity: "high",
    message: "Detected likely API key/secret in source.",
    pattern: /(AKIA[0-9A-Z]{16})|(?i)(secret|api[_-]?key|token)\s*[:=]\s*['"][A-Za-z0-9_\-]{16,}['"]/g
  }
];
