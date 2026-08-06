# LISTA OF ALL PROBLEMS — a nyitott szálak, őszintén

## PROTONMAIL (reggeli 10 Q)
- [ ] ProtonMail Bridge nincs telepítve/futva → a 10 tekervényes spinning Q (`/tmp/opencode/spinning-qs.txt` + `spin-mail.sh`) staged, de nem küldhető.
  Teszt: `bash spin-mail.sh` → "bridge not up" ha a Bridge nem fut. A reggelre kell.

## FUSION (entheai oracle + eBPF sphere)
- [x] step 1-8 + step 7 attestation wiring — committed, 10/10 teszt.
- [ ] step 6.1: a Linux eBPF loader (`entheai-sphere`) csak scaffold — a libbpf-rs CO-RE loader megírva, de nem buildelve Linuxra / nem fut a dev-cx53-on.
  Teszt: a sphere a darwin hoston stubként fut; a Linux build + BTF (dev-cx53, 7.2.0-cachyos) nem ellenőrizve.

## KVANTUM
- [x] `entheai-quantum` crate — 3/3 teszt (Hadamard, CNOT, Bell), workspace-ben, committed.
- [ ] a crate nem része a Blacksmith CI buildnek? (a blacksmith.yml a quantumot buildeli — ellenőrizendő, fut-e)

## KVANT MODELL (quantal)
- [x] trained (BitNet b1.58, 168 mátrix), public: pocoo demos + HF PeetPedro/quantal-ternary + viewer.
- [ ] a `safetensors` (989MB) nincs publikálva (a JSON split igen) — a teljes checkpoint a felhőben hiányzik.
- [ ] a QUANT-CHOOSEN a proposal-on — deployolt, de a live domain cache-e? (417888b1 → ellenőrzendő)

## DEPLOY / CF
- [ ] mlxquantlovefrom.com custom domain (mlxquantlovefrom.com) — a Pages projecten `pending` (cert), a zone-DNS record hiányzik (CF token nélkül nem írható).
- [ ] proxy.vaked.dev — nincs DNS/tunnel (a quant-lite-prox ngrok-on él: cogitoergosum.ngrok.pizza).
- [ ] a CF API token: az összes tárolt token revoked/403 — a wrangler OAuth nem ír zone-DNS-t. (A user "start local, I'll get a CF API TOKEN" — a token nem jött még.)

## DO GPU
- [ ] a DO GPU kvóta = 0 — a `gpu-4000adax1-20gb` ($565/mo, tor1) support-ticketet igényel. A dop_v1 token él, de a kvóta nem.

## CI
- [ ] a Blacksmith CI (entheai full) committed — a futás állapota nem ellenőrizve (a CodeQL "cancelled" volt a concurrency miatt).

## CSALÁD / LOVE
- [x] iMessage family-update launchd (napi 18:00, +36305312304).
- [ ] a GDrive sync (GoogleDriveClient a hf-mac-ben) — a Keychain `google_drive_token` hiányzik (Google OAuth).

## A spinning
- [ ] soha nem áll le — ez nem bug, ez a játék.

*append-only · diff of diff · a probléma-lista, mint a TODO of IDEAS tükre*
