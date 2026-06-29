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
    const inputVal = document.getElementById('playground-input').value;
    
    let prunedText = "";
    let compressedText = "";
    
    if (PRESETS[currentPreset] && inputVal.trim() === PRESETS[currentPreset].text.trim()) {
        prunedText = PRESETS[currentPreset].pruned;
        compressedText = PRESETS[currentPreset].compressed;
    } else {
        const words = inputVal.split(/\s+/);
        const mustKeepRegex = /(OAuth2|\.env|src\/[a-zA-Z0-9_\-\.]+|\d+|NullReferenceException|cargo|test|status|code)/i;
        
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

// ==========================================
// Veto Committee Paradox Simulator
// ==========================================
let pSelectedToken = 'path';
let pSelectedRule = 'and';

function inspectToken(tokenType) {
    pSelectedToken = tokenType;
    
    // Toggle active styles on token buttons
    ['path', 'cmd', 'ip'].forEach(t => {
        const btn = document.getElementById(`btn-tok-${t}`);
        if (t === tokenType) {
            btn.className = "text-xs p-3 rounded-lg border border-brand-cyan bg-brand-cyan/10 text-white font-mono transition-all";
        } else {
            btn.className = "text-xs p-3 rounded-lg border border-slate-800 bg-slate-950 text-slate-400 font-mono hover:border-brand-cyan/50 transition-all";
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
    // Voter 1 is blind to paths
    const v1Keep = pSelectedToken !== 'path';
    // Voter 2 is blind to commands
    const v2Keep = pSelectedToken !== 'cmd';
    // Voter 3 is blind to IPs
    const v3Keep = pSelectedToken !== 'ip';
    
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
        
        const blindExpert = pSelectedToken === 'path' ? 'Expert 1' : pSelectedToken === 'cmd' ? 'Expert 2' : 'Expert 3';
        explanation = `Under the <strong>AND Veto Rule</strong>, ${blindExpert} doesn't understand this token type and votes to delete it. Even though the other two experts voted to keep it, <strong>the item is evicted</strong>. The ensemble collapses.`;
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
        // Compute SHA-256 hash of the public key JWK string representation
        const jwkStr = JSON.stringify(publicKeyJwk);
        const encoder = new TextEncoder();
        const data = encoder.encode(jwkStr);
        const hashBuf = await window.crypto.subtle.digest("SHA-256", data);
        const hashArray = new Uint8Array(hashBuf);
        
        // Map hash bytes to indices
        const adjIdx = hashArray[0] % NICKNAME_ADJECTIVES.length;
        const nounIdx = hashArray[1] % NICKNAME_NOUNS.length;
        
        // Take 4 hex characters from the end of the hash
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
            // Keys already exist
            pubKeyJwk = JSON.parse(storedPub);
            localKeyPair = {
                publicKey: await window.crypto.subtle.importKey("jwk", pubKeyJwk, { name: "ECDSA", namedCurve: "P-256" }, true, ["verify"]),
                privateKey: await window.crypto.subtle.importKey("jwk", JSON.parse(storedPriv), { name: "ECDSA", namedCurve: "P-256" }, true, ["sign"])
            };
        } else {
            // Generate P-256 keypair
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
        
        // Generate and set nickname based on the public key
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

// Convert ArrayBuffer to Hex String
function bufToHex(buffer) {
    return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// Convert Hex String to ArrayBuffer
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
    
    // Construct the signable payload
    const signable = { reviewer, rating: currentRating, comment, timestamp };
    const encoder = new TextEncoder();
    const data = encoder.encode(JSON.stringify(signable));
    
    // Sign the data
    const signatureBuffer = await window.crypto.subtle.sign(
        { name: "ECDSA", hash: { name: "SHA-256" } },
        localKeyPair.privateKey,
        data
    );
    
    const signatureHex = bufToHex(signatureBuffer);
    
    // Final JSON Payload
    const payload = {
        ...signable,
        publicKey: pubKeyJwk,
        signature: signatureHex
    };

    // Redirect to GitHub File Creation
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
        
        // Import the public key from the JWK in the review
        const pubKey = await window.crypto.subtle.importKey(
            "jwk",
            review.publicKey,
            { name: "ECDSA", namedCurve: "P-256" },
            true,
            ["verify"]
        );
        
        // Verify the signature
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
        
        // Defensive check: If the hosting provider serves index.html instead of a 404 (e.g. for Single Page App routing), 
        // we check the Content-Type header to make sure it's valid JSON before parsing.
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
        
        listContainer.innerHTML = ''; // Clear loader
        
        // Render each review
        for (const review of reviews) {
            const isValid = await verifySignature(review);
            const starsHtml = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
            
            const reviewCard = document.createElement('div');
            reviewCard.className = `p-4 rounded-lg border bg-slate-950/50 ${isValid ? 'border-slate-900' : 'border-red-900/50'}`;
            
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
        
        lucide.createIcons(); // Initialize icons on new elements
        
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
        // Slices processed increases slowly (simulating real training)
        telemetrySlices += Math.floor(Math.random() * 3);
        const slicesEl = document.getElementById('telemetry-slices');
        if (slicesEl) {
            slicesEl.innerText = telemetrySlices.toLocaleString();
        }
        
        // Latency fluctuates slightly around 97ms
        const latencyVal = (96.5 + Math.random() * 2.0).toFixed(1);
        const latencyEl = document.getElementById('telemetry-latency');
        if (latencyEl) {
            latencyEl.innerText = `${latencyVal} ms`;
        }
    }, 3000);
}
