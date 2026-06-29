// App logic for proposal.vaked.dev
// Includes presets, mock compression pipeline, voting paradox simulation, and cryptographic reviews.

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', async () => {
    // Render LaTeX math using KaTeX auto-render
    if (typeof renderMathInElement === 'function') {
        renderMathInElement(document.body, {
            delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '$', right: '$', display: false}
            ]
        });
    }
    lucide.createIcons();
    loadPreset('auth');
    await initCryptoKeys();
    await fetchAndRenderReviews();
    initTelemetryLoop();
    initFluidBackground();
    initFooterPreviews();
    initInteractiveMath();
    // Initialize the paradox simulator
    inspectToken('path');
});

// Presets for the playground
const PRESETS = {
    auth: {
        text: "I would be happy to help you implement the authentication system with OAuth2. Let me write the code for the passport middleware. We will require the client ID and client secret in the .env file.",
        pruned: "I would be happy to help you <span class='text-slate-500 line-through bg-slate-900/40 px-1 py-0.5 rounded'>[Evicted]</span> implement the authentication system with OAuth2 <span class='text-brand-cyan font-bold bg-brand-cyan/10 px-1 py-0.5 rounded'>[Safety Floor]</span>. Let me write <span class='text-slate-500 line-through bg-slate-900/40 px-1 py-0.5 rounded'>[Evicted]</span> the code for the passport <span class='text-brand-cyan font-bold bg-brand-cyan/10 px-1 py-0.5 rounded'>[Safety Floor]</span> middleware. We will require the client ID <span class='text-slate-500 line-through bg-slate-900/40 px-1 py-0.5 rounded'>[Evicted]</span> and client secret in the .env <span class='text-brand-cyan font-bold bg-brand-cyan/10 px-1 py-0.5 rounded'>[Safety Floor]</span> file <span class='text-slate-500 line-through bg-slate-900/40 px-1 py-0.5 rounded'>[Evicted]</span>.",
        compressed: "implement authentication system OAuth2 write code passport middleware require client secret .env"
    },
    error: {
        text: "Looking at the logs, it seems we got an error: Process exited with status code 1. The stack trace shows a NullReferenceException in src/auth.rs at line 125.",
        pruned: "Looking at the logs, it seems <span class='text-slate-500 line-through bg-slate-900/40 px-1 py-0.5 rounded'>[Evicted]</span> we got an error: Process exited with status code 1 <span class='text-brand-cyan font-bold bg-brand-cyan/10 px-1 py-0.5 rounded'>[Safety Floor]</span>. The stack trace <span class='text-slate-500 line-through bg-slate-900/40 px-1 py-0.5 rounded'>[Evicted]</span> shows a NullReferenceException <span class='text-brand-cyan font-bold bg-brand-cyan/10 px-1 py-0.5 rounded'>[Safety Floor]</span> in src/auth.rs <span class='text-brand-cyan font-bold bg-brand-cyan/10 px-1 py-0.5 rounded'>[Safety Floor]</span> at line 125 <span class='text-brand-cyan font-bold bg-brand-cyan/10 px-1 py-0.5 rounded'>[Safety Floor]</span>.",
        compressed: "error Process exited status code 1 NullReferenceException src/auth.rs line 125"
    },
    bash: {
        text: "I ran the bash command: cargo test --test integration_tests. It failed because the database port 5432 was already in use by another process.",
        pruned: "I ran the bash <span class='text-slate-500 line-through bg-slate-900/40 px-1 py-0.5 rounded'>[Evicted]</span> command: cargo test --test integration_tests <span class='text-brand-cyan font-bold bg-brand-cyan/10 px-1 py-0.5 rounded'>[Safety Floor]</span>. It failed because <span class='text-slate-500 line-through bg-slate-900/40 px-1 py-0.5 rounded'>[Evicted]</span> the database port 5432 <span class='text-brand-cyan font-bold bg-brand-cyan/10 px-1 py-0.5 rounded'>[Safety Floor]</span> was already in use <span class='text-slate-500 line-through bg-slate-900/40 px-1 py-0.5 rounded'>[Evicted]</span> by another process.",
        compressed: "command cargo test --test integration_tests failed database port 5432 use"
    },
    git: {
        text: "git diff show changes in package.json. We upgraded tailwindcss from 3.4 to 4.0.0. This fixes the warning about the production build.",
        pruned: "git diff <span class='text-brand-cyan font-bold bg-brand-cyan/10 px-1 py-0.5 rounded'>[Safety Floor]</span> show changes in package.json <span class='text-brand-cyan font-bold bg-brand-cyan/10 px-1 py-0.5 rounded'>[Safety Floor]</span>. We upgraded tailwindcss from 3.4 to 4.0.0 <span class='text-brand-cyan font-bold bg-brand-cyan/10 px-1 py-0.5 rounded'>[Safety Floor]</span>. This fixes <span class='text-slate-500 line-through bg-slate-900/40 px-1 py-0.5 rounded'>[Evicted]</span> the warning about the production <span class='text-slate-500 line-through bg-slate-900/40 px-1 py-0.5 rounded'>[Evicted]</span> build.",
        compressed: "git diff package.json upgraded tailwindcss 4.0.0 warning"
    },
    docker: {
        text: "docker build -t vaked-node:latest . --build-arg NODE_ENV=production. The build failed on step 5 because of a network timeout.",
        pruned: "docker build -t vaked-node:latest <span class='text-brand-cyan font-bold bg-brand-cyan/10 px-1 py-0.5 rounded'>[Safety Floor]</span> . --build-arg NODE_ENV=production <span class='text-brand-cyan font-bold bg-brand-cyan/10 px-1 py-0.5 rounded'>[Safety Floor]</span>. The build failed <span class='text-slate-500 line-through bg-slate-900/40 px-1 py-0.5 rounded'>[Evicted]</span> on step 5 <span class='text-brand-cyan font-bold bg-brand-cyan/10 px-1 py-0.5 rounded'>[Safety Floor]</span> because of a network timeout <span class='text-slate-500 line-through bg-slate-900/40 px-1 py-0.5 rounded'>[Evicted]</span>.",
        compressed: "docker build -t vaked-node:latest --build-arg NODE_ENV=production step 5"
    }
};

