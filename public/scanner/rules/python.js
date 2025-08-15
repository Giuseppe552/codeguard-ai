export const pyRules = [
  {
    id: "PY_EVAL_EXEC",
    title: "eval/exec usage",
    severity: "high",
    message: "Avoid executing dynamic strings.",
    pattern: /\b(eval|exec)\s*\(/g
  },
  {
    id: "PY_OS_SYSTEM",
    title: "os.system / subprocess shell=True",
    severity: "high",
    message: "Command execution risk (command injection).",
    pattern: /\bos\.system\s*\(|subprocess\.(Popen|run|call)\s*\([^)]*shell\s*=\s*True/g
  },
  {
    id: "PY_PICKLE",
    title: "pickle load",
    severity: "high",
    message: "Unpickling untrusted data can execute code.",
    pattern: /\bpickle\.(load|loads)\s*\(/g
  },
  {
    id: "PY_YAML_LOAD",
    title: "yaml.load without SafeLoader",
    severity: "medium",
    message: "Use yaml.safe_load to avoid arbitrary object creation.",
    pattern: /\byaml\.load\s*\(/g
  },
  {
    id: "PY_REQUESTS_VERIFY",
    title: "requests verify=False",
    severity: "medium",
    message: "TLS verification disabled — MITM risk.",
    pattern: /\brequests\.(get|post|put|delete|patch)\s*\([^)]*verify\s*=\s*False/g
  },
  {
    id: "PY_SECRETS",
    title: "Possible hardcoded secret",
    severity: "high",
    message: "Detected likely credentials in code.",
    pattern: /(?i)(secret|api[_-]?key|token|password)\s*=\s*['"][A-Za-z0-9_\-]{10,}['"]/g
  }
];
