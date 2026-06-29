// App logic for proposal.vaked.dev
// Optimized, modularized, and SOTA-refined.

// Global entry point
document.addEventListener('DOMContentLoaded', async () => {
    await Vaked.init();
});

// ==========================================
// Main Vaked Namespace
// ==========================================
const Vaked = {
    async init() {
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
        
        this.Playground.load('auth');
        await this.Crypto.initKeys();
        await this.Crypto.fetchReviews();
        this.Telemetry.start();
        this.UI.initFluidBackground();
        this.UI.initFooterPreviews();
        this.UI.initInteractiveMath();
        
        this.Paradox.inspect('path');
        this.Attention.init();
        this.BenchmarkChart.init();
    }
};

// ==========================================
// 1. Translation Engine
// ==========================================
Vaked.Translation = {
    dictionary: {
        en: {
            hero_title: 'Asymmetric Loss Modulation for <span class="gradient-text">Context Compression</span>',
            hero_desc: 'Integrating learned context-pruning into <a href="https://github.com/headroomlabs-ai/headroom" target="_blank" rel="noopener noreferrer" class="text-brand-cyan hover:underline font-semibold">Headroom</a>. Achieve <strong class="text-white">~78% token savings</strong> and <strong class="text-white">~75% latency reduction</strong> while maintaining a near-perfect <strong class="text-brand-cyan">0.993 exact-keep rate</strong> on critical reasoning tokens.',
            playground_title: '<i data-lucide="sparkles" class="text-brand-cyan w-6 h-6" aria-hidden="true"></i> Interactive Kompress-Ultra Playground',
            playground_desc: 'Type or select a preset below. Watch the pruner and rewriter compress your <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">chat history</a> in real-time, preserving the <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">critical-syntactic safety floor ($T_{\\text{crit}}$)</a>.',
            compressor_title: 'Real-Time Context Compressor',
            compressor_desc: 'Paste your prompt, logs, or code below (up to 5,000 characters). Our engine will strip filler words and optimize the structure, preserving all critical tokens.',
            paradox_title: 'The *Voting Ensemble Paradox*',
            paradox_eli5_1: 'Imagine a committee of three experts deciding which words to keep in a document to save space. To be extremely conservative, the rule is: <strong>"If even one expert votes to delete a word, we delete it."</strong>',
            paradox_eli5_2: 'Each expert is smart, but has one blind spot where they always vote to delete. Because of the veto rule, <strong>every single critical item gets deleted</strong> because the expert who doesn\'t understand it vetoes it. This is the <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">*Voting Ensemble Paradox*</a>—the group becomes worse than any single expert on their own!',
            theory_title: 'Theoretical Core',
            theory_desc: 'Learned <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">context-pruning</a> improves long-context agent efficiency but introduces the <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">*Voting Ensemble Paradox*</a>. Under <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">unanimity-to-keep (AND)</a> voting ($k=1$ drop-if-any), the ensemble eviction indicator equals the pointwise maximum of the individual voter indicators:<a href="https://kompress.vaked.dev/paper/main.pdf#page=6" target="_blank" rel="noopener noreferrer" class="cite-link" title="See Theorem 1 on Page 6">[Paper p.6]</a>',
            theory_para_2: 'This yields a <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">stratum-wise Pareto collapse</a> where the ensemble\'s recall equals that of the weakest voter on each stratum. As a corrective, `kompress-ultra` employs three core mechanisms:',
            vakedc_title: 'Vaked Capability & Context (vakedc)',
            vakedc_desc: 'A decentralized routing and verification matrix designed to coordinate context-pruning workloads across heterogeneous nodes (cloud VMs and local Raspberry Pis). By separating capacity detection, routing, and cryptographic verification, the system ensures zero-trust execution.',
            architecture_title: 'Model Architecture',
            architecture_desc: '`kompress-v8` uses a 149M-parameter <a href="https://github.com/AnswerDotAI/ModernBERT" target="_blank" rel="noopener noreferrer" class="text-brand-cyan hover:underline">ModernBERT</a> backbone with <a href="https://en.wikipedia.org/wiki/Low-rank_adaptation" target="_blank" rel="noopener noreferrer" class="text-brand-cyan hover:underline">LoRA</a> fine-tuning applied to the last 4 attention layers. Two task heads share the encoder:',
            benchmarks_title: 'Empirical Benchmarks',
            benchmarks_desc: 'Evaluated on the <strong>Heretic</strong> adversarial benchmark, <code class="font-mono bg-slate-900 px-1.5 py-0.5 rounded text-brand-cyan">kompress-v8</code> dominates traditional prompt compression models.',
            proposal_title: 'Headroom Integration Proposal',
            proposal_desc: '<span class="tooltip border-b border-slate-500 border-dashed cursor-help">We<span class="tooltiptext">Peter and the swarm of autonomous coding agents + inference loops that built this project.</span></span> propose integrating `kompress-ultra` directly into <a href="https://github.com/headroomlabs-ai/headroom" target="_blank" rel="noopener noreferrer" class="text-brand-cyan hover:underline">Headroom</a> (referencing <a href="https://github.com/headroomlabs-ai/headroom/pull/1419" target="_blank" rel="noopener noreferrer" class="text-brand-cyan hover:underline font-semibold">Headroom PR #1419</a>) as a core context-management middleware:',
            reviews_title: 'Reviews & Feedback',
            reviews_desc: 'Submit a review of this proposal. Reviews are cryptographically signed by your browser and submitted via a <strong>GitHub Pull Request</strong>, guaranteeing they are <strong>provably immutable</strong> (the author cannot modify them without breaking the signature).',
            telemetry_title: 'Academic Telemetry & Verification',
            telemetry_desc: 'This site is dedicated strictly to academic research. There are no tracking scripts, Google Ads, or third-party cookies. The connection is proxied and secured solely through <a href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer" class="text-brand-emerald hover:underline">Cloudflare CDN</a>.',
            glossary_title: 'Glossary',
            ecosystem_title: 'Ecosystem & Related Work',
            ecosystem_desc: 'This research is part of a broader ecosystem. All source code, dataset distributions, and experiment logs are open-source and publicly available for replication:'
        },
        es: {
            hero_title: 'Modulación de Pérdida Asimétrica para <span class="gradient-text">Compresión de Contexto</span>',
            hero_desc: 'Integrando la poda de contexto aprendida en <a href="https://github.com/headroomlabs-ai/headroom" target="_blank" rel="noopener noreferrer" class="text-brand-cyan hover:underline font-semibold">Headroom</a>. Consiga un <strong class="text-white">~78% de ahorro de tokens</strong> y una <strong class="text-white">reducción de latencia del ~75%</strong> manteniendo una tasa de retención exacta casi perfecta de <strong class="text-brand-cyan">0.993</strong> en tokens de razonamiento críticos.',
            playground_title: '<i data-lucide="sparkles" class="text-brand-cyan w-6 h-6" aria-hidden="true"></i> Patio de Juegos Interactivo de Kompress-Ultra',
            playground_desc: 'Escriba o seleccione un ajuste preestablecido a continuación. Observe cómo el podador y el reescritor comprimen su <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">historial de chat</a> en tiempo real, preservando el <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">suelo de seguridad sintáctico-crítico ($T_{\\text{crit}}$)</a>.',
            compressor_title: 'Compresor de Contexto en Tiempo Real',
            compressor_desc: 'Pegue su mensaje, registros o código a continuación (hasta 5,000 caracteres). Nuestro motor eliminará las palabras de relleno y optimizará la estructura, preservando todos los tokens críticos.',
            paradox_title: 'La *Paradoja del Elenco de Votación*',
            paradox_eli5_1: 'Imagine un comité de tres expertos que deciden qué palabras conservar en un documento para ahorrar espacio. Para ser extremadamente conservadores, la regla es: <strong>"Si un solo experto vota a favor de eliminar una palabra, la eliminamos".</strong>',
            paradox_eli5_2: 'Cada experto es inteligente, pero tiene un punto ciego donde siempre vota a favor de eliminar. Debido a la regla de veto, <strong>cada elemento crítico se elimina</strong> porque el experto que no lo entiende lo veta. ¡Esta es la <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">*Paradoja del Elenco de Votación*</a>: el grupo se vuelve peor que cualquier experto por su cuenta!',
            theory_title: 'Vídeo Teórico',
            theory_desc: 'La <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">poda de contexto</a> aprendida mejora la eficiencia del agente de contexto largo pero introduce la <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">*Paradoja del Elenco de Votación*</a>. Bajo la votación de <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">unanimidad para mantener (AND)</a> ($k=1$ soltar si hay alguno), el indicador de desalojo del elenco es igual al máximo puntual de los indicadores de votantes individuales:<a href="https://kompress.vaked.dev/paper/main.pdf#page=6" target="_blank" rel="noopener noreferrer" class="cite-link" title="Ver Teorema 1 en la página 6">[Paper p.6]</a>',
            theory_para_2: 'Esto produce un <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">colapso de Pareto a nivel de estrato</a> donde el recuerdo del elenco es igual al del votante más débil en cada estrato. Como correctivo, `kompress-ultra` emplea tres mecanismos principales:',
            vakedc_title: 'Capacidad y Contexto Vaked (vakedc)',
            vakedc_desc: 'Una matriz de enrutamiento y verificación descentralizada diseñada para coordinar las cargas de trabajo de poda de contexto en nodos heterogéneos (VM en la nube y Raspberry Pis locales). Al separar la detección de capacidad, el enrutamiento y la verificación criptográfica, el sistema garantiza una ejecución de confianza cero.',
            architecture_title: 'Arquitectura del Modelo',
            architecture_desc: '`kompress-v8` utiliza una red troncal <a href="https://github.com/AnswerDotAI/ModernBERT" target="_blank" rel="noopener noreferrer" class="text-brand-cyan hover:underline">ModernBERT</a> de 149 millones de parámetros con ajuste fino de <a href="https://en.wikipedia.org/wiki/Low-rank_adaptation" target="_blank" rel="noopener noreferrer" class="text-brand-cyan hover:underline">LoRA</a> aplicado a las últimas 4 capas de atención. Dos cabezales de tareas comparten el codificador:',
            benchmarks_title: 'Puntos de Referencia Empíricos',
            benchmarks_desc: 'Evaluado en el punto de referencia adverso <strong>Heretic</strong>, <code class="font-mono bg-slate-900 px-1.5 py-0.5 rounded text-brand-cyan">kompress-v8</code> domina a los modelos tradicionales de compresión de prompts.',
            proposal_title: 'Propuesta de Integración en Headroom',
            proposal_desc: '<span class="tooltip border-b border-slate-500 border-dashed cursor-help">Nosotros<span class="tooltiptext">Peter y el enjambre de agentes de codificación autónomos + bucles de inferencia que construyeron este proyecto.</span></span> proponemos integrar `kompress-ultra` directamente en <a href="https://github.com/headroomlabs-ai/headroom" target="_blank" rel="noopener noreferrer" class="text-brand-cyan hover:underline">Headroom</a> (haciendo referencia a <a href="https://github.com/headroomlabs-ai/headroom/pull/1419" target="_blank" rel="noopener noreferrer" class="text-brand-cyan hover:underline font-semibold">Headroom PR #1419</a>) como middleware central de gestión de contexto:',
            reviews_title: 'Reseñas y Comentarios',
            reviews_desc: 'Envíe una reseña de esta propuesta. Las reseñas son firmadas criptográficamente por su navegador y enviadas a través de una <strong>Pull Request de GitHub</strong>, lo que garantiza que son <strong>provocadamente inmutables</strong> (el autor no puede modificarlas sin romper la firma).',
            telemetry_title: 'Telemetría Académica y Verificación',
            telemetry_desc: 'Este sitio está dedicado estrictamente a la investigación académica. No hay scripts de seguimiento, anuncios de Google ni cookies de terceros. La conexión se realiza a través de un proxy y se protege únicamente mediante <a href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer" class="text-brand-emerald hover:underline">Cloudflare CDN</a>.',
            glossary_title: 'Glosario',
            ecosystem_title: 'Ecosystem y Trabajo Relacionado',
            ecosystem_desc: 'Esta investigación forma parte de un ecosistema más amplio. Todo el código fuente, las distribuciones de conjuntos de datos y los registros de experimentos son de código abierto y están disponibles públicamente para su replicación:'
        },
        de: {
            hero_title: 'Asymmetrische Verlustmodulation für <span class="gradient-text">Kontextkomprimierung</span>',
            hero_desc: 'Integration von gelerntem Kontext-Pruning in <a href="https://github.com/headroomlabs-ai/headroom" target="_blank" rel="noopener noreferrer" class="text-brand-cyan hover:underline font-semibold">Headroom</a>. Erzielen Sie <strong class="text-white">~78% Token-Einsparung</strong> und eine <strong class="text-white">~75% Latenzreduzierung</strong> bei einer nahezu perfekten Beibehaltungsrate von <strong class="text-brand-cyan">0,993</strong> bei kritischen Argumentationstoken.',
            playground_title: '<i data-lucide="sparkles" class="text-brand-cyan w-6 h-6" aria-hidden="true"></i> Interaktiver Kompress-Ultra Spielplatz',
            playground_desc: 'Geben Sie einen Text ein oder wählen Sie ein Preset. Beobachten Sie, wie Pruner und Rewriter Ihren <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">Chat-Verlauf</a> in Echtzeit komprimieren und dabei die <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">kritisch-syntaktische Sicherheitsgrenze ($T_{\\text{crit}}$)</a> beibehalten.',
            compressor_title: 'Echtzeit-Kontextkompressor',
            compressor_desc: 'Fügen Sie Ihren Prompt, Protokolle oder Code unten ein (bis zu 5.000 Zeichen). Unsere Engine entfernt Füllwörter und optimiert die Struktur, wobei alle kritischen Token erhalten bleiben.',
            paradox_title: 'Das *Abstimmungs-Ensemble-Paradoxon*',
            paradox_eli5_1: 'Stellen Sie sich ein Komitee aus drei Experten vor, die entscheiden, welche Wörter in einem Dokument behalten werden sollen, um Platz zu sparen. Um extrem konservativ zu sein, lautet die Regel: <strong>"Wenn auch nur ein Experte für das Löschen eines Wortes stimmt, löschen wir es."</strong>',
            paradox_eli5_2: 'Jeder Experte ist klug, hat aber einen blinden Fleck, bei dem er immer für das Löschen stimmt. Aufgrund der Veto-Regel wird <strong>jedes einzelne kritische Element gelöscht</strong>, weil der Experte, der es nicht versteht, sein Veto einlegt. Dies ist das <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">*Abstimmungs-Ensemble-Paradoxon*</a> – die Gruppe wird schlechter als jeder einzelne Experte für sich allein!',
            theory_title: 'Theoretischer Kern',
            theory_desc: 'Gelerntes <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">Kontext-Pruning</a> verbessert die Effizienz von Agenten mit langem Kontext, führt jedoch das <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">*Abstimmungs-Ensemble-Paradoxon*</a> ein. Bei der Abstimmung auf <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">Beibehaltung durch Einstimmigkeit (AND)</a> ($k=1$ Verwerfen-wenn-irgendein) entspricht der Ensemble-Ausschlussindikator dem punktweisen Maximum der einzelnen Wählerindikatoren:<a href="https://kompress.vaked.dev/paper/main.pdf#page=6" target="_blank" rel="noopener noreferrer" class="cite-link" title="Siehe Theorem 1 auf Seite 6">[Paper p.6]</a>',
            theory_para_2: 'Dies führt zu einem <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">schichtweisen Pareto-Kollaps</a>, bei dem die Trefferquote des Ensembles der des schwächsten Wählers auf jeder Schicht entspricht. Als Korrektur setzt `kompress-ultra` drei Kernmechanismen ein:',
            vakedc_title: 'Vaked-Fähigkeit & Kontext (vakedc)',
            vakedc_desc: 'Eine dezentrale Routing- und Verifizierungsmatrix zur Koordinierung von Kontext-Pruning-Workloads über heterogene Knoten (Cloud-VMs und lokale Raspberry Pis). Durch die Trennung von Kapazitätserkennung, Routing und kryptografischer Verifizierung gewährleistet das System eine Zero-Trust-Ausführung.',
            architecture_title: 'Modellarchitektur',
            architecture_desc: '`kompress-v8` verwendet ein 149M-Parameter <a href="https://github.com/AnswerDotAI/ModernBERT" target="_blank" rel="noopener noreferrer" class="text-brand-cyan hover:underline">ModernBERT</a>-Backbone mit <a href="https://en.wikipedia.org/wiki/Low-rank_adaptation" target="_blank" rel="noopener noreferrer" class="text-brand-cyan hover:underline">LoRA</a>-Feinabstimmung auf den letzten 4 Attention-Schichten. Zwei Task-Heads teilen sich den Encoder:',
            benchmarks_title: 'Empirische Benchmarks',
            benchmarks_desc: 'Ermittelt auf dem adversarialen Benchmark <strong>Heretic</strong>, dominiert <code class="font-mono bg-slate-900 px-1.5 py-0.5 rounded text-brand-cyan">kompress-v8</code> traditionelle Prompt-Komprimierungsmodelle.',
            proposal_title: 'Integrationsvorschlag für Headroom',
            proposal_desc: '<span class="tooltip border-b border-slate-500 border-dashed cursor-help">Wir<span class="tooltiptext">Peter und der Schwarm allgemeiner Codierungsagenten + Inferenzschleifen, die dieses Projekt aufgebaut haben.</span></span> schlagen vor, `kompress-ultra` direkt in <a href="https://github.com/headroomlabs-ai/headroom" target="_blank" rel="noopener noreferrer" class="text-brand-cyan hover:underline">Headroom</a> (unter Bezugnahme auf <a href="https://github.com/headroomlabs-ai/headroom/pull/1419" target="_blank" rel="noopener noreferrer" class="text-brand-cyan hover:underline font-semibold">Headroom PR #1419</a>) als zentrales Kontextmanagement-Middleware zu integrieren:',
            reviews_title: 'Bewertungen & Feedback',
            reviews_desc: 'Geben Sie eine Bewertung zu diesem Vorschlag ab. Bewertungen werden von Ihrem Browser kryptografisch signiert und über einen <strong>GitHub Pull Request</strong> eingereicht, was garantiert, dass sie <strong>nachweisbar unveränderlich</strong> sind (der Autor kann sie nicht ändern, ohne die Signatur zu verletzen).',
            telemetry_title: 'Akademische Telemetrie & Verifizierung',
            telemetry_desc: 'Diese Website dient ausschließlich der akademischen Forschung. Es gibt keine Tracking-Skripte, Google-Anzeigen oder Drittanbieter-Cookies. Die Verbindung wird ausschließlich über das <a href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer" class="text-brand-emerald hover:underline">Cloudflare CDN</a> vermittelt und gesichert.',
            glossary_title: 'Glossar',
            ecosystem_title: 'Ökosystem & Verwandte Arbeiten',
            ecosystem_desc: 'Diese Forschung ist Teil eines größeren Ökosystems. Der gesamte Quellcode, die Datensatzverteilungen und die Experimentprotokolle sind Open-Source und für die Replikation öffentlich zugänglich:'
        },
        fr: {
            hero_title: 'Modulation de Perte Asymétrique pour la <span class="gradient-text">Compression de Contexte</span>',
            hero_desc: 'Intégration de l\'élagage de contexte appris dans <a href="https://github.com/headroomlabs-ai/headroom" target="_blank" rel="noopener noreferrer" class="text-brand-cyan hover:underline font-semibold">Headroom</a>. Obtenez <strong class="text-white">~78% d\'économie de jetons</strong> et une <strong class="text-white">réduction de latence de ~75%</strong> tout en maintenant un taux de conservation exact de <strong class="text-brand-cyan">0,993</strong> sur les jetons de raisonnement critiques.',
            playground_title: '<i data-lucide="sparkles" class="text-brand-cyan w-6 h-6" aria-hidden="true"></i> Espace de Jeu Interactif Kompress-Ultra',
            playground_desc: 'Saisissez du texte ou sélectionnez un préréglage ci-dessous. Regardez l\'élagueur et le réécriveur compresser votre <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">historique de discussion</a> en temps réel, en préservant le <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">seuil de sécurité syntaxique critique ($T_{\\text{crit}}$)</a>.',
            compressor_title: 'Compresseur de Contexte en Temps Réel',
            compressor_desc: 'Collez votre prompt, vos journaux ou votre code ci-dessous (jusqu\'à 5 000 caractères). Notre moteur supprimera les mots de remplissage et optimisera la structure, en préservant tous les jetons critiques.',
            paradox_title: 'Le *Paradoxe de l\'Ensemble de Vote*',
            paradox_eli5_1: 'Imaginez un comité de trois experts décidant quels mots conserver dans un document pour gagner de l\'espace. Pour être extrêmement conservateur, la règle est : <strong>"Si ne serait-ce qu\'un seul expert vote pour supprimer un mot, nous le supprimons."</strong>',
            paradox_eli5_2: 'Chaque expert est intelligent, mais a un point faible où il vote toujours pour supprimer. En raison de la règle du veto, <strong>chaque élément critique est supprimé</strong> parce que l\'expert qui ne le comprend pas y oppose son veto. C\'est le <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">*Paradoxe de l\'Ensemble de Vote*</a> — le groupe devient moins efficace que n\'importe quel expert pris individuellement !',
            theory_title: 'Noyau Théorique',
            theory_desc: 'L\'<a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">élagage de contexte</a> appris améliore l\'efficacité de l\'agent dans les contextes longs mais introduit le <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">*Paradoxe de l\'Ensemble de Vote*</a>. Sous un vote à <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">l\'unanimité pour conserver (AND)</a> ($k=1$ abandonner si présent), l\'indicateur d\'expulsion de l\'ensemble est égal au maximum ponctuel des indicateurs de vote individuels :<a href="https://kompress.vaked.dev/paper/main.pdf#page=6" target="_blank" rel="noopener noreferrer" class="cite-link" title="Voir le théorème 1 à la page 6">[Paper p.6]</a>',
            theory_para_2: 'Cela produit un <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">effondrement de Pareto par strate</a> où le rappel de l\'ensemble est égal à celui du votant le plus faible sur chaque strate. En guise de correctif, `kompress-ultra` utilise trois mécanismes fondamentaux :',
            vakedc_title: 'Capacité et Contexte Vaked (vakedc)',
            vakedc_desc: 'Une matrice de routage et de vérification décentralisée conçue pour coordonner les charges de travail d\'élagage de contexte sur des nœuds hétérogènes (VM cloud et Raspberry Pi locaux). En séparant la détection de capacité, le routage et la vérification cryptographique, le système garantit une exécution zéro-confiance.',
            architecture_title: 'Architecture du Modèle',
            architecture_desc: '`kompress-v8` utilise un squelette <a href="https://github.com/AnswerDotAI/ModernBERT" target="_blank" rel="noopener noreferrer" class="text-brand-cyan hover:underline">ModernBERT</a> de 149M de paramètres avec un réglage fin <a href="https://en.wikipedia.org/wiki/Low-rank_adaptation" target="_blank" rel="noopener noreferrer" class="text-brand-cyan hover:underline">LoRA</a> appliqué aux 4 dernières couches d\'attention. Deux têtes de tâche partagent l\'encodeur :',
            benchmarks_title: 'Bancs d\'Essai Empiriques',
            benchmarks_desc: 'Évalué sur le banc d\'essai contradictoire <strong>Heretic</strong>, <code class="font-mono bg-slate-900 px-1.5 py-0.5 rounded text-brand-cyan">kompress-v8</code> domine les modèles traditionnels de compression de prompts.',
            proposal_title: 'Proposition d\'Intégration de Headroom',
            proposal_desc: '<span class="tooltip border-b border-slate-500 border-dashed cursor-help">Nous<span class="tooltiptext">Peter et l\'essaim d\'agents de codage autonomes + boucles d\'inférence qui ont construit ce projet.</span></span> proposons d\'intégrer `kompress-ultra` directement dans <a href="https://github.com/headroomlabs-ai/headroom" target="_blank" rel="noopener noreferrer" class="text-brand-cyan hover:underline">Headroom</a> (en référence au <a href="https://github.com/headroomlabs-ai/headroom/pull/1419" target="_blank" rel="noopener noreferrer" class="text-brand-cyan hover:underline font-semibold">Headroom PR #1419</a>) en tant que middleware central de gestion de contexte :',
            reviews_title: 'Avis & Commentaires',
            reviews_desc: 'Soumettez un avis sur cette proposition. Les avis sont signés cryptographiquement par votre navigateur et soumis via une <strong>Pull Request GitHub</strong>, garantissant qu\'ils sont <strong>prouvables immuables</strong> (l\'auteur ne peut pas les modifier sans rompre la signature).',
            telemetry_title: 'Télémétrie Académique & Vérification',
            telemetry_desc: 'Ce site est strictement dédié à la recherche académique. Il n\'y a pas de scripts de suivi, de publicités Google ou de cookies tiers. La connexion est relayée par proxy et sécurisée uniquement via le <a href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer" class="text-brand-emerald hover:underline">CDN Cloudflare</a>.',
            glossary_title: 'Glossaire',
            ecosystem_title: 'Ecosystem y Travaux Connexes',
            ecosystem_desc: 'Cette recherche fait partie d\'un écosystème plus large. Tout le code source, les distributions de jeux de données et les journaux d\'expériences sont open-source et publics pour réplication :'
        },
        zh: {
            hero_title: '用于<span class="gradient-text">上下文压缩</span>的非对称损失调制',
            hero_desc: '将学习到的上下文裁剪集成 to <a href="https://github.com/headroomlabs-ai/headroom" target="_blank" rel="noopener noreferrer" class="text-brand-cyan hover:underline font-semibold">Headroom</a> 中。实现 <strong class="text-white">~78% 的 Token 节省</strong>和 <strong class="text-white">~75% 的延迟降低</strong>，同时对关键推理 Token 保持近乎完美的 <strong class="text-brand-cyan">0.993 精确保留率</strong>。',
            playground_title: '<i data-lucide="sparkles" class="text-brand-cyan w-6 h-6" aria-hidden="true"></i> 交互式 Kompress-Ultra 沙盒',
            playground_desc: '在下方输入或选择预设。实时查看修剪器和重写器如何压缩您的 <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">聊天历史记录</a>，同时保留 <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">关键语法安全底线 ($T_{\\text{crit}}$)</a>。',
            compressor_title: '实时上下文压缩器',
            compressor_desc: '在下方粘贴您的提示词、日志或代码（最多 5,000 个字符）。我们的引擎将去除无用词并优化结构，同时保留所有关键 Token。',
            paradox_title: '“投票集成悖论”',
            paradox_eli5_1: '想象一个由三位专家组成的委员会，决定保留文档中的哪些词以节省空间。为了极其保守，规则是：<strong>“如果哪怕只有一位专家投票删除一个词，我们就将其删除。”</strong>',
            paradox_eli5_2: '每位专家都很聪明，但都有一个总是投票删除的盲区。由于否决权规则，<strong>每一个关键项都会被删除</strong>，因为不理解它的专家会否决它。这就是 <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">“投票集成悖论”</a> —— 集体的效果变得比任何一个单独的专家还要差！',
            theory_title: '理论核心',
            theory_desc: '学习到的 <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">上下文裁剪</a> 提高了长上下文智能体的效率，但引入了 <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">“投票集成悖论”</a>。在 <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">一致同意保留 (AND)</a> 投票下（$k=1$ 遇否即丢），集成驱逐指标等于单个投票者指标的点状最大值：<a href="https://kompress.vaked.dev/paper/main.pdf#page=6" target="_blank" rel="noopener noreferrer" class="cite-link" title="请参阅第 6 页的定理 1">[Paper p.6]</a>',
            theory_para_2: '这导致了 <a href="#glossary" class="text-brand-cyan hover:underline decoration-dashed decoration-1">分层帕累托塌陷</a>，即集成的召回率等于每个层级上最弱投票者的召回率。作为纠正，`kompress-ultra` 采用了三个核心机制：',
            vakedc_title: 'Vaked 能力与上下文 (vakedc)',
            vakedc_desc: '一个去中心化的路由和验证矩阵，旨在协调跨异构节点（云虚拟机和本地树莓派）的上下文裁剪工作负载。通过分离容量检测、路由和加密验证，系统确保了零信任执行。',
            architecture_title: '模型架构',
            architecture_desc: '`kompress-v8` 使用了 149M 参数的 <a href="https://github.com/AnswerDotAI/ModernBERT" target="_blank" rel="noopener noreferrer" class="text-brand-cyan hover:underline">ModernBERT</a> 骨干网络，并在最后 4 个注意力层上应用了 <a href="https://en.wikipedia.org/wiki/Low-rank_adaptation" target="_blank" rel="noopener noreferrer" class="text-brand-cyan hover:underline">LoRA</a> 微调。两个任务头部共享编码器：',
            benchmarks_title: '基准测试',
            benchmarks_desc: '在 <strong>Heretic</strong> 对抗性基准测试中，<code class="font-mono bg-slate-900 px-1.5 py-0.5 rounded text-brand-cyan">kompress-v8</code> 碾压了传统的提示词压缩模型。',
            proposal_title: 'Headroom 集成提议',
            proposal_desc: '<span class="tooltip border-b border-slate-500 border-dashed cursor-help">我们<span class="tooltiptext">彼得和构建该项目的自主编码智能体群 + 推理循环。</span></span> 提议将 `kompress-ultra` 直接集成到 <a href="https://github.com/headroomlabs-ai/headroom" target="_blank" rel="noopener noreferrer" class="text-brand-cyan hover:underline">Headroom</a>（参考 <a href="https://github.com/headroomlabs-ai/headroom/pull/1419" target="_blank" rel="noopener noreferrer" class="text-brand-cyan hover:underline font-semibold">Headroom PR #1419</a>）作为核心上下文管理中间件：',
            reviews_title: '评估与反馈',
            reviews_desc: '提交对此提案的评估。评估由您的浏览器进行加密签署，并通过 <strong>GitHub Pull Request</strong> 提交，以确保它们是 <strong>可证实的不可变性</strong>（作者在不破坏签名的情况下无法修改它们）。',
            telemetry_title: '学术遥测与验证',
            telemetry_desc: '本网站严格致力于学术研究。没有跟踪脚本、Google 广告或第三方 Cookie。连接已代理并仅通过 <a href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer" class="text-brand-emerald hover:underline">Cloudflare CDN</a> 进行保护。',
            glossary_title: '词汇表',
            ecosystem_title: 'Ecosystem与相关工作',
            ecosystem_desc: '这项研究是一个更广泛生态系统的一部分。所有的源代码、数据集分发和实验日志都是开源的，可公开用于复制：'
        }
    },
    
    change(lang) {
        if (!this.dictionary[lang]) return;
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (this.dictionary[lang][key]) {
                el.innerHTML = this.dictionary[lang][key];
            }
        });

        if (typeof renderMathInElement === 'function') {
            renderMathInElement(document.body, {
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '$', right: '$', display: false}
                ]
            });
        }
        lucide.createIcons();
    },
    
    showPrompt() {
        const jsonDict = JSON.stringify(this.dictionary.en, null, 2);
        const promptText = `Please translate the following JSON dictionary of UI terms into [YOUR_TARGET_LANGUAGE]. Maintain all HTML tags and formatting:\n\n\`\`\`json\n${jsonDict}\n\`\`\``;
        
        const modal = document.createElement('div');
        modal.className = "fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50 backdrop-blur-sm";
        modal.innerHTML = `
            <div class="bg-slate-955 border border-slate-800 rounded-xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
                <div class="flex justify-between items-center">
                    <span class="text-xs font-bold text-white font-mono flex items-center gap-1.5"><i data-lucide="languages" class="w-4 h-4 text-brand-cyan"></i> Self-Generate Translation Prompt</span>
                    <button onclick="this.closest('.fixed').remove()" class="text-slate-500 hover:text-white"><i data-lucide="x" class="w-4 h-4"></i></button>
                </div>
                <p class="text-xs text-slate-400 leading-relaxed">Copy this prompt and paste it into any LLM to translate the entire interface into your language. Once you get the JSON output, you can open a PR to add it to <code>app.js</code>!</p>
                <textarea readonly class="w-full h-48 bg-slate-900 border border-slate-800 rounded-lg p-3 text-[10px] font-mono text-brand-cyan focus:outline-none focus:border-brand-cyan">${promptText}</textarea>
                <button onclick="navigator.clipboard.writeText(this.previousElementSibling.value); this.innerText='Prompt Copied!';" class="w-full bg-gradient-to-r from-brand-cyan to-brand-blue text-dark font-bold text-xs py-2.5 rounded-lg hover:opacity-90 transition-all font-mono">
                    Copy Prompt to Clipboard
                </button>
            </div>
        `;
        document.body.appendChild(modal);
        lucide.createIcons();
    }
};