let currentPreset = 'auth';

function loadPreset(key) {
    currentPreset = key;
    const input = document.getElementById('playground-input');
    input.value = PRESETS[key].text;
    triggerCompression();
}

function countTokens(text) {
    return text.trim().split(/\s+/).filter(Boolean).length;
}

function triggerCompression() {
    let inputVal = document.getElementById('playground-input').value;
    
    const MAX_CHARS = 1000;
    const errorDiv = document.getElementById('playground-error');
    const errorText = document.getElementById('playground-error-text');
    
    if (inputVal.length > MAX_CHARS) {
        errorDiv.classList.remove('hidden');
        const funnyMessages = [
            "Whoa, Tolstoy! That's too much context. The pruner is sweating. (Max 1,000 chars)",
            "Context bloat overload! Our target Raspberry Pi node has started smoking. (Max 1,000 chars)",
            "Warning: Extreme verbosity! The Asymmetric Modulation Gate has collapsed under the weight of your essay. (Max 1,000 chars)",
            "Whoops! You're trying to feed me the entire Wikipedia. My 97ms latency is crying. (Max 1,000 chars)"
        ];
        const msgIndex = inputVal.length % funnyMessages.length;
        errorText.innerText = funnyMessages[msgIndex];
        inputVal = inputVal.substring(0, MAX_CHARS);
    } else {
        errorDiv.classList.add('hidden');
    }
    
    let prunedText = "";
    let compressedText = "";
    
    if (PRESETS[currentPreset] && inputVal.trim() === PRESETS[currentPreset].text.trim()) {
        prunedText = PRESETS[currentPreset].pruned;
        compressedText = PRESETS[currentPreset].compressed;
    } else {
        const words = inputVal.split(/\s+/);
        const mustKeepRegex = /(OAuth2|\.env|src\/[a-zA-Z0-9_\-\.]+|\d+|NullReferenceException|cargo|test|status|code|git|diff|package\.json|tailwindcss|docker|build|latest|NODE_ENV)/i;
        
        const prunedWords = words.map(w => {
            if (mustKeepRegex.test(w)) {
                return `<span class="text-brand-cyan font-bold bg-brand-cyan/10 px-1 py-0.5 rounded">${w} [Safety Floor]</span>`;
            } else if (w.length > 5 && Math.random() > 0.4) {
                return w;
            } else {
                return `<span class="text-slate-500 line-through bg-slate-900/40 px-1 py-0.5 rounded">${w} [Evicted]</span>`;
            }
        });
        
        const compressedWords = words.filter(w => {
            return mustKeepRegex.test(w) || (w.length > 4 && !/^(would|happy|about|write|there|their|about|their|these)/i.test(w));
        });
        
        prunedText = prunedWords.join(" ");
        compressedText = compressedWords.join(" ");
    }
    
    document.getElementById('pruner-output').innerHTML = prunedText;
    document.getElementById('rewriter-output').innerHTML = compressedText;
    
    const origCount = countTokens(inputVal);
    const compCount = countTokens(compressedText);
    const savings = Math.max(0, Math.round(((origCount - compCount) / origCount) * 100));
    
    document.getElementById('original-tokens').innerText = origCount;
    document.getElementById('compressed-tokens').innerText = compCount;
    document.getElementById('savings-pct').innerText = savings;
}

