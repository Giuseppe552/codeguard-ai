
<h1 align="center">CodeGuard AI — Client-Side Secure Code Scanner</h1>
<p align="center">
  <em>AI-powered static analysis for JavaScript & Python — all offline, privacy-first.</em>
</p>



---

## 🔍 About the Project
CodeGuard AI is a **privacy-first static analysis tool** designed to detect **security vulnerabilities, secrets, and risky code patterns** in JavaScript and Python.  
Unlike many online scanners, **it never uploads your code** — every scan runs fully in your browser, so your intellectual property stays secure.

I built this to push my skills into **software security tooling**, inspired by how modern security teams at companies like Google, Microsoft, and Meta approach code safety.  
This project is part of my journey toward building **production-grade, developer-friendly tools** that can integrate seamlessly into real engineering workflows.

---

## 🚀 Features
- **JavaScript security checks**  
  Detect dangerous DOM sinks (`innerHTML`, `document.write`), unsafe JS eval patterns, and `child_process` usage.
- **Python security checks**  
  Flag `os.system`, `subprocess` with `shell=True`, unsafe `pickle` and `yaml.load`.
- **Secrets detection**  
  Spot API keys, tokens, and credentials hidden in source.
- **Risk scoring**  
  Severity-based risk score (0–100) with a clear breakdown of findings.
- **Client-side only**  
  No server calls, no uploads, no tracking.

---

## 💡 Why I Built This
Cybersecurity is moving faster than ever — with AI in the mix, the gap between developer speed and secure code can grow dangerously wide.  
I wanted to explore how far we can go **combining static analysis with AI hints**, while keeping everything **offline** to protect code privacy.  
This project is also a personal step toward **enterprise-level developer tooling**, where reliability and trust are paramount.

---


## 🛠 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Giuseppe552/codeguard-ai.git
cd codeguard-ai
```

## 2. Install dependencies
```bash
npm install
```
## 3. Run locally
```bash
npx http-server public -p 5175 -c-1
```

## 4. Open in your browser

http://127.0.0.1:5175

---

## 📸 UI Preview
Here's a look at the scanning interface:
<img width="937" height="625" alt="codeguard-AI" src="https://github.com/user-attachments/assets/dd6c265e-8eed-48f9-b749-a852617a8b31" />

---


## License
This project is licensed under the MIT License

---

<p align="center"> Built with HTML, CSS, and JavaScript — No external libraries — by <a href="https://github.com/Giuseppe552">Giuseppe</a> </p> 