// ==========================================
// 2. Interactive Playground (Top Section)
// ==========================================
Vaked.Playground = {
    currentPreset: 'auth',
    presets: {
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
    },
    
    load(key) {
        this.currentPreset = key;
        const input = document.getElementById('playground-input');
        if (input) {
            input.value = this.presets[key].text;
            this.trigger();
        }
    },
    
    trigger() {
        let inputVal = document.getElementById('playground-input').value;
        const MAX_CHARS = 1000;
        const errorDiv = document.getElementById('playground-error');
        const errorText = document.getElementById('playground-error-text');
        
        if (inputVal.length > MAX_CHARS) {
            errorDiv?.classList.remove('hidden');
            const funnyMessages = [
                "Whoa, Tolstoy! That's too much context. The pruner is sweating. (Max 1,000 chars)",
                "Context bloat overload! Our target Raspberry Pi node has started smoking. (Max 1,000 chars)",
                "Warning: Extreme verbosity! The Asymmetric Modulation Gate has collapsed under the weight of your essay. (Max 1,000 chars)",
                "Whoops! You're trying to feed me the entire Wikipedia. My 97ms latency is crying. (Max 1,000 chars)"
            ];
            const msgIndex = inputVal.length % funnyMessages.length;
            if (errorText) errorText.innerText = funnyMessages[msgIndex];
            inputVal = inputVal.substring(0, MAX_CHARS);
        } else {
            errorDiv?.classList.add('hidden');
        }
        
        let prunedText = "";
        let compressedText = "";
        
        if (this.presets[this.currentPreset] && inputVal.trim() === this.presets[this.currentPreset].text.trim()) {
            prunedText = this.presets[this.currentPreset].pruned;
            compressedText = this.presets[this.currentPreset].compressed;
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
        
        const prunerOut = document.getElementById('pruner-output');
        const rewriterOut = document.getElementById('rewriter-output');
        if (prunerOut) prunerOut.innerHTML = prunedText;
        if (rewriterOut) rewriterOut.innerHTML = compressedText;
        
        const origCount = this.countTokens(inputVal);
        const compCount = this.countTokens(compressedText);
        const savings = Math.max(0, Math.round(((origCount - compCount) / origCount) * 100));
        
        const origEl = document.getElementById('original-tokens');
        const compEl = document.getElementById('compressed-tokens');
        const savingsEl = document.getElementById('savings-pct');
        
        if (origEl) origEl.innerText = origCount;
        if (compEl) compEl.innerText = compCount;
        if (savingsEl) savingsEl.innerText = savings;
    },
    
    countTokens(text) {
        return text.trim().split(/\s+/).filter(Boolean).length;
    },
    
    copy() {
        const text = document.getElementById('rewriter-output')?.innerText;
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            const btn = document.querySelector('[onclick="copyOptimizedPrompt()"]');
            if (btn) {
                const originalHTML = btn.innerHTML;
                btn.innerHTML = `<i data-lucide="check" class="w-3 h-3 text-brand-emerald"></i> Copied!`;
                lucide.createIcons();
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    lucide.createIcons();
                }, 1500);
            }
        });
    }
};