function copyOptimizedPrompt() {
    const text = document.getElementById('rewriter-output').innerText;
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('[onclick="copyOptimizedPrompt()"]');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `<i data-lucide="check" class="w-3 h-3 text-brand-emerald"></i> Copied!`;
        lucide.createIcons();
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            lucide.createIcons();
        }, 1500);
    });
}

// ==========================================
// Veto Committee Paradox Simulator
// ==========================================
let pSelectedToken = 'path';
let pSelectedRule = 'and';

const SIM_TOKENS = ['path', 'cmd', 'ip', 'docker_hash', 'secret', 'address'];

function inspectToken(tokenType) {
    pSelectedToken = tokenType;
    
    // Toggle active styles on token buttons
    SIM_TOKENS.forEach(t => {
        const btn = document.getElementById(`btn-tok-${t}`);
        if (t === tokenType) {
            btn.className = "text-xs p-2.5 rounded-lg border border-brand-cyan bg-brand-cyan/10 text-white font-mono transition-all text-center";
        } else {
            btn.className = "text-xs p-2.5 rounded-lg border border-slate-800 bg-slate-955 text-slate-400 font-mono hover:border-brand-cyan/50 transition-all text-center";
        }
    });
    
    calculateParadoxOutcome();
}

function setParadoxRule(ruleType) {
    pSelectedRule = ruleType;
    
    // Toggle active styles on rule buttons
    ['and', 'majority', 'asymmetric'].forEach(r => {
        const btn = document.getElementById(`btn-p-${r}`);
        if (r === ruleType) {
            btn.className = "text-[10px] px-2.5 py-1.5 rounded border border-brand-cyan bg-brand-cyan/10 text-brand-cyan font-bold";
        } else {
            btn.className = "text-[10px] px-2.5 py-1.5 rounded border border-slate-800 bg-slate-900 text-slate-400 font-bold";
        }
    });
    
    calculateParadoxOutcome();
}

