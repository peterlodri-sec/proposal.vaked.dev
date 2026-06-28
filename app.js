// App logic for proposal.vaked.dev
// Includes presets, mock compression pipeline, and voting paradox simulation.

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    loadPreset('auth');
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

// Simple mock token counter (word-based for demo simplicity)
function countTokens(text) {
    return text.trim().split(/\s+/).filter(Boolean).length;
}

function triggerCompression() {
    const inputVal = document.getElementById('playground-input').value;
    
    let prunedText = "";
    let compressedText = "";
    
    // If it matches our preset text exactly, use the hand-crafted high-fidelity outputs
    if (PRESETS[currentPreset] && inputVal.trim() === PRESETS[currentPreset].text.trim()) {
        prunedText = PRESETS[currentPreset].pruned;
        compressedText = PRESETS[currentPreset].compressed;
    } else {
        // Simple heuristic rules for custom inputs
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
    
    // Update DOM
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
    
    // Toggle active buttons
    const btnAnd = document.getElementById('btn-rule-and');
    const btnMaj = document.getElementById('btn-rule-majority');
    
    if (rule === 'and') {
        btnAnd.className = "text-xs px-3 py-1.5 rounded-lg border border-brand-cyan bg-brand-cyan/10 text-brand-cyan font-medium";
        btnMaj.className = "text-xs px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 font-medium";
        
        // Update values for AND (pointwise maximum / weakest voter veto)
        document.getElementById('ensemble-recall-ids').innerText = "70%";
        document.getElementById('ensemble-recall-paths').innerText = "68%";
        
        document.getElementById('bar-ensemble-ids').style.width = "70%";
        document.getElementById('bar-ensemble-ids').className = "bg-red-500 h-1.5 rounded-full";
        document.getElementById('bar-ensemble-paths').style.width = "68%";
        document.getElementById('bar-ensemble-paths').className = "bg-red-500 h-1.5 rounded-full";
        
        document.getElementById('paradox-explanation').innerText = "Under AND voting (unanimity to keep), the ensemble's recall collapses to the weakest voter on each stratum (70% for Identifiers, 68% for File Paths). It is Pareto-dominated by any single strong model.";
    } else {
        btnAnd.className = "text-xs px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 font-medium";
        btnMaj.className = "text-xs px-3 py-1.5 rounded-lg border border-brand-cyan bg-brand-cyan/10 text-brand-cyan font-medium";
        
        // Update values for Majority (median / middle voter)
        document.getElementById('ensemble-recall-ids').innerText = "78%";
        document.getElementById('ensemble-recall-paths').innerText = "76%";
        
        document.getElementById('bar-ensemble-ids').style.width = "78%";
        document.getElementById('bar-ensemble-ids').className = "bg-red-400 h-1.5 rounded-full";
        document.getElementById('bar-ensemble-paths').style.width = "76%";
        document.getElementById('bar-ensemble-paths').className = "bg-red-400 h-1.5 rounded-full";
        
        document.getElementById('paradox-explanation').innerText = "Under Majority voting (k=2 of 3), the ensemble acts as the per-stratum median. On strata where multiple voters are weak, the ensemble still collapses, underperforming the best single model (v4 at 96.7%).";
    }
}