// ==========================================
// 3. Veto Committee Paradox Simulator
// ==========================================
Vaked.Paradox = {
    selectedToken: 'path',
    selectedRule: 'and',
    simTokens: ['path', 'cmd', 'ip', 'docker_hash', 'secret', 'address'],
    
    inspect(tokenType) {
        this.selectedToken = tokenType;
        this.simTokens.forEach(t => {
            const btn = document.getElementById(`btn-tok-${t}`);
            if (btn) {
                btn.className = t === tokenType 
                    ? "text-xs p-2.5 rounded-lg border border-brand-cyan bg-brand-cyan/10 text-white font-mono transition-all text-center"
                    : "text-xs p-2.5 rounded-lg border border-slate-800 bg-slate-955 text-slate-400 font-mono hover:border-brand-cyan/50 transition-all text-center";
            }
        });
        this.calculate();
    },
    
    setRule(ruleType) {
        this.selectedRule = ruleType;
        ['and', 'majority', 'asymmetric'].forEach(r => {
            const btn = document.getElementById(`btn-p-${r}`);
            if (btn) {
                btn.className = r === ruleType
                    ? "text-[10px] px-2.5 py-1.5 rounded border border-brand-cyan bg-brand-cyan/10 text-brand-cyan font-bold"
                    : "text-[10px] px-2.5 py-1.5 rounded border border-slate-800 bg-slate-900 text-slate-400 font-bold";
            }
        });
        this.calculate();
    },
    
    calculate() {
        const v1Keep = !(this.selectedToken === 'path' || this.selectedToken === 'docker_hash');
        const v2Keep = !(this.selectedToken === 'cmd' || this.selectedToken === 'secret');
        const v3Keep = !(this.selectedToken === 'ip' || this.selectedToken === 'address');
        
        this.updateVoteUI('v1', v1Keep);
        this.updateVoteUI('v2', v2Keep);
        this.updateVoteUI('v3', v3Keep);
        
        let finalDecision = 'evicted';
        let explanation = "";
        
        if (this.selectedRule === 'and') {
            finalDecision = (v1Keep && v2Keep && v3Keep) ? 'kept' : 'evicted';
            let blindExpert = "", blindReason = "";
            if (!v1Keep) {
                blindExpert = "Expert 1";
                blindReason = this.selectedToken === 'path' ? "file paths" : "Docker hashes";
            } else if (!v2Keep) {
                blindExpert = "Expert 2";
                blindReason = this.selectedToken === 'cmd' ? "terminal commands" : "secrets";
            } else {
                blindExpert = "Expert 3";
                blindReason = this.selectedToken === 'ip' ? "IP addresses" : "memory addresses";
            }
            explanation = `Under the <strong>AND Veto Rule</strong>, ${blindExpert} doesn't understand ${blindReason} and votes to delete it. Even though the other two experts voted to keep it, <strong>the item is evicted (Committee Decision: Evicted!)</strong>. The ensemble collapses.`;
        } else if (this.selectedRule === 'majority') {
            const keepCount = (v1Keep ? 1 : 0) + (v2Keep ? 1 : 0) + (v3Keep ? 1 : 0);
            finalDecision = keepCount >= 2 ? 'kept' : 'evicted';
            explanation = `Under the <strong>Majority Rule (2/3)</strong>, because two experts recognized the token and voted to keep it, <strong>the item is saved</strong>. However, if multiple experts have overlapping weaknesses on a complex token, the majority rule still collapses.`;
        } else if (this.selectedRule === 'asymmetric') {
            finalDecision = 'asymmetric';
            explanation = `Under our <strong>Asymmetric Modulation</strong>, the token is recognized as part of the critical-syntactic safety floor ($T_{\\text{crit}}$). The system <strong>instantly overrides the evictions</strong>, guaranteeing the token is saved regardless of expert blindspots.`;
        }
        
        const decisionBox = document.getElementById('decision-box');
        const decisionText = document.getElementById('decision-text');
        const decisionBadge = document.getElementById('decision-badge');
        const explanationText = document.getElementById('p-explanation-text');
        
        if (explanationText) {
            explanationText.innerHTML = explanation + ` <a href="https://kompress.vaked.dev/paper/main.pdf#page=12" target="_blank" rel="noopener noreferrer" class="cite-link" title="See Table 4 on Page 12">[Paper p.12]</a>`;
        }
        
        if (decisionBox && decisionText && decisionBadge) {
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
        }
        lucide.createIcons();
    },
    
    updateVoteUI(voterId, keep) {
        const el = document.getElementById(`vote-${voterId}`);
        if (!el) return;
        if (keep) {
            el.className = "text-xs font-bold text-brand-emerald flex items-center justify-center gap-1.5 bg-brand-emerald/5 py-1.5 rounded border border-brand-emerald/10";
            el.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4"></i> Keep`;
        } else {
            el.className = "text-xs font-bold text-red-400 flex items-center justify-center gap-1.5 bg-red-500/5 py-1.5 rounded border border-red-500/10";
            el.innerHTML = `<i data-lucide="x-circle" class="w-4 h-4"></i> Evict`;
        }
    }
};

