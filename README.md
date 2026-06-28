# proposal.vaked.dev
> Interactive proposal site for integrating `kompress-ultra` into Headroom.

**Live URL:** [https://proposal.vaked.dev](https://proposal.vaked.dev)  
**GitHub Repository:** [https://github.com/peterlodri-sec/proposal.vaked.dev](https://github.com/peterlodri-sec/proposal.vaked.dev)

---

## 🛠️ Quick Start (For Humans & AI Agents)

This is a **zero-build-step, pure static website** utilizing HTML5, Tailwind CSS (via CDN), and Vanilla JavaScript. 

### 1. Local Development
To run the website locally, spin up any static file server from the root directory:

```bash
# Using Python
python3 -m http.server 8000

# Using Node / npx
npx serve

# Using Bun
bunx serve .
```
Open [http://localhost:8000](http://localhost:8000) in your browser.

### 2. Project Structure
* [index.html](index.html) - The main webpage layout, styled with Tailwind CSS, including the Hero, Paradox Simulator, and Benchmarks.
* [app.js](app.js) - Contains the interactive logic for the **Context Compressor Playground** and the **Voting Ensemble Paradox Simulator**.

---

## 🚀 Deployment & Domain Mapping

* **Hosting Platform:** [Cloudflare Pages](https://pages.cloudflare.com/)
* **Deployment Pipeline:** Connected directly to the `main` branch of this GitHub repository. 
* **CI/CD Behavior:** Any commit pushed to the `main` branch triggers an automatic build and deployment on Cloudflare.
* **Custom Domain:** Configured in the Cloudflare Pages dashboard as `proposal.vaked.dev` (proxied through Cloudflare DNS).

---

## 🧠 Ecosystem Context

This repository is a presentation layer for a larger research and development ecosystem:

1. **[ultrameshai](https://github.com/peterlodri-sec/ultrameshai) (The Substrate):** The big-picture decentralized agent stack (UDS, framed Protobuf, capability-based routing, and sandboxed runtimes).
2. **`kompress-ultra` (The Memory Engine):** The ModernBERT-based context compression model (`kompress-v8`) described on this site, designed to make long-running agent loops cheap and fast.
3. **[loopkit](https://github.com/peterlodri-sec/loopkit):** The four-phase autonomous state machine that orchestrated the training runs for the `kompress` model series.
4. **[pocoo.vaked.dev](https://pocoo.vaked.dev):** The chronological log registry hosting the telemetry and results of all training runs.
5. **[headroom](https://github.com/headroomlabs-ai/headroom):** The agent framework where this compression technology is being proposed as a core middleware (PR #1419 / PR #1400).
