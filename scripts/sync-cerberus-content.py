#!/usr/bin/env python3
"""Publish the private v2 repository's generated project documents on this site.

The Cloudflare build only checks out markfeldman-work, so these generated files are
committed here. The v2 publish workflow runs this script after relevant changes;
it can also be run locally for an immediate preview or manual refresh.
"""

from __future__ import annotations

import argparse
import pathlib
import subprocess
import sys
import tempfile


SITE_ROOT = pathlib.Path(__file__).resolve().parent.parent
DEFAULT_V2_ROOT = SITE_ROOT.parent / "perimeter-cerberus-v2"
CONTRACT_ARTIFACT = "https://claude.ai/code/artifact/48318025-e4a5-4b1f-9420-625484342933"
ROADMAP_ARTIFACT = "https://claude.ai/code/artifact/aee09682-f1ee-4dff-940b-673786f90928"
CONTRACT_ROUTE = "/perimeter-cerberus/contract-overview/"
ROADMAP_ROUTE = "/perimeter-cerberus/roadmap/"


def emit(v2_root: pathlib.Path, emitter: str, flag: str, output: pathlib.Path) -> None:
    subprocess.run(
        [sys.executable, str(v2_root / "tools" / emitter), flag, str(output)],
        cwd=v2_root,
        check=True,
    )


def hosted_links(html: str) -> str:
    return html.replace(CONTRACT_ARTIFACT, CONTRACT_ROUTE).replace(
        ROADMAP_ARTIFACT, ROADMAP_ROUTE
    )


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--v2-root",
        type=pathlib.Path,
        default=DEFAULT_V2_ROOT,
        help="path to the perimeter-cerberus-v2 checkout",
    )
    args = parser.parse_args()
    v2_root = args.v2_root.resolve()

    required = (
        v2_root / "tools" / "emit-contract-overview.py",
        v2_root / "tools" / "emit-roadmap.py",
    )
    missing = [str(path) for path in required if not path.is_file()]
    if missing:
        parser.error("missing v2 emitter(s): " + ", ".join(missing))

    roadmap_json = SITE_ROOT / "data" / "cerberus-roadmap.json"
    contract_page = (
        SITE_ROOT
        / "public"
        / "perimeter-cerberus"
        / "contract-overview"
        / "index.html"
    )
    roadmap_page = (
        SITE_ROOT / "public" / "perimeter-cerberus" / "roadmap" / "index.html"
    )

    with tempfile.TemporaryDirectory(prefix="cerberus-site-sync-") as temp_dir:
        temp = pathlib.Path(temp_dir)
        emitted_json = temp / "roadmap.json"
        emitted_contract = temp / "contract-overview.html"
        emitted_roadmap = temp / "roadmap.html"

        emit(v2_root, "emit-roadmap.py", "--json", emitted_json)
        emit(v2_root, "emit-contract-overview.py", "--html", emitted_contract)
        emit(v2_root, "emit-roadmap.py", "--html", emitted_roadmap)

        contract_page.parent.mkdir(parents=True, exist_ok=True)
        roadmap_page.parent.mkdir(parents=True, exist_ok=True)
        roadmap_json.write_text(
            emitted_json.read_text(encoding="utf-8"), encoding="utf-8", newline="\n"
        )
        contract_page.write_text(
            hosted_links(emitted_contract.read_text(encoding="utf-8")),
            encoding="utf-8",
            newline="\n",
        )
        roadmap_page.write_text(
            hosted_links(emitted_roadmap.read_text(encoding="utf-8")),
            encoding="utf-8",
            newline="\n",
        )

    print(f"Updated {roadmap_json.relative_to(SITE_ROOT)}")
    print(f"Updated {contract_page.relative_to(SITE_ROOT)}")
    print(f"Updated {roadmap_page.relative_to(SITE_ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