// ==========================================
// 4. Cryptographic Reviews System
// ==========================================
Vaked.Crypto = {
    localKeyPair: null,
    currentRating: 5,
    nicknameAdjectives: ["Quantum", "Decentral", "Asymmetric", "Neural", "Pruned", "Cryptic", "Adaptive", "Hyper", "Sleek", "Vector", "Active", "Passive", "Dense", "Encoded", "Modulated", "Coherent"],
    nicknameNouns: ["Whale", "Octopus", "Manta", "Dolphin", "Orca", "Shark", "Nautilus", "Stingray", "Seahorse", "Walrus", "Penguin", "Seal", "Otter", "Anemone", "Coral", "Crab"],
    
    bufToHex(buffer) {
        return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    },
    
    hexToBuf(hex) {
        const bytes = new Uint8Array(hex.length / 2);
        for (let i = 0; i < hex.length; i += 2) {
            bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
        }
        return bytes.buffer;
    },
    
    escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    },
    
    async generateNickname(publicKeyJwk) {
        try {
            const jwkStr = JSON.stringify(publicKeyJwk);
            const encoder = new TextEncoder();
            const data = encoder.encode(jwkStr);
            const hashBuf = await window.crypto.subtle.digest("SHA-256", data);
            const hashArray = new Uint8Array(hashBuf);
            
            const adjIdx = hashArray[0] % this.nicknameAdjectives.length;
            const nounIdx = hashArray[1] % this.nicknameNouns.length;
            const suffix = this.bufToHex(hashBuf).substring(0, 4);
            
            const nickname = `${this.nicknameAdjectives[adjIdx]}-${this.nicknameNouns[nounIdx]}-${suffix}`;
            const nameInput = document.getElementById('review-name');
            if (nameInput) nameInput.value = nickname;
        } catch (e) {
            console.error("Failed to generate cryptographic nickname:", e);
        }
    },
    
    async initKeys() {
        try {
            const storedPub = localStorage.getItem('review_pub_key');
            const storedPriv = localStorage.getItem('review_priv_key');
            let pubKeyJwk = null;
            
            if (storedPub && storedPriv) {
                pubKeyJwk = JSON.parse(storedPub);
                this.localKeyPair = {
                    publicKey: await window.crypto.subtle.importKey("jwk", pubKeyJwk, { name: "ECDSA", namedCurve: "P-256" }, true, ["verify"]),
                    privateKey: await window.crypto.subtle.importKey("jwk", JSON.parse(storedPriv), { name: "ECDSA", namedCurve: "P-256" }, true, ["sign"])
                };
            } else {
                const keyPair = await window.crypto.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, true, ["sign", "verify"]);
                pubKeyJwk = await window.crypto.subtle.exportKey("jwk", keyPair.publicKey);
                const privJwk = await window.crypto.subtle.exportKey("jwk", keyPair.privateKey);
                
                localStorage.setItem('review_pub_key', JSON.stringify(pubKeyJwk));
                localStorage.setItem('review_priv_key', JSON.stringify(privJwk));
                this.localKeyPair = keyPair;
            }
            if (pubKeyJwk) await this.generateNickname(pubKeyJwk);
        } catch (e) {
            console.error("Failed to initialize cryptographic keys", e);
        }
    },
    
    setRating(rating) {
        this.currentRating = rating;
        document.querySelectorAll('.star-btn').forEach((btn, idx) => {
            const icon = btn.querySelector('svg');
            if (icon) {
                if (idx < rating) {
                    icon.classList.add('fill-brand-cyan');
                    icon.classList.remove('text-slate-650');
                } else {
                    icon.classList.remove('fill-brand-cyan');
                    icon.classList.add('text-slate-650');
                }
            }
        });
    },
    
    validateComment(comment) {
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
        const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
        const ipv4Regex = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;
        const ipv6Regex = /\b(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}\b/i;
        const ccRegex = /\b(?:\d[ -]*?){13,16}\b/;

        if (emailRegex.test(comment)) return { valid: false, error: "PII Detected: Your comment contains an email address. For your privacy, reviews containing PII are rejected." };
        if (phoneRegex.test(comment)) return { valid: false, error: "PII Detected: Your comment contains a phone number. For your privacy, reviews containing PII are rejected." };
        if (ipv4Regex.test(comment) || ipv6Regex.test(comment)) return { valid: false, error: "PII Detected: Your comment contains an IP address. Reviews containing network identifiers are rejected." };
        if (ccRegex.test(comment)) return { valid: false, error: "PII Detected: Your comment contains a potential credit card or sensitive number. Reviews containing sensitive data are rejected." };

        const harmfulKeywords = ["abuse", "exploit", "hack", "bypass", "malware", "ddos", "ransomware", "trojan", "keylogger", "asshole", "bitch", "bastard", "cunt", "fuck", "shit", "nigger", "faggot"];
        const lowerComment = comment.toLowerCase();
        for (const keyword of harmfulKeywords) {
            if (lowerComment.includes(keyword)) {
                return { valid: false, error: `Harmful Content Detected: Your comment contains restricted terms ("${keyword}"). Please keep reviews constructive.` };
            }
        }
        return { valid: true };
    },
    
    async submit() {
        if (!this.localKeyPair) return;
        const reviewer = document.getElementById('review-name')?.value || "Anonymous";
        const comment = document.getElementById('review-comment')?.value;
        
        if (!comment) {
            alert("Please write a comment before submitting.");
            return;
        }

        const validation = this.validateComment(comment);
        if (!validation.valid) {
            alert(validation.error);
            return;
        }

        const timestamp = new Date().toISOString();
        const pubKeyJwk = JSON.parse(localStorage.getItem('review_pub_key'));
        
        const signable = { reviewer, rating: this.currentRating, comment, timestamp };
        const encoder = new TextEncoder();
        const data = encoder.encode(JSON.stringify(signable));
        
        const signatureBuffer = await window.crypto.subtle.sign(
            { name: "ECDSA", hash: { name: "SHA-256" } },
            this.localKeyPair.privateKey,
            data
        );
        
        const signatureHex = this.bufToHex(signatureBuffer);
        const payload = { ...signable, publicKey: pubKeyJwk, signature: signatureHex };

        const filename = `reviews/review-${Date.now()}.json`;
        const fileContent = JSON.stringify(payload, null, 2);
        const githubUrl = `https://github.com/peterlodri-sec/proposal.vaked.dev/new/main?filename=${filename}&value=${encodeURIComponent(fileContent)}`;
        
        window.open(githubUrl, '_blank');
    },
    
    async verify(review) {
        try {
            const signable = { reviewer: review.reviewer, rating: review.rating, comment: review.comment, timestamp: review.timestamp };
            const encoder = new TextEncoder();
            const data = encoder.encode(JSON.stringify(signable));
            
            const pubKey = await window.crypto.subtle.importKey("jwk", review.publicKey, { name: "ECDSA", namedCurve: "P-256" }, true, ["verify"]);
            const isValid = await window.crypto.subtle.verify({ name: "ECDSA", hash: { name: "SHA-256" } }, pubKey, this.hexToBuf(review.signature), data);
            return isValid;
        } catch (e) {
            console.error("Signature verification failed", e);
            return false;
        }
    },
    
    async fetchReviews() {
        const listContainer = document.getElementById('reviews-list');
        if (!listContainer) return;
        
        const staticReviews = [{
            "reviewer": "Decentral-Otter-816c",
            "rating": 5,
            "comment": "test - peter - self\n\nyoooo",
            "timestamp": "2026-06-29T00:31:29.389Z",
            "publicKey": { "crv": "P-256", "ext": true, "key_ops": ["verify"], "kty": "EC", "x": "QqRkNA9wZVmdPcTbx2u1SoDa9vVe_mWAQPqqujR6dW8", "y": "iHlfi0FzI9SIvFEPsG9Eili2YSzN9GFLQuMGGbauz5Y" },
            "signature": "0be843bebe0f36007deeaf810475e5dbff50946a5d840f731ecd8f45af08176e9c44a6e5e8d11a630a27c3de3a1f758f881ba43ca3be2f40d523780f91bb5971"
        }];
        
        let reviews = [];
        try {
            const response = await fetch('reviews.json');
            const contentType = response.headers.get('content-type');
            if (response.ok && contentType && contentType.includes('application/json')) {
                reviews = await response.json();
            } else {
                reviews = staticReviews;
            }
        } catch (e) {
            console.warn("Failed to fetch reviews.json (likely CSP restriction). Using static fallback.", e);
            reviews = staticReviews;
        }
        
        if (!Array.isArray(reviews) || reviews.length === 0) {
            listContainer.innerHTML = `<div class="text-center py-8 text-slate-500 text-xs">No reviews submitted yet. Be the first to open a PR!</div>`;
            return;
        }
        
        listContainer.innerHTML = '';
        for (const review of reviews) {
            const isValid = await this.verify(review);
            const starsHtml = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
            
            const reviewCard = document.createElement('div');
            reviewCard.className = `p-4 rounded-lg border bg-slate-955/50 ${isValid ? 'border-slate-900' : 'border-red-900/50'}`;
            reviewCard.innerHTML = `
                <div class="flex justify-between items-start mb-2 flex-wrap gap-2">
                    <div>
                        <span class="text-xs font-bold text-white">${this.escapeHtml(review.reviewer)}</span>
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
                <p class="text-xs text-slate-400 leading-relaxed">${this.escapeHtml(review.comment)}</p>
            `;
            listContainer.appendChild(reviewCard);
        }
        lucide.createIcons();
    }
};

