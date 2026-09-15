<a name="readme-top"></a>

<br />
<div align="center">
  <h3 align="center">S I M P L I F Y</h3>

  <p align="center">
    Simplify the process of learning data structures and algorithms. Learn at your own pace by controlling your exploration of a variety of algorithms, each with visible code and dynamic animations to assist in the learning experience.
    <br />
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#adding-an-algorithm">Adding an Algorithm</a></li>
    <li><a href="#how-it-works">How It Works</a></li>
    <li><a href="#built-with">Built With</a></li>
  </ol>
</details>

## About The Project

[![DashboardDesktop][product-screenshot-desktop]]()
[![DashboardMobile][product-screenshot-mobile]]()

Pick an algorithm from the sidebar, watch it animate step by step, read the log of what each
step does, and edit the code in the right-hand pane and press **Build** to see your own
version run.

Algorithms included: bubble / selection / insertion / merge / quick sort, linear and binary
search, linked list insert / delete / traverse / reverse, stack and queue operations, binary
search tree insert / delete / search and the three depth-first traversals, max-heap insert /
delete / heap sort, hash table hashing / collision resolution / insert / delete / search, and
graph breadth-first search, depth-first search and Dijkstra's shortest path.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started

You only need Python 3.10 or newer. Clone the repository and run

```
python run.py
```

That creates a virtual environment in `.venv`, installs the Python packages, prepares the
database, loads the algorithms and opens http://127.0.0.1:8000 in your browser. Run the same
command again any time; each step is skipped when it is already done. Options:
`--port 8080`, `--no-browser`, `--setup-only`, `--build`.

The compiled frontend bundle is committed, so Node.js is **not** needed to run the app.

**Working on the React frontend** (needs Node.js 18+)

```powershell
cd frontend
npm install
npm run dev          # rebuilds frontend/static/frontend/main.js on every change
```

Keep that running in a second terminal alongside `python run.py`, and commit the rebuilt
bundle with your source changes.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Adding an Algorithm

1. Add the entry to the sidebar tree in `frontend/src/algorithms.json`.
2. Create `Algorithms/<Category>/<Name>.js` and `<Name>.md`, where `<Name>` is the sidebar
   path with spaces and hyphens removed (**Array // Sort // Bubble Sort** →
   `ArraySortBubbleSort`). See [Algorithms/README.md](Algorithms/README.md) for the code
   contract and an AlgorithmX cheat sheet.
3. `cd frontend && npm run validate` checks every file without a browser.
4. Restart `python run.py` (which re-imports the algorithms) and reload the page. The
   sidebar comes from the bundle, so step 1 needs `npm run build` (or `npm run dev`).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## How It Works

- Django serves a single page and a small REST API (`/api/algorithms/`) that returns each
  algorithm's code and description from SQLite.
- The React app fetches the code for the selected algorithm and runs it in the browser with
  an [AlgorithmX](https://algrx.github.io/) canvas. Every `step("message")` in the code marks
  one animation frame; the Step button, Play timer, log pane and progress bar all move
  through the same step counter, so they can never drift apart.
- Edits in the code editor take effect when you press **Build**. The **Description** tab next
  to the code shows the algorithm's markdown write-up.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Built With

* [![React.js][React.js]][React-url]
* [![Django.org][Django.org]][Django-url]
* [![SQLite][SQLite.org]][SQLite-url]
* [AlgorithmX](https://algrx.github.io/) and [JSNetworkX](https://github.com/fkling/JSNetworkX)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[product-screenshot-desktop]: static/DesktopView.PNG
[product-screenshot-mobile]: static/MobileView.PNG
[SQLite.org]: https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white
[SQLite-url]: https://www.sqlite.org/index.html
[React.js]: https://img.shields.io/badge/react-black?style=for-the-badge&logo=react&logoColor=white
[React-url]: https://react.dev/
[Django.org]: https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green
[Django-url]: https://www.djangoproject.com/