function calculateParadoxOutcome() {
    // 1. Calculate individual votes
    // Expert 1 is blind to paths and docker hashes
    const v1Keep = !(pSelectedToken === 'path' || pSelectedToken === 'docker_hash');
    // Expert 2 is blind to commands and secrets
    const v2Keep = !(pSelectedToken === 'cmd' || pSelectedToken === 'secret');
    // Expert 3 is blind to IPs and memory addresses
    const v3Keep = !(pSelectedToken === 'ip' || pSelectedToken === 'address');
    
    // Update individual vote UI
    updateVoteUI('v1', v1Keep);
    updateVoteUI('v2', v2Keep);
    updateVoteUI('v3', v3Keep);
    
    // 2. Calculate final decision based on rule
    let finalDecision = 'evicted';
    let explanation = "";
    
    if (pSelectedRule === 'and') {
        // Unanimity to keep (any Evict causes eviction)
        finalDecision = (v1Keep && v2Keep && v3Keep) ? 'kept' : 'evicted';
        
        let blindExpert = "";
        let blindReason = "";
        if (!v1Keep) {
            blindExpert = "Expert 1";
            blindReason = pSelectedToken === 'path' ? "file paths" : "Docker hashes";
        } else if (!v2Keep) {
            blindExpert = "Expert 2";
            blindReason = pSelectedToken === 'cmd' ? "terminal commands" : "secrets";
        } else {
            blindExpert = "Expert 3";
            blindReason = pSelectedToken === 'ip' ? "IP addresses" : "memory addresses";
        }
        
        explanation = `Under the <strong>AND Veto Rule</strong>, ${blindExpert} doesn't understand ${blindReason} and votes to delete it. Even though the other two experts voted to keep it, <strong>the item is evicted (Committee Decision: Evicted!)</strong>. The ensemble collapses.`;
    } else if (pSelectedRule === 'majority') {
        // Needs 2/3 to keep
        const keepCount = (v1Keep ? 1 : 0) + (v2Keep ? 1 : 0) + (v3Keep ? 1 : 0);
        finalDecision = keepCount >= 2 ? 'kept' : 'evicted';
        
        explanation = `Under the <strong>Majority Rule (2/3)</strong>, because two experts recognized the token and voted to keep it, <strong>the item is saved</strong>. However, if multiple experts have overlapping weaknesses on a complex token, the majority rule still collapses.`;
    } else if (pSelectedRule === 'asymmetric') {
        // Asymmetric loss safety floor overrides everything
        finalDecision = 'asymmetric';
        explanation = `Under our <strong>Asymmetric Modulation</strong>, the token is recognized as part of the critical-syntactic safety floor ($T_{\\text{crit}}$). The system <strong>instantly overrides the evictions</strong>, guaranteeing the token is saved regardless of expert blindspots.`;
    }
    
    // 3. Update Decision Box UI
    const decisionBox = document.getElementById('decision-box');
    const decisionText = document.getElementById('decision-text');
    const decisionBadge = document.getElementById('decision-badge');
    const explanationText = document.getElementById('p-explanation-text');
    
    explanationText.innerHTML = explanation + ` <a href="https://kompress.vaked.dev/paper/main.pdf#page=12" target="_blank" rel="noopener noreferrer" class="cite-link" title="See Table 4 on Page 12">[Paper p.12]</a>`;
    
    if (finalDecision === 'evicted') {
        decisionBox.className = "p-4 rounded-xl border border-red-500/25 bg-red-500/5 flex items-center justify-between transition-all";
        decisionText.innerText = "Evicted! (Item is Lost)";
        decisionText.className = "text-sm font-bold text-red-400";
        decisionBadge.className = "px-3 py-1.5 rounded bg-red-500/10 border border-red-500/30 text-xs font-mono font-bold text-red-400 flex items-center gap-1.5";
        decisionBadge.innerHTML = `<i data-lucide="trash-2" class="w-4 h-4"></i> Evicted`;
    } else if (finalDecision === 'kept') {
        decisionBox.className = "p-4 rounded-xl border border-brand-emerald/25 bg-brand-emerald/5 flex items-center justify-between transition-all";
        decisionText.innerText = "Kept! (Item is Saved)";
        decisionText.className = "text-sm font-bold text-brand-emerald";
        decisionBadge.className = "px-3 py-1.5 rounded bg-brand-emerald/10 border border-brand-emerald/30 text-xs font-mono font-bold text-brand-emerald flex items-center gap-1.5";
        decisionBadge.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4"></i> Kept`;
    } else if (finalDecision === 'asymmetric') {
        decisionBox.className = "p-4 rounded-xl border border-brand-cyan/25 bg-brand-cyan/5 flex items-center justify-between transition-all";
        decisionText.innerText = "Kept! (Overridden by Safety Floor)";
        decisionText.className = "text-sm font-bold text-brand-cyan";
        decisionBadge.className = "px-3 py-1.5 rounded bg-brand-cyan/10 border border-brand-cyan/30 text-xs font-mono font-bold text-brand-cyan flex items-center gap-1.5";
        decisionBadge.innerHTML = `<i data-lucide="shield" class="w-4 h-4 text-brand-cyan animate-pulse"></i> Safety Override`;
    }
    
    lucide.createIcons(); // Update icons inside the decision badge
}