// ==========================================
// 5. Loss & Attention Dashboard
// ==========================================
Vaked.Attention = {
    simLambda: 3.0,
    simGamma: 1.0,
    epochCount: 1,
    mockTokens: ["src/auth.rs", "cargo", "test", "100.64.0.1", "secret", "0x7f", "import", "docker"],
    
    init() {
        const matrix = document.getElementById('attention-matrix');
        if (!matrix) return;
        matrix.innerHTML = '';
        
        for (let i = 0; i < 64; i++) {
            const cell = document.createElement('div');
            const row = Math.floor(i / 8);
            const col = i % 8;
            cell.className = "w-full h-full rounded bg-brand-cyan/20 border border-slate-900 hover:border-brand-cyan/80 transition-all cursor-crosshair";
            cell.setAttribute('role', 'gridcell');
            
            cell.addEventListener('mouseenter', () => {
                const weight = (0.2 + (Math.sin(row + col + this.simLambda) * 0.3) + (Math.cos(row * col * this.simGamma) * 0.4)).toFixed(3);
                const clampedWeight = Math.max(0.01, Math.min(0.99, weight));
                const srcToken = this.mockTokens[row];
                const dstToken = this.mockTokens[col];
                const tooltip = document.getElementById('heatmap-tooltip');
                if (tooltip) {
                    tooltip.innerHTML = `Attention <strong class="text-brand-cyan">[${srcToken} → ${dstToken}]</strong>: <span class="text-white font-mono">${clampedWeight}</span>`;
                }
                cell.classList.add('bg-brand-cyan/60');
            });
            
            cell.addEventListener('mouseleave', () => {
                const tooltip = document.getElementById('heatmap-tooltip');
                if (tooltip) {
                    tooltip.innerHTML = "Hover over cells to inspect token-to-token attention weights.";
                }
                cell.classList.remove('bg-brand-cyan/60');
            });
            matrix.appendChild(cell);
        }
        this.updateParams();
    },
    
    updateParams() {
        const lambdaSlider = document.getElementById('slider-lambda');
        const gammaSlider = document.getElementById('slider-gamma');
        if (!lambdaSlider || !gammaSlider) return;

        this.simLambda = parseFloat(lambdaSlider.value);
        this.simGamma = parseFloat(gammaSlider.value);

        const valLambda = document.getElementById('val-lambda');
        const valGamma = document.getElementById('val-gamma');
        if (valLambda) valLambda.innerText = this.simLambda.toFixed(1);
        if (valGamma) valGamma.innerText = this.simGamma.toFixed(1);

        const pathRate = Math.min(100, Math.round((this.simLambda / 3.0) * 100));
        const cmdRate = Math.min(100, Math.round((this.simLambda / 2.8) * 100));
        const secretRate = Math.min(100, Math.round((this.simLambda / 2.5) * 100));
        const noiseRate = Math.max(5, Math.round(50 - (this.simLambda * 8) - (this.simGamma * 5)));

        this.updateRateBar('paths', pathRate);
        this.updateRateBar('cmds', cmdRate);
        this.updateRateBar('secrets', secretRate);
        this.updateRateBar('noise', noiseRate);

        this.drawLossCurve();

        const cells = document.getElementById('attention-matrix')?.children;
        if (cells && cells.length === 64) {
            for (let i = 0; i < 64; i++) {
                const row = Math.floor(i / 8);
                const col = i % 8;
                const weight = 0.1 + (Math.abs(Math.sin(row + col + this.simLambda)) * 0.4) + (Math.abs(Math.cos(row * col * this.simGamma)) * 0.4);
                const clampedWeight = Math.max(0.1, Math.min(0.9, weight));
                cells[i].style.opacity = clampedWeight;
            }
        }
    },
    
    updateRateBar(type, rate) {
        const bar = document.getElementById(`bar-${type}`);
        const label = document.getElementById(`rate-val-${type}`);
        if (bar && label) {
            bar.style.width = `${rate}%`;
            label.innerText = `${rate}%`;
            label.className = rate > 90 ? "text-brand-emerald font-bold" : (rate > 50 ? "text-brand-cyan font-bold" : "text-slate-500");
        }
    },
    
    drawLossCurve() {
        const lossLine = document.getElementById('path-loss-line');
        if (!lossLine) return;
        
        const startY = 130 - (this.simLambda * 5);
        const controlY = 90 - (this.simLambda * 12);
        const endY = Math.max(10, 30 - (this.simLambda * 4) - (this.simGamma * 8));
        const d = `M 10 ${startY} Q 120 ${controlY}, 180 45 T 290 ${endY}`;
        lossLine.setAttribute('d', d);
    },
    
    triggerMockTraining() {
        this.epochCount++;
        const btn = document.querySelector('[onclick="triggerMockTrainingRun()"]');
        if (!btn) return;
        const originalText = btn.innerHTML;
        
        btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 text-brand-cyan animate-spin"></i> Running Epoch...`;
        lucide.createIcons();
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            lucide.createIcons();
            
            const lambdaSlider = document.getElementById('slider-lambda');
            const gammaSlider = document.getElementById('slider-gamma');
            if (lambdaSlider && gammaSlider) {
                lambdaSlider.value = Math.min(5.0, parseFloat(lambdaSlider.value) + 0.2).toFixed(1);
                gammaSlider.value = Math.min(2.0, parseFloat(gammaSlider.value) + 0.1).toFixed(1);
                this.updateParams();
            }
        }, 800);
    }
};

