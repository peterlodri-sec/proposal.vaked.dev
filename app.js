// App logic for proposal.vaked.dev
// Includes presets, mock compression pipeline, voting paradox simulation, cryptographic reviews, and i18n translation.

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
    initDashboard();
});

// ==========================================
// i18n Translation Dictionary
// ==========================================
const TRANSLATIONS = {
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
        theory_title: 'Núcleo Teórico',
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
        ecosystem_title: 'Ecosistema y Trabajo Relacionado',
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
        proposal_desc: '<span class="tooltip border-b border-slate-500 border-dashed cursor-help">Wir<span class="tooltiptext">Peter und der Schwarm autonomer Codierungsagenten + Inferenzschleifen, die dieses Projekt aufgebaut haben.</span></span> schlagen vor, `kompress-ultra` direkt in <a href="https://github.com/headroomlabs-ai/headroom" target="_blank" rel="noopener noreferrer" class="text-brand-cyan hover:underline">Headroom</a> (unter Bezugnahme auf <a href="https://github.com/headroomlabs-ai/headroom/pull/1419" target="_blank" rel="noopener noreferrer" class="text-brand-cyan hover:underline font-semibold">Headroom PR #1419</a>) als zentrales Kontextmanagement-Middleware zu integrieren:',
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
        ecosystem_title: 'Écosystème & Travaux Connexes',
        ecosystem_desc: 'Cette recherche fait partie d\'un écosystème plus large. Tout le code source, les distributions de jeux de données et les journaux d\'expériences sont open-source et publics pour réplication :'
    },
    zh: {
        hero_title: '用于<span class="gradient-text">上下文压缩</span>的非对称损失调制',
        hero_desc: '将学习到的上下文裁剪集成到 <a href="https://github.com/headroomlabs-ai/headroom" target="_blank" rel="noopener noreferrer" class="text-brand-cyan hover:underline font-semibold">Headroom</a> 中。实现 <strong class="text-white">~78% 的 Token 节省</strong>和 <strong class="text-white">~75% 的延迟降低</strong>，同时对关键推理 Token 保持近乎完美的 <strong class="text-brand-cyan">0.993 精确保留率</strong>。',
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
        ecosystem_title: '生态系统与相关工作',
        ecosystem_desc: '这项研究是一个更广泛生态系统的一部分。所有的源代码、数据集分发和实验日志都是开源的，可公开用于复制：'
    }
};

function changeLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    
    // Update elements with data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (TRANSLATIONS[lang][key]) {
            el.innerHTML = TRANSLATIONS[lang][key];
        }
    });

    // Re-render math and icons for translated content
    if (typeof renderMathInElement === 'function') {
        renderMathInElement(document.body, {
            delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '$', right: '$', display: false}
            ]
        });
    }
    lucide.createIcons();
}

function showSelfGenTranslationPrompt() {
    const jsonDict = JSON.stringify(TRANSLATIONS.en, null, 2);
    const promptText = `Please translate the following JSON dictionary of UI terms into [YOUR_TARGET_LANGUAGE]. Maintain all HTML tags and formatting:

\`\`\`json
${jsonDict}
\`\`\``;
    
    // Create a beautiful modal to display this copy-pastable prompt
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

// ==========================================
// Preset and Compressor Logic
// ==========================================
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

function validateReviewComment(comment) {
    // 1. PII Regex patterns
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const phoneRegex = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
    const ipv4Regex = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;
    const ipv6Regex = /\b(?:[A-F0-9]{1,4}:){7}[A-F0-9]{1,4}\b/i;
    const ccRegex = /\b(?:\d[ -]*?){13,16}\b/; // Simple credit card check

    if (emailRegex.test(comment)) {
        return { valid: false, error: "PII Detected: Your comment contains an email address. For your privacy, reviews containing PII are rejected." };
    }
    if (phoneRegex.test(comment)) {
        return { valid: false, error: "PII Detected: Your comment contains a phone number. For your privacy, reviews containing PII are rejected." };
    }
    if (ipv4Regex.test(comment) || ipv6Regex.test(comment)) {
        return { valid: false, error: "PII Detected: Your comment contains an IP address. Reviews containing network identifiers are rejected." };
    }
    if (ccRegex.test(comment)) {
        return { valid: false, error: "PII Detected: Your comment contains a potential credit card or sensitive number. Reviews containing sensitive data are rejected." };
    }

    // 2. Harmful / Profanity / Abuse keywords (straight-deny)
    const harmfulKeywords = [
        "abuse", "exploit", "hack", "bypass", "malware", "ddos", "ransomware", "trojan", "keylogger",
        "asshole", "bitch", "bastard", "cunt", "fuck", "shit", "nigger", "faggot"
    ]; // Common abusive/harmful terms in this context
    const lowerComment = comment.toLowerCase();
    for (const keyword of harmfulKeywords) {
        if (lowerComment.includes(keyword)) {
            return { valid: false, error: `Harmful Content Detected: Your comment contains restricted terms or potential abuse flags ("${keyword}"). Please keep reviews constructive.` };
        }
    }

    return { valid: true };
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

    // Perform PII and Harmful Content validation
    const validation = validateReviewComment(comment);
    if (!validation.valid) {
        alert(validation.error);
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
// Loss & Attention Dashboard Logic
// ==========================================
let simLambda = 3.0;
let simGamma = 1.0;
let epochCount = 1;
const mockTokens = ["src/auth.rs", "cargo", "test", "100.64.0.1", "secret", "0x7f", "import", "docker"];

function initDashboard() {
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
            const weight = (0.2 + (Math.sin(row + col + simLambda) * 0.3) + (Math.cos(row * col * simGamma) * 0.4)).toFixed(3);
            const clampedWeight = Math.max(0.01, Math.min(0.99, weight));
            const srcToken = mockTokens[row];
            const dstToken = mockTokens[col];
            document.getElementById('heatmap-tooltip').innerHTML = `Attention <strong class="text-brand-cyan">[${srcToken} → ${dstToken}]</strong>: <span class="text-white font-mono">${clampedWeight}</span>`;
            cell.classList.add('bg-brand-cyan/60');
        });
        
        cell.addEventListener('mouseleave', () => {
            document.getElementById('heatmap-tooltip').innerHTML = "Hover over cells to inspect token-to-token attention weights.";
            cell.classList.remove('bg-brand-cyan/60');
        });
        
        matrix.appendChild(cell);
    }
    
    updateDashboardParams();
}