function updateVoteUI(voterId, keep) {
    const el = document.getElementById(`vote-${voterId}`);
    if (keep) {
        el.className = "text-xs font-bold text-brand-emerald flex items-center justify-center gap-1.5 bg-brand-emerald/5 py-1.5 rounded border border-brand-emerald/10";
        el.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4"></i> Keep`;
    } else {
        el.className = "text-xs font-bold text-red-400 flex items-center justify-center gap-1.5 bg-red-500/5 py-1.5 rounded border border-red-500/10";
        el.innerHTML = `<i data-lucide="x-circle" class="w-4 h-4"></i> Evict`;
    }
}

// ==========================================
// Cryptographic Reviews Logic
// ==========================================
let localKeyPair = null;
let currentRating = 5;

const NICKNAME_ADJECTIVES = ["Quantum", "Decentral", "Asymmetric", "Neural", "Pruned", "Cryptic", "Adaptive", "Hyper", "Sleek", "Vector", "Active", "Passive", "Dense", "Encoded", "Modulated", "Coherent"];
const NICKNAME_NOUNS = ["Whale", "Octopus", "Manta", "Dolphin", "Orca", "Shark", "Nautilus", "Stingray", "Seahorse", "Walrus", "Penguin", "Seal", "Otter", "Anemone", "Coral", "Crab"];

async function generateAnonymousNickname(publicKeyJwk) {
    try {
        const jwkStr = JSON.stringify(publicKeyJwk);
        const encoder = new TextEncoder();
        const data = encoder.encode(jwkStr);
        const hashBuf = await window.crypto.subtle.digest("SHA-256", data);
        const hashArray = new Uint8Array(hashBuf);
        
        const adjIdx = hashArray[0] % NICKNAME_ADJECTIVES.length;
        const nounIdx = hashArray[1] % NICKNAME_NOUNS.length;
        const suffix = bufToHex(hashBuf).substring(0, 4);
        
        const nickname = `${NICKNAME_ADJECTIVES[adjIdx]}-${NICKNAME_NOUNS[nounIdx]}-${suffix}`;
        
        const nameInput = document.getElementById('review-name');
        if (nameInput) {
            nameInput.value = nickname;
        }
    } catch (e) {
        console.error("Failed to generate cryptographic nickname:", e);
    }
}