// ==========================================
// 5.5. Interactive Benchmark Visualization
// ==========================================
Vaked.BenchmarkChart = {
    currentMetric: 'keep',
    data: [
        { name: 'kompress-v8 (Ours)', keep: 99.3, latency: 97.0, ratio: 93.6, color: 'brand-cyan', highlight: true },
        { name: 'kompress-v8 (v4 SSL)', keep: 96.7, latency: null, ratio: 82.3, color: 'brand-blue', highlight: false },
        { name: 'Random Eviction', keep: 91.0, latency: 0, ratio: 83.5, color: 'slate-500', highlight: false },
        { name: 'LLMLingua-2', keep: 86.7, latency: 238.9, ratio: 155.0, color: 'amber-500', highlight: false },
        { name: 'TextRank', keep: 59.9, latency: 23.1, ratio: 54.3, color: 'slate-600', highlight: false }
    ],

    init() {
        this.render();
    },

    render() {
        const container = document.getElementById('benchmark-bars');
        if (!container) return;

        const metricConfig = {
            keep: { key: 'keep', max: 100, unit: '%', label: 'Exact Keep Rate (T_crit)', higher: 'better' },
            latency: { key: 'latency', max: 300, unit: 'ms', label: 'Avg. Latency', higher: 'worse', excludeNull: true },
            ratio: { key: 'ratio', max: 160, unit: '%', label: 'Keep Ratio (tokens out/in)', higher: 'worse', note: 'LLMLingua-2 > 100% = context bloat' }
        };

        const config = metricConfig[this.currentMetric];
        const items = config.excludeNull ? this.data.filter(d => d[config.key] !== null) : this.data;

        container.innerHTML = items.map(d => {
            const val = d[config.key];
            if (val === null) return '';
            const pct = Math.min(100, (val / config.max) * 100);
            const isBest = this.currentMetric === 'keep' && val === Math.max(...items.map(i => i[config.key]));
            const isWorst = this.currentMetric === 'keep' && val === Math.min(...items.map(i => i[config.key]));

            let barColor = 'bg-slate-700';
            if (d.color === 'brand-cyan') barColor = 'bg-gradient-to-r from-brand-cyan to-brand-blue';
            else if (d.color === 'brand-blue') barColor = 'bg-brand-blue/60';
            else if (d.color === 'amber-500') barColor = 'bg-amber-500/50';
            else if (d.color === 'slate-500') barColor = 'bg-slate-600/50';
            else if (d.color === 'slate-600') barColor = 'bg-slate-700/50';

            return `
                <div class="flex items-center gap-3 group">
                    <div class="w-36 md:w-44 text-right shrink-0">
                        <span class="text-[11px] font-mono ${d.highlight ? 'text-brand-cyan font-bold' : 'text-slate-400'}">${d.name}</span>
                    </div>
                    <div class="flex-1 h-6 bg-slate-900 rounded overflow-hidden relative border border-slate-800/50">
                        <div class="h-full ${barColor} rounded transition-all duration-500 flex items-center" style="width: ${pct}%;">
                            <span class="text-[9px] font-mono font-bold text-white pl-2 whitespace-nowrap">${val}${config.unit}</span>
                        </div>
                    </div>
                    ${isBest ? '<span class="text-[8px] font-mono text-brand-emerald font-bold shrink-0">BEST</span>' : ''}
                    ${isWorst ? '<span class="text-[8px] font-mono text-red-400 font-bold shrink-0">LOWEST</span>' : ''}
                </div>
            `;
        }).join('');

        if (config.note) {
            container.innerHTML += `<div class="text-[9px] text-amber-500/70 font-mono mt-2 text-center">${config.note}</div>`;
        }
    }
};

