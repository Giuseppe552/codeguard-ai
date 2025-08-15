# CodeGuard AI - Client-side Secure Code Scanner

CodeGuard AI is a privacy-first static analyzer for JavaScript and Python that runs entirely in the browser.
Paste a snippet or scan files locally to get a 0-100 risk score, transparent findings, and actionable fixes.
No uploads or tracking.

Live demo:
https://giuseppe552.github.io/codeguard-ai/

## Why this matters
- Demonstrates secure coding awareness and practical SAST-style rules
- Clear severity, line numbers, and remediation guidance
- Local / offline by design for safety with code snippets

## Checks
- XSS sinks: innerHTML, document.write, dangerous DOM patterns
- JS exec: eval, new Function, child_process.exec/spawn
- Python exec: eval/exec, os.system, subprocess(... shell=True)
- Unsafe deserialization: pickle.load/loads
- Config pitfalls: yaml.load without SafeLoader, requests(... verify=False)
- Secrets: API keys, tokens, passwords in code

## Run locally
npx http-server public -p 5175 -c-1
then open http://127.0.0.1:5175

## Roadmap
- Simple taint-style input-to-sink tracing
- More secret detectors and SARIF export
- VS Code extension wrapper

(c) 2025 Giuseppe - MIT