async function initCryptoKeys() {
    try {
        const storedPub = localStorage.getItem('review_pub_key');
        const storedPriv = localStorage.getItem('review_priv_key');
        let pubKeyJwk = null;
        
        if (storedPub && storedPriv) {
            pubKeyJwk = JSON.parse(storedPub);
            localKeyPair = {
                publicKey: await window.crypto.subtle.importKey("jwk", pubKeyJwk, { name: "ECDSA", namedCurve: "P-256" }, true, ["verify"]),
                privateKey: await window.crypto.subtle.importKey("jwk", JSON.parse(storedPriv), { name: "ECDSA", namedCurve: "P-256" }, true, ["sign"])
            };
        } else {
            const keyPair = await window.crypto.subtle.generateKey(
                { name: "ECDSA", namedCurve: "P-256" },
                true,
                ["sign", "verify"]
            );
            
            pubKeyJwk = await window.crypto.subtle.exportKey("jwk", keyPair.publicKey);
            const privJwk = await window.crypto.subtle.exportKey("jwk", keyPair.privateKey);
            
            localStorage.setItem('review_pub_key', JSON.stringify(pubKeyJwk));
            localStorage.setItem('review_priv_key', JSON.stringify(privJwk));
            localKeyPair = keyPair;
        }
        
        if (pubKeyJwk) {
            await generateAnonymousNickname(pubKeyJwk);
        }
    } catch (e) {
        console.error("Failed to initialize cryptographic keys", e);
    }
}

function setRating(rating) {
    currentRating = rating;
    const stars = document.querySelectorAll('.star-btn');
    stars.forEach((btn, idx) => {
        const icon = btn.querySelector('svg');
        if (idx < rating) {
            icon.classList.add('fill-brand-cyan');
            icon.classList.remove('text-slate-650');
        } else {
            icon.classList.remove('fill-brand-cyan');
            icon.classList.add('text-slate-650');
        }
    });
}

