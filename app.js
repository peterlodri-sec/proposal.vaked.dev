// App logic for proposal.vaked.dev
// Includes presets, mock compression pipeline, voting paradox simulation, and cryptographic reviews.

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', async () => {
    lucide.createIcons();
    loadPreset('auth');
    await initCryptoKeys();
    await fetchAndRenderReviews();
    initTelemetryLoop();
});

// Presets for the playground
const PRESETS = {
    auth: {
        text: "I would be happy to help you implement the authentication system with OAuth2. Let me write the code for the passport middleware. We will require the client ID and client secret in the .env file.",
        pruned: "I would be happy to help you [Evicted] implement the authentication system with OAuth2 [Safety Floor]. Let me write [Evicted] the code for the passport [Safety Floor] middleware. We will require the client ID [Evicted] and client secret in the .env [Safety Floor] file [Evicted].",
        compressed: "implement authentication system OAuth2 write code passport middleware require client secret .env"
    },
    error: {
        text: "Looking at the logs, it seems we got an error: Process exited with status code 1. The stack trace shows a NullReferenceException in src/auth.rs at line 125.",
        pruned: "Looking at the logs, it seems [Evicted] we got an error: Process exited with status code 1 [Safety Floor]. The stack trace [Evicted] shows a NullReferenceException [Safety Floor] in src/auth.rs [Safety Floor] at line 125 [Safety Floor].",
        compressed: "error Process exited status code 1 NullReferenceException src/auth.rs line 125"
    },
    bash: {
        text: "I ran the bash command: cargo test --test integration_tests. It failed because the database port 5432 was already in use by another process.",
        pruned: "I ran the bash [Evicted] command: cargo test --test integration_tests [Safety Floor]. It failed because [Evicted] the database port 5432 [Safety Floor] was already in use [Evicted] by another process.",
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
                return `<span class="text-brand-cyan font-bold">${w} [Safety Floor]</span>`;
            } else if (w.length > 5 && Math.random() > 0.4) {
                return w;
            } else {
                return `<span class="text-slate-700 line-through">${w} [Evicted]</span>`;
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

// Paradox Simulator Logic
let currentVotingRule = 'and';

function setVotingRule(rule) {
    currentVotingRule = rule;
    const btnAnd = document.getElementById('btn-rule-and');
    const btnMaj = document.getElementById('btn-rule-majority');
    
    if (rule === 'and') {
        btnAnd.className = "text-xs px-3 py-1.5 rounded-lg border border-brand-cyan bg-brand-cyan/10 text-brand-cyan font-medium";
        btnMaj.className = "text-xs px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 font-medium";
        
        document.getElementById('ensemble-recall-ids').innerText = "70%";
        document.getElementById('ensemble-recall-paths').innerText = "68%";
        
        document.getElementById('bar-ensemble-ids').style.width = "70%";
        document.getElementById('bar-ensemble-ids').className = "bg-red-500 h-1.5 rounded-full";
        document.getElementById('bar-ensemble-paths').style.width = "68%";
        document.getElementById('bar-ensemble-paths').className = "bg-red-500 h-1.5 rounded-full";
        
        document.getElementById('paradox-explanation').innerHTML = "Under AND voting (unanimity to keep), the ensemble's recall collapses to the weakest voter on each stratum (70% for Identifiers, 68% for File Paths). It is Pareto-dominated by any single strong model.<a href=\"https://kompress.vaked.dev/paper/main.pdf#page=12\" target=\"_blank\" class=\"cite-link\" title=\"See Table 4 on Page 12\">[Paper p.12]</a>";
    } else {
        btnAnd.className = "text-xs px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 font-medium";
        btnMaj.className = "text-xs px-3 py-1.5 rounded-lg border border-brand-cyan bg-brand-cyan/10 text-brand-cyan font-medium";
        
        document.getElementById('ensemble-recall-ids').innerText = "78%";
        document.getElementById('ensemble-recall-paths').innerText = "76%";
        
        document.getElementById('bar-ensemble-ids').style.width = "78%";
        document.getElementById('bar-ensemble-ids').className = "bg-red-400 h-1.5 rounded-full";
        document.getElementById('bar-ensemble-paths').style.width = "76%";
        document.getElementById('bar-ensemble-paths').className = "bg-red-400 h-1.5 rounded-full";
        
        document.getElementById('paradox-explanation').innerHTML = "Under Majority voting (k=2 of 3), the ensemble acts as the per-stratum median. On strata where multiple voters are weak, the ensemble still collapses, underperforming the best single model (v4 at 96.7%).<a href=\"https://kompress.vaked.dev/paper/main.pdf#page=12\" target=\"_blank\" class=\"cite-link\" title=\"See Table 4 on Page 12\">[Paper p.12]</a>";
    }
}

// ==========================================
// Cryptographic Reviews Logic
// ==========================================
let localKeyPair = null;
let currentRating = 5;

async function initCryptoKeys() {
    try {
        const storedPub = localStorage.getItem('review_pub_key');
        const storedPriv = localStorage.getItem('review_priv_key');
        
        if (storedPub && storedPriv) {
            // Keys already exist
            localKeyPair = {
                publicKey: await window.crypto.subtle.importKey("jwk", JSON.parse(storedPub), { name: "ECDSA", namedCurve: "P-256" }, true, ["verify"]),
                privateKey: await window.crypto.subtle.importKey("jwk", JSON.parse(storedPriv), { name: "ECDSA", namedCurve: "P-256" }, true, ["sign"])
            };
        } else {
            // Generate P-256 keypair
            const keyPair = await window.crypto.subtle.generateKey(
                { name: "ECDSA", namedCurve: "P-256" },
                true,
                ["sign", "verify"]
            );
            
            const pubJwk = await window.crypto.subtle.exportKey("jwk", keyPair.publicKey);
            const privJwk = await window.crypto.subtle.exportKey("jwk", keyPair.privateKey);
            
            localStorage.setItem('review_pub_key', JSON.stringify(pubJwk));
            localStorage.setItem('review_priv_key', JSON.stringify(privJwk));
            localKeyPair = keyPair;
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
        if (!response.ok) {
            listContainer.innerHTML = `<div class="text-center py-8 text-slate-500 text-xs">No reviews submitted yet. Be the first to open a PR!</div>`;
            return;
        }
        
        const reviews = await response.json();
        
        if (reviews.length === 0) {
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
                            ? `<span class="inline-flex items-center gap-1 text-[9px] text-brand-emerald bg-brand-emerald/10 px-1.5 py-0.5 rounded font-mono mt-1"><i data-lucide="shield-check" class="w-3 h-3"></i> Verified Sig</span>`
                            : `<span class="inline-flex items-center gap-1 text-[9px] text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded font-mono mt-1"><i data-lucide="shield-alert" class="w-3 h-3"></i> Tampered / Invalid</span>`
                        }
                    </div>
                </div>
                <p class="text-xs text-slate-400 leading-relaxed">${escapeHtml(review.comment)}</p>
            `;
            
            listContainer.appendChild(reviewCard);
        }
        
        lucide.createIcons(); // Initialize icons on new elements
        
    } catch (e) {
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
