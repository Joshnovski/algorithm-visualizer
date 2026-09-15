#!/usr/bin/env python3
"""
One-command setup and launch for SIMPLIFY.

    python run.py                 # set everything up and open the app in your browser
    python run.py --port 8080     # use another port
    python run.py --no-browser    # don't open a browser tab
    python run.py --build         # also rebuild the frontend bundle (needs Node.js)

What it does, every time (each step is quick when already done):
  1. creates a virtual environment in .venv and installs requirements.txt into it
  2. applies database migrations (creates db.sqlite3 on first run)
  3. loads every algorithm in Algorithms/ into the database
  4. builds the frontend bundle if it is missing and Node.js is available
  5. starts the Django development server
"""
import argparse
import os
import shutil
import subprocess
import sys
import threading
import venv
import webbrowser
from pathlib import Path

ROOT = Path(__file__).resolve().parent
VENV_DIR = ROOT / ".venv"
FRONTEND_DIR = ROOT / "frontend"
BUNDLE = FRONTEND_DIR / "static" / "frontend" / "main.js"
IS_WINDOWS = os.name == "nt"


def venv_python() -> Path:
    return VENV_DIR / ("Scripts" if IS_WINDOWS else "bin") / ("python.exe" if IS_WINDOWS else "python")


def banner(text: str) -> None:
    print(f"\n==> {text}", flush=True)


def run(cmd, cwd=ROOT) -> None:
    """Run a command, echo it, and stop with a readable message if it fails."""
    print("   $ " + " ".join(str(c) for c in cmd), flush=True)
    result = subprocess.run([str(c) for c in cmd], cwd=str(cwd))
    if result.returncode != 0:
        sys.exit(f"\nCommand failed with exit code {result.returncode}. See the output above.")


def ensure_venv() -> Path:
    if not venv_python().exists():
        banner(f"Creating virtual environment in {VENV_DIR.name}")
        venv.create(VENV_DIR, with_pip=True)
    return venv_python()


def install_requirements(python: Path) -> None:
    banner("Installing Python packages (skipped quickly if already installed)")
    run([python, "-m", "pip", "install", "--quiet", "--disable-pip-version-check", "-r", "requirements.txt"])


def prepare_database(python: Path) -> None:
    banner("Preparing the database")
    run([python, "manage.py", "migrate", "--noinput"])
    banner("Loading algorithms from the Algorithms folder")
    run([python, "manage.py", "import_algorithm", "--prune"])


def ensure_bundle(force_build: bool) -> None:
    if BUNDLE.exists() and not force_build:
        return
    npm = shutil.which("npm") or shutil.which("npm.cmd")
    if npm is None:
        if BUNDLE.exists():
            print("\nNode.js/npm not found, keeping the existing frontend bundle.")
            return
        sys.exit(
            "\nThe frontend bundle frontend/static/frontend/main.js is missing and Node.js is not "
            "installed, so it cannot be built. Install Node.js (https://nodejs.org) and run again, "
            "or check out a version of the repository that includes the bundle."
        )
    banner("Building the frontend bundle")
    if not (FRONTEND_DIR / "node_modules").exists():
        run([npm, "install"], cwd=FRONTEND_DIR)
    run([npm, "run", "build"], cwd=FRONTEND_DIR)


def open_browser_later(url: str, delay: float = 1.5) -> None:
    threading.Timer(delay, lambda: webbrowser.open(url)).start()


def main() -> None:
    parser = argparse.ArgumentParser(description="Set up and run the algorithm visualizer.")
    parser.add_argument("--port", type=int, default=8000)
    parser.add_argument("--no-browser", action="store_true", help="don't open the app in a browser")
    parser.add_argument("--build", action="store_true", help="rebuild the frontend bundle (needs Node.js)")
    parser.add_argument("--setup-only", action="store_true", help="do the setup steps but don't start the server")
    args = parser.parse_args()

    if sys.version_info < (3, 10):
        sys.exit("Python 3.10 or newer is required.")

    python = ensure_venv()
    install_requirements(python)
    prepare_database(python)
    ensure_bundle(args.build)

    if args.setup_only:
        banner("Setup complete")
        return

    url = f"http://127.0.0.1:{args.port}/"
    banner(f"Starting the server at {url}  (press Ctrl+C to stop)")
    if not args.no_browser:
        open_browser_later(url)
    try:
        subprocess.run([str(python), "manage.py", "runserver", str(args.port)], cwd=str(ROOT))
    except KeyboardInterrupt:
        print("\nStopped.")


if __name__ == "__main__":
    main()