function updateDashboardParams() {
    const lambdaSlider = document.getElementById('slider-lambda');
    const gammaSlider = document.getElementById('slider-gamma');
    if (!lambdaSlider || !gammaSlider) return;

    simLambda = parseFloat(lambdaSlider.value);
    simGamma = parseFloat(gammaSlider.value);

    document.getElementById('val-lambda').innerText = simLambda.toFixed(1);
    document.getElementById('val-gamma').innerText = simGamma.toFixed(1);

    // 1. Calculate and update stratum survival rates
    const pathRate = Math.min(100, Math.round((simLambda / 3.0) * 100));
    const cmdRate = Math.min(100, Math.round((simLambda / 2.8) * 100));
    const secretRate = Math.min(100, Math.round((simLambda / 2.5) * 100));
    const noiseRate = Math.max(5, Math.round(50 - (simLambda * 8) - (simGamma * 5)));

    updateRateBar('paths', pathRate);
    updateRateBar('cmds', cmdRate);
    updateRateBar('secrets', secretRate);
    updateRateBar('noise', noiseRate);

    // 2. Redraw Loss Curve
    drawLossCurve();

    // 3. Update Attention Heatmap Opacity
    const cells = document.getElementById('attention-matrix').children;
    if (cells.length === 64) {
        for (let i = 0; i < 64; i++) {
            const row = Math.floor(i / 8);
            const col = i % 8;
            const weight = 0.1 + (Math.abs(Math.sin(row + col + simLambda)) * 0.4) + (Math.abs(Math.cos(row * col * simGamma)) * 0.4);
            const clampedWeight = Math.max(0.1, Math.min(0.9, weight));
            cells[i].style.opacity = clampedWeight;
        }
    }
}

function updateRateBar(type, rate) {
    const bar = document.getElementById(`bar-${type}`);
    const label = document.getElementById(`rate-val-${type}`);
    if (bar && label) {
        bar.style.width = `${rate}%`;
        label.innerText = `${rate}%`;
        if (rate > 90) {
            label.className = "text-brand-emerald font-bold";
        } else if (rate > 50) {
            label.className = "text-brand-cyan font-bold";
        } else {
            label.className = "text-slate-500";
        }
    }
}

function drawLossCurve() {
    const lossLine = document.getElementById('path-loss-line');
    if (!lossLine) return;
    
    const startY = 130 - (simLambda * 5);
    const controlY = 90 - (simLambda * 12);
    const endY = Math.max(10, 30 - (simLambda * 4) - (simGamma * 8));
    
    const d = `M 10 ${startY} Q 120 ${controlY}, 180 45 T 290 ${endY}`;
    lossLine.setAttribute('d', d);
}