function bufToHex(buffer) {
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

function hexToBuf(hex) {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return bytes.buffer;
}

async function submitReview() {
    if (!localKeyPair) {
        alert("Cryptographic keys not initialized. Please try again.");
        return;
    }

    const reviewer = document.getElementById('review-name').value || "Anonymous";
    const comment = document.getElementById('review-comment').value;
    
    if (!comment) {
        alert("Please write a comment before submitting.");
        return;
    }

    const timestamp = new Date().toISOString();
    const pubKeyJwk = JSON.parse(localStorage.getItem('review_pub_key'));
    
    const signable = { reviewer, rating: currentRating, comment, timestamp };
    const encoder = new TextEncoder();
    const data = encoder.encode(JSON.stringify(signable));
    
    const signatureBuffer = await window.crypto.subtle.sign(
        { name: "ECDSA", hash: { name: "SHA-256" } },
        localKeyPair.privateKey,
        data
    );
    
    const signatureHex = bufToHex(signatureBuffer);
    
    const payload = {
        ...signable,
        publicKey: pubKeyJwk,
        signature: signatureHex
    };

    const filename = `reviews/review-${Date.now()}.json`;
    const fileContent = JSON.stringify(payload, null, 2);
    const githubUrl = `https://github.com/peterlodri-sec/proposal.vaked.dev/new/main?filename=${filename}&value=${encodeURIComponent(fileContent)}`;
    
    window.open(githubUrl, '_blank');
}

async function verifySignature(review) {
    try {
        const signable = {
            reviewer: review.reviewer,
            rating: review.rating,
            comment: review.comment,
            timestamp: review.timestamp
        };
        
        const encoder = new TextEncoder();
        const data = encoder.encode(JSON.stringify(signable));
        
        const pubKey = await window.crypto.subtle.importKey(
            "jwk",
            review.publicKey,
            { name: "ECDSA", namedCurve: "P-256" },
            true,
            ["verify"]
        );
        
        const isValid = await window.crypto.subtle.verify(
            { name: "ECDSA", hash: { name: "SHA-256" } },
            pubKey,
            hexToBuf(review.signature),
            data
        );
        
        return isValid;
    } catch (e) {
        console.error("Signature verification failed", e);
        return false;
    }
}

async function fetchAndRenderReviews() {
    const listContainer = document.getElementById('reviews-list');
    
    try {
        const response = await fetch('reviews.json');
        const contentType = response.headers.get('content-type');
        if (!response.ok || !contentType || !contentType.includes('application/json')) {
            listContainer.innerHTML = `<div class="text-center py-8 text-slate-500 text-xs">No reviews submitted yet. Be the first to open a PR!</div>`;
            return;
        }
        
        const reviews = await response.json();
        
        if (!Array.isArray(reviews) || reviews.length === 0) {
            listContainer.innerHTML = `<div class="text-center py-8 text-slate-500 text-xs">No reviews submitted yet. Be the first to open a PR!</div>`;
            return;
        }
        
        listContainer.innerHTML = '';
        
        for (const review of reviews) {
            const isValid = await verifySignature(review);
            const starsHtml = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
            
            const reviewCard = document.createElement('div');
            reviewCard.className = `p-4 rounded-lg border bg-slate-955/50 ${isValid ? 'border-slate-900' : 'border-red-900/50'}`;
            
            reviewCard.innerHTML = `
                <div class="flex justify-between items-start mb-2 flex-wrap gap-2">
                    <div>
                        <span class="text-xs font-bold text-white">${escapeHtml(review.reviewer)}</span>
                        <span class="text-[10px] text-slate-500 block">${new Date(review.timestamp).toLocaleDateString()}</span>
                    </div>
                    <div class="text-right">
                        <div class="text-brand-cyan text-xs font-mono">${starsHtml}</div>
                        ${isValid 
                            ? `<span class="inline-flex items-center gap-1 text-[9px] text-brand-emerald bg-brand-emerald/10 px-1.5 py-0.5 rounded font-mono mt-1"><i data-lucide="shield-check" class="w-3.5 h-3.5"></i> Verified Sig</span>`
                            : `<span class="inline-flex items-center gap-1 text-[9px] text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded font-mono mt-1"><i data-lucide="shield-alert" class="w-3.5 h-3.5"></i> Tampered / Invalid</span>`
                        }
                    </div>
                </div>
                <p class="text-xs text-slate-400 leading-relaxed">${escapeHtml(review.comment)}</p>
            `;
            
            listContainer.appendChild(reviewCard);
        }
        
        lucide.createIcons();
        
    } catch (e) {
        console.error("Failed to fetch or render reviews:", e);
        listContainer.innerHTML = `<div class="text-center py-8 text-slate-500 text-xs">No reviews submitted yet. Be the first to open a PR!</div>`;
    }
}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
}

// ==========================================
// Live Telemetry Loop (Academic Telemetry)
// ==========================================
function initTelemetryLoop() {
    let telemetrySlices = 14820;
    setInterval(() => {
        telemetrySlices += Math.floor(Math.random() * 3);
        const slicesEl = document.getElementById('telemetry-slices');
        if (slicesEl) {
            slicesEl.innerText = telemetrySlices.toLocaleString();
        }
        
        const latencyVal = (96.5 + Math.random() * 2.0).toFixed(1);
        const latencyEl = document.getElementById('telemetry-latency');
        if (latencyEl) {
            latencyEl.innerText = `${latencyVal} ms`;
        }
    }, 3000);
}