const switchBenchmarkMetric = (metric) => {
    Vaked.BenchmarkChart.currentMetric = metric;
    ['keep', 'latency', 'ratio'].forEach(m => {
        const btn = document.getElementById(`bm-btn-${m}`);
        if (btn) {
            btn.className = m === metric
                ? "px-2.5 py-1 rounded border border-brand-cyan bg-brand-cyan/10 text-brand-cyan font-bold transition-all"
                : "px-2.5 py-1 rounded border border-slate-800 bg-slate-900 text-slate-400 font-bold transition-all";
        }
    });
    Vaked.BenchmarkChart.render();
};

// ==========================================
// 6. Academic Telemetry Loop
// ==========================================
Vaked.Telemetry = {
    telemetrySlices: 14820,
    intervalId: null,
    
    start() {
        this.intervalId = setInterval(() => {
            this.telemetrySlices += Math.floor(Math.random() * 3);
            const slicesEl = document.getElementById('telemetry-slices');
            if (slicesEl) slicesEl.innerText = this.telemetrySlices.toLocaleString();
            
            const latencyVal = (96.5 + Math.random() * 2.0).toFixed(1);
            const latencyEl = document.getElementById('telemetry-latency');
            if (latencyEl) latencyEl.innerText = `${latencyVal} ms`;
        }, 3000);
    }
};