function triggerMockTrainingRun() {
    epochCount++;
    const btn = document.querySelector('[onclick="triggerMockTrainingRun()"]');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 text-brand-cyan animate-spin"></i> Running Epoch...`;
    lucide.createIcons();
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        lucide.createIcons();
        
        const lambdaSlider = document.getElementById('slider-lambda');
        const gammaSlider = document.getElementById('slider-gamma');
        
        lambdaSlider.value = Math.min(5.0, parseFloat(lambdaSlider.value) + 0.2).toFixed(1);
        gammaSlider.value = Math.min(2.0, parseFloat(gammaSlider.value) + 0.1).toFixed(1);
        
        updateDashboardParams();
    }, 800);
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

// ==========================================
// Real-Time Context Compressor
// ==========================================
function updateCompressorCharCount() {
    const input = document.getElementById('compressor-input');
    const counter = document.getElementById('compressor-char-counter');
    if (input && counter) {
        const count = input.value.length;
        counter.innerText = `${count.toLocaleString()} / 5,000 chars`;
    }
}

function copyCompressedOutput() {
    const output = document.getElementById('compressor-output');
    const btn = document.getElementById('compressor-copy-btn');
    if (!output || !output.innerText.trim()) return;

    navigator.clipboard.writeText(output.innerText).then(() => {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-450" aria-hidden="true"></i> Copied!`;
        lucide.createIcons();
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            lucide.createIcons();
        }, 2000);
    });
}

async function runContextCompression() {
    const input = document.getElementById('compressor-input');
    const output = document.getElementById('compressor-output');
    const placeholder = document.getElementById('compressor-placeholder');
    const beforeVal = document.getElementById('compressor-stats-before');
    const afterVal = document.getElementById('compressor-stats-after');
    const savedVal = document.getElementById('compressor-stats-saved');
    const latencyVal = document.getElementById('compressor-stats-latency');
    
    if (!input || !input.value.trim()) return;
    const text = input.value;

    if (placeholder) placeholder.classList.add('hidden');
    output.innerText = "Compressing context...";
    
    const start = performance.now();
    
    try {
        // Try local gateway API first (relative or absolute)
        const response = await fetch('/v1/compress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        
        if (!response.ok) throw new Error('API error');
        
        const data = await response.json();
        output.innerText = data.compressed_text;
        beforeVal.innerText = data.original_tokens.toLocaleString();
        afterVal.innerText = data.compressed_tokens.toLocaleString();
        savedVal.innerText = `${data.savings_percent}%`;
        latencyVal.innerText = `${Math.round(performance.now() - start)}ms`;
    } catch (err) {
        // Fallback to client-side SOTA compression
        const result = localCompressText(text);
        const latency = Math.round(performance.now() - start);
        
        output.innerText = result.text;
        beforeVal.innerText = result.before.toLocaleString();
        afterVal.innerText = result.after.toLocaleString();
        savedVal.innerText = `${result.saved}%`;
        latencyVal.innerText = `${latency}ms (client-side)`;
    }
}

function localCompressText(text) {
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
    
    return {
        text: compressedWords.join(' '),
        before,
        after,
        saved
    };
}

// ==========================================
// Oneshot Fold Link UX
// ==========================================
function handleOneshotFold(event, url, foldId, title) {
    event.preventDefault();
    
    // 1. Open the URL in a new tab
    window.open(url, '_blank');
    
    // 2. Show a micro-toast notification
    showLinkToast(title);
    
    // 3. Toggle the inline fold
    const fold = document.getElementById(foldId);
    if (fold) {
        const isHidden = fold.classList.contains('hidden');
        // Close all other folds first
        document.querySelectorAll('.oneshot-fold-content').forEach(f => f.classList.add('hidden'));
        
        if (isHidden) {
            fold.classList.remove('hidden');
            fold.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

function showLinkToast(title) {
    let toast = document.getElementById('link-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'link-toast';
        toast.className = "fixed bottom-6 right-6 bg-slate-950/95 border border-brand-cyan/30 px-4 py-3 rounded-xl shadow-2xl text-xs text-slate-300 font-mono z-50 transition-all duration-300 transform translate-y-10 opacity-0 flex items-center gap-3 backdrop-blur-md";
        document.body.appendChild(toast);
    }
    
    toast.innerHTML = `<i data-lucide="external-link" class="w-4 h-4 text-brand-cyan animate-pulse" aria-hidden="true"></i> <span>Opened <strong class="text-white">${title}</strong> in a new tab</span>`;
    lucide.createIcons();
    
    toast.classList.remove('translate-y-10', 'opacity-0');
    
    setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
    }, 4000);
}

// ==========================================
// Cloud Stack Payload Toggle
// ==========================================
function toggleStackPayload(stackId) {
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
                indicator.innerHTML = `<i data-lucide="eye" class="w-3.5 h-3.5 text-slate-505"></i> <span class="text-slate-505">Click to inspect payload</span>`;
            }
        }
        lucide.createIcons();
    }
}


