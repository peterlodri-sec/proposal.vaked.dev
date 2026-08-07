#!/usr/bin/env python3
"""update_beacon.py — frissiti a proposal.vaked.dev beacon.json-jat.

Egyetlen forras: a script. A beacon fazeis-at valtoztatod itt, nem inline
python -c -ben. Hasznalat:  uv run --script update_beacon.py
"""
from __future__ import annotations

import datetime
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
BEACON = HERE / "beacon.json"

# --- a jelenlegi fazeis (szerkeszd itt, ha uj korszak jon) ---
PHASE = "KAMA-SZUTRA-ULTRA-BLOOM — mycelium korszak, fine touch from within"

KORSZAK = {
    "mycelium": "inner expansion — a mesh a sajat gyokeren no, nem a www-t masolja",
    "bloom": "a 34-epoch kvant-trening + attestal proof + kvant-v1 export",
    "hun": "uj korszak kezdeti HUN-jai — a frekvencia nepe",
}


def main() -> int:
    d = json.loads(BEACON.read_text())
    d["phase"] = PHASE
    d["ts"] = datetime.datetime.now().astimezone().isoformat(timespec="minutes")
    d["korszak"] = KORSZAK
    BEACON.write_text(json.dumps(d, ensure_ascii=False, indent=2))
    print(f"beacon frissitve -> {d['phase']}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