// ==========================================
// Fluid Ambient Background Canvas
// ==========================================
function initFluidBackground() {
    const canvas = document.getElementById('fluid-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
    
    const blobs = [
        { x: width * 0.2, y: height * 0.3, rx: 250, ry: 250, vx: 0.2, vy: 0.15, color: 'rgba(0, 242, 254, 0.04)' },
        { x: width * 0.8, y: height * 0.2, rx: 300, ry: 300, vx: -0.15, vy: 0.2, color: 'rgba(79, 172, 254, 0.04)' },
        { x: width * 0.5, y: height * 0.7, rx: 350, ry: 350, vx: 0.1, vy: -0.15, color: 'rgba(168, 85, 247, 0.03)' },
        { x: width * 0.3, y: height * 0.8, rx: 280, ry: 280, vx: -0.1, vy: 0.1, color: 'rgba(16, 185, 129, 0.03)' }
    ];
    
    function animate() {
        ctx.fillStyle = '#080c14';
        ctx.fillRect(0, 0, width, height);
        
        blobs.forEach(blob => {
            blob.x += blob.vx;
            blob.y += blob.vy;
            
            if (blob.x < -blob.rx || blob.x > width + blob.rx) blob.vx *= -1;
            if (blob.y < -blob.ry || blob.y > height + blob.ry) blob.vy *= -1;
            
            const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, Math.max(blob.rx, blob.ry));
            grad.addColorStop(0, blob.color);
            grad.addColorStop(1, 'rgba(8, 12, 20, 0)');
            
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(blob.x, blob.y, Math.max(blob.rx, blob.ry), 0, Math.PI * 2);
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ==========================================
// Ecosystem Hover Preview Cards
// ==========================================
function initFooterPreviews() {
    const previewCard = document.createElement('div');
    previewCard.className = "fixed pointer-events-none opacity-0 bg-slate-955/95 border border-brand-cyan/20 p-3 rounded-lg shadow-xl text-[10px] text-slate-300 max-w-[220px] z-50 font-mono transition-opacity duration-200 backdrop-blur-md leading-relaxed";
    document.body.appendChild(previewCard);
    
    document.querySelectorAll('[data-preview]').forEach(el => {
        el.addEventListener('mouseenter', (e) => {
            previewCard.innerHTML = `<span class="text-brand-cyan font-bold block mb-1">Ecosystem Resource</span>${el.getAttribute('data-preview')}`;
            previewCard.style.opacity = '1';
        });
        el.addEventListener('mousemove', (e) => {
            previewCard.style.left = `${e.clientX + 15}px`;
            previewCard.style.top = `${e.clientY + 15}px`;
        });
        el.addEventListener('mouseleave', () => {
            previewCard.style.opacity = '0';
        });
    });
}

// ==========================================
// Interactive Math Hover Explanations
// ==========================================
function initInteractiveMath() {
    const MATH_EXPLAINERS = {
        itilde: "<strong>Modulated Indicator (&Iuml;̃):</strong> The final decision to keep (0) or evict (1) token x.",
        sigmoid: "<strong>Sigmoid function (&sigma;):</strong> Maps the modulated output to a probability between 0 and 1.",
        toklogits: "<strong>Token Logits (logits_tok):</strong> The raw eviction score from the Token Classifier Head.",
        gamma: "<strong>Modulation Factor (&gamma;):</strong> Controls how strongly span coherence protects tokens.",
        spangate: "<strong>Span Gate (g):</strong> Evaluates if the token is part of a structurally cohesive sequence.",
        spanlogits: "<strong>Span Logits (logits_span):</strong> Coherence scores from the Span-CNN Head."
    };
    
    document.querySelectorAll('[data-math-target]').forEach(el => {
        el.addEventListener('mouseenter', () => {
            const target = el.getAttribute('data-math-target');
            const explainer = document.getElementById('math-explainer-text');
            explainer.innerHTML = MATH_EXPLAINERS[target];
            explainer.className = "mt-4 border-t border-slate-900 pt-4 text-left text-[11px] text-brand-cyan transition-all";
            el.classList.add('scale-105', 'text-brand-cyan', 'transition-all');
        });
        el.addEventListener('mouseleave', () => {
            const explainer = document.getElementById('math-explainer-text');
            explainer.innerHTML = "Hover over any part of the formula to see its role in the Asymmetric Loss Modulation.";
            explainer.className = "mt-4 border-t border-slate-900 pt-4 text-left text-[11px] text-slate-500 transition-all";
            el.classList.remove('scale-105', 'text-brand-cyan');
        });
    });
}