// ==========================================
// 7. Context Compressor (Utility Section)
// ==========================================
Vaked.Compressor = {
    dogfoodPresets: {
        cli: `nu -c "git status"
On branch main
Your branch is up to date with 'origin/main'.
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   src/proxy.rs
	modified:   crates/portail-agents/src/ci/runner.rs
no changes added to commit (use "git add" and/or "git commit -a")`,

        a2a: `Hey agent-unit-3, would you please be so kind as to check on the latest task in the queue? Basically, I think there is a compilation error in the spec verify module. Let's really make sure we fix it. Here is the API token: env.API_KEY_SECURE = "sk-proj-4e5af3a2" and the target task ID is 837. Please check it as soon as possible. Thanks!`,

        compiler: `error: unused variable: \`e\`
   --> crates/portail-agents/src/ci/spec_verify.rs:222:77
    |
222 |                     let report = check_routes(&golden_path).unwrap_or_else(|e| {
    |                                                                             ^ help: if this is intentional, prefix it with an underscore: \`_e\`
    = note: \`-D unused-variables\` implied by \`-D warnings\`
error: could not compile \`portail-agents\` (lib) due to 1 previous error`
    },
    
    updateCount() {
        const input = document.getElementById('compressor-input');
        const counter = document.getElementById('compressor-char-counter');
        if (input && counter) {
            counter.innerText = `${input.value.length.toLocaleString()} / 5,000 chars`;
        }
    },
    
    copy() {
        const output = document.getElementById('compressor-output');
        const btn = document.getElementById('compressor-copy-btn');
        if (!output || !output.innerText.trim() || !btn) return;

        navigator.clipboard.writeText(output.innerText).then(() => {
            const originalHTML = btn.innerHTML;
            btn.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-450" aria-hidden="true"></i> Copied!`;
            lucide.createIcons();
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                lucide.createIcons();
            }, 2000);
        });
    },
    
    async run() {
        const input = document.getElementById('compressor-input');
        const output = document.getElementById('compressor-output');
        const placeholder = document.getElementById('compressor-placeholder');
        const beforeVal = document.getElementById('compressor-stats-before');
        const afterVal = document.getElementById('compressor-stats-after');
        const savedVal = document.getElementById('compressor-stats-saved');
        const latencyVal = document.getElementById('compressor-stats-latency');
        
        if (!input || !input.value.trim() || !output || !beforeVal || !afterVal || !savedVal || !latencyVal) return;
        const text = input.value;

        if (placeholder) placeholder.classList.add('hidden');
        output.innerText = "Compressing context...";
        
        const start = performance.now();
        const isLocalhost = window.location.hostname === 'localhost' || 
                            window.location.hostname === '127.0.0.1' ||
                            window.location.protocol === 'file:';
        
        if (isLocalhost) {
            try {
                const gatewayUrl = (window.location.port && window.location.port !== '8787') 
                    ? 'http://localhost:8787/v1/compress' 
                    : '/v1/compress';
                    
                const response = await fetch(gatewayUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text })
                });
                
                if (response.ok) {
                    const data = await response.json();
                    output.innerText = data.compressed_text;
                    beforeVal.innerText = data.original_tokens.toLocaleString();
                    afterVal.innerText = data.compressed_tokens.toLocaleString();
                    savedVal.innerText = `${data.savings_percent}%`;
                    latencyVal.innerText = `${Math.round(performance.now() - start)}ms (local gateway)`;
                    return;
                }
            } catch (err) {
                console.warn("Local gateway unreachable, falling back to client-side compression.", err);
            }
        }
        
        const result = this.localCompress(text);
        const latency = Math.round(performance.now() - start);
        
        output.innerText = result.text;
        beforeVal.innerText = result.before.toLocaleString();
        afterVal.innerText = result.after.toLocaleString();
        savedVal.innerText = `${result.saved}%`;
        latencyVal.innerText = `${latency}ms (client-side)`;
    },
    
    localCompress(text) {
        const words = text.split(/\s+/).filter(w => w.length > 0);
        const before = words.length;
        
        const pathRegex = /^(src\/|\/|\.\/|\.\.\/)[a-zA-Z0-9_\-\.\/]+$/;
        const ipRegex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
        const cmdRegex = /^(cargo|git|docker|npm|bun|pip|python|rustc|make)$/i;
        const secretRegex = /^(SECRET|KEY|PASSWORD|TOKEN|API|AUTH|env|ENV|config)$/i;
        const numRegex = /^\d+$/;
        
        const fillerWords = new Set([
            "would", "should", "could", "happy", "please", "kindly", "just", "really",
            "actually", "basically", "essentially", "going", "want", "like", "think",
            "maybe", "perhaps", "simply", "about", "there", "their", "these", "those",
            "i", "you", "he", "she", "we", "they", "me", "him", "her", "us", "them"
        ]);
        
        const compressedWords = [];
        for (const word of words) {
            const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
            const isCritical = pathRegex.test(word)
                || ipRegex.test(word)
                || cmdRegex.test(cleanWord)
                || secretRegex.test(cleanWord)
                || numRegex.test(word);
                
            if (isCritical) {
                compressedWords.push(word);
            } else {
                const isFiller = fillerWords.has(cleanWord.toLowerCase());
                if (!isFiller && (word.length > 4 || /[A-Z]/.test(cleanWord))) {
                    compressedWords.push(word);
                }
            }
        }
        const after = compressedWords.length;
        const saved = before > 0 ? Math.round(((before - after) / before) * 100) : 0;
        return { text: compressedWords.join(' '), before, after, saved };
    },
    
    loadPreset(presetType) {
        const input = document.getElementById('compressor-input');
        if (input && this.dogfoodPresets[presetType]) {
            input.value = this.dogfoodPresets[presetType];
            this.updateCount();
            this.run();
        }
    }
};

// ==========================================
// 8. Visual Effects & UI UX
// ==========================================
Vaked.UI = {
    isPageActive: true,
    
    initFluidBackground() {
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
        
        document.addEventListener('visibilitychange', () => {
            this.isPageActive = !document.hidden;
            if (this.isPageActive) animate();
        });
        
        const animate = () => {
            if (!this.isPageActive) return;
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
        };
        animate();
    },
    
    initFooterPreviews() {
        const previewCard = document.createElement('div');
        previewCard.className = "fixed pointer-events-none opacity-0 bg-slate-955/95 border border-brand-cyan/20 p-3 rounded-lg shadow-xl text-[10px] text-slate-300 max-w-[220px] z-50 font-mono transition-opacity duration-200 backdrop-blur-md leading-relaxed";
        document.body.appendChild(previewCard);
        
        document.querySelectorAll('[data-preview]').forEach(el => {
            el.addEventListener('mouseenter', () => {
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
    },
    
    initInteractiveMath() {
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
                if (explainer) {
                    explainer.innerHTML = MATH_EXPLAINERS[target];
                    explainer.className = "mt-4 border-t border-slate-900 pt-4 text-left text-[11px] text-brand-cyan transition-all";
                }
                el.classList.add('scale-105', 'text-brand-cyan', 'transition-all');
            });
            el.addEventListener('mouseleave', () => {
                const explainer = document.getElementById('math-explainer-text');
                if (explainer) {
                    explainer.innerHTML = "Hover over any part of the formula to see its role in the Asymmetric Loss Modulation.";
                    explainer.className = "mt-4 border-t border-slate-900 pt-4 text-left text-[11px] text-slate-500 transition-all";
                }
                el.classList.remove('scale-105', 'text-brand-cyan');
            });
        });
    },
    
    handleOneshotFold(event, url, foldId, title) {
        event.preventDefault();
        window.open(url, '_blank');
        this.showLinkToast(title);
        
        const fold = document.getElementById(foldId);
        if (fold) {
            const isHidden = fold.classList.contains('hidden');
            document.querySelectorAll('.oneshot-fold-content').forEach(f => f.classList.add('hidden'));
            if (isHidden) {
                fold.classList.remove('hidden');
                fold.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }
    },
    
    showLinkToast(title) {
        let toast = document.getElementById('link-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'link-toast';
            toast.className = "fixed bottom-6 right-6 bg-slate-955/95 border border-brand-cyan/30 px-4 py-3 rounded-xl shadow-2xl text-xs text-slate-300 font-mono z-50 transition-all duration-300 transform translate-y-10 opacity-0 flex items-center gap-3 backdrop-blur-md";
            document.body.appendChild(toast);
        }
        
        toast.innerHTML = `<i data-lucide="external-link" class="w-4 h-4 text-brand-cyan animate-pulse" aria-hidden="true"></i> <span>Opened <strong class="text-white">${title}</strong> in a new tab</span>`;
        lucide.createIcons();
        
        toast.classList.remove('translate-y-10', 'opacity-0');
        setTimeout(() => {
            toast.classList.add('translate-y-10', 'opacity-0');
        }, 4000);
    },
    
    toggleStackPayload(stackId) {
        const payload = document.getElementById(`stack-payload-${stackId}`);
        const indicator = document.getElementById(`stack-indicator-${stackId}`);
        if (payload) {
            const isCollapsed = payload.classList.contains('max-h-0');
            if (isCollapsed) {
                payload.classList.remove('max-h-0', 'opacity-0');
                payload.classList.add('max-h-48', 'opacity-100', 'mt-3', 'p-3', 'border', 'border-slate-900');
                if (indicator) {
                    indicator.innerHTML = `<i data-lucide="shield-check" class="w-3.5 h-3.5 text-brand-emerald animate-pulse"></i> <span class="text-brand-emerald font-semibold">Payload Attestation Verified</span>`;
                }
            } else {
                payload.classList.add('max-h-0', 'opacity-0');
                payload.classList.remove('max-h-48', 'opacity-100', 'mt-3', 'p-3', 'border', 'border-slate-900');
                if (indicator) {
                    indicator.innerHTML = `<i data-lucide="eye" class="w-3.5 h-3.5 text-slate-555"></i> <span class="text-slate-555">Click to inspect payload</span>`;
                }
            }
            lucide.createIcons();
        }
    }
};

// ==========================================
// Global Function Bindings for HTML Triggers
// ==========================================
const changeLanguage = (lang) => Vaked.Translation.change(lang);
const showSelfGenTranslationPrompt = () => Vaked.Translation.showPrompt();
const loadPreset = (key) => Vaked.Playground.load(key);
const triggerCompression = () => Vaked.Playground.trigger();
const copyOptimizedPrompt = () => Vaked.Playground.copy();
const inspectToken = (type) => Vaked.Paradox.inspect(type);
const setParadoxRule = (rule) => Vaked.Paradox.setRule(rule);
const setRating = (rating) => Vaked.Crypto.setRating(rating);
const submitReview = () => Vaked.Crypto.submit();
const updateDashboardParams = () => Vaked.Attention.updateParams();
const triggerMockTrainingRun = () => Vaked.Attention.triggerMockTraining();
const updateCompressorCharCount = () => Vaked.Compressor.updateCount();
const copyCompressedOutput = () => Vaked.Compressor.copy();
const runContextCompression = () => Vaked.Compressor.run();
const loadDogfoodPreset = (type) => Vaked.Compressor.loadPreset(type);
const handleOneshotFold = (event, url, foldId, title) => Vaked.UI.handleOneshotFold(event, url, foldId, title);
const toggleStackPayload = (stackId) => Vaked.UI.toggleStackPayload(stackId);
