# Writing an algorithm

Every algorithm is a pair of files, `<Name>.js` (the visualisation) and `<Name>.md`
(the description), anywhere under this folder. They are loaded into the database with

```
python manage.py import_algorithm --prune
```

## Naming

`<Name>` is the algorithm's path in the sidebar (see `frontend/src/algorithms.json`) with
spaces and hyphens removed: **Array // Sort // Bubble Sort** becomes `ArraySortBubbleSort`,
**Graph // Depth-First Search** becomes `GraphDepthFirstSearch`. The folder the file sits in
does not matter, but keep one folder per top-level category.

## How the code runs

The whole `.js` file is shown in the editor and executed as the body of a function with these
arguments:

| name         | what it is                                                                 |
| ------------ | -------------------------------------------------------------------------- |
| `canvas`     | an [AlgorithmX](https://algrx.github.io/docs/js) canvas, already attached  |
| `step(msg)`  | ends the current animation frame and writes `msg` to the log pane          |
| `jsnx`       | [jsnetworkx](https://github.com/fkling/JSNetworkX) for building graphs     |
| `seedrandom` | seeded `Math.random`, so a "random" structure is the same on every build   |
| `console`    | the browser console                                                        |

The rules that make the Step / Play controls work:

1. Draw the initial data structure with plain `canvas.…` calls. Those run immediately.
2. Animate with `const q = canvas.withQ("q1");` and only `q.…` calls. The queue is kept
   stopped, so nothing moves until the user presses Step or Play.
3. Call `step("what just happened")` after each group of `q` calls. One `step()` = one frame
   = one log line = one tick of the progress bar.
4. Do not queue anything after the final `step()`, it would never be shown.
5. Always call `canvas.size([width, height])`. The canvas uses Cartesian coordinates with
   `(0, 0)` in the centre and **y pointing up**; keep everything inside ±width/2, ±height/2
   with a small margin. The SVG is scaled to fit the pane.

Aim for roughly 15–45 steps. Messages should be short, in the present tense and mention the
values involved ("Compare 74 and 43", "43 < 74, swap them").

## AlgorithmX cheat sheet (v2)

```js
// Nodes. IDs are strings or numbers and must not contain "-".
canvas.nodes(["n0", "n1"]).add({
  shape: "rect",              // "circle" (default) | "rect" | "ellipse"
  size: [16, 16],             // HALF width / HALF height (radius for circles). Default 12.
  fixed: true,                // keep the automatic layout from moving it
  color: "#555555",
  pos: (_, i) => [i * 40, 0], // functions are allowed for top-level attributes only
  labels: (_, i) => ({ 0: { text: values[i], color: "#ffffff", size: 13 } }), // label 0 = value
});
canvas.node("n0").label("idx").add({ text: "0", pos: [0, -30], color: "#888888", size: 10 });
canvas.labels(["title"]).add({ text: "Stack", pos: [0, 120], color: "#888888", size: 12 }); // free text

// Edges are identified by [source, target].
canvas.edges([["n0", "n1"]]).add({ directed: true, curve: "linear" });
canvas.edge(["n0", "n1"]).label().add({ text: "7" });        // edge weight label

// Animated changes (all on q):
q.node("n0").color("#ba0d5b");
q.node("n0").highlight().size("1.5x");                        // temporary pulse
q.node("n0").pos([40, 0]);                                    // slide to a new position
q.node("n0").label().text(42);                                // change the value shown
q.edge(["n0", "n1"]).traverse("#3b8beb", "n0");               // colour flows from n0 to n1
q.edge(["n0", "n1"]).color("#3b8beb");
q.node("n0").remove();  q.edge(["n0", "n1"]).remove();
q.node("n2").add({ pos: [80, 0], fixed: true });              // add during the animation

// Graph layout (non-fixed nodes): canvas.edgelength(90) sets the average edge length.
```

Palette used across the algorithms so they feel consistent:

| purpose                       | colour    |
| ----------------------------- | --------- |
| idle element                  | `#555555` |
| being compared / examined     | `#f0b429` |
| active / swapping / visiting  | `#ba0d5b` |
| finished / sorted / found     | `#17ec7a` |
| traversal of an edge          | `#3b8beb` |
| removed / not found           | `#ff6b6b` |
| labels on white text          | `#ffffff`, dim text `#888888` |

## The description file

`<Name>.md` is plain markdown shown in the Description tab: a title, a few paragraphs on how
the algorithm works, and a `## Complexity` table where it makes sense. Keep it self-contained
(no reference or link lists).

## Checking your work

```
cd frontend
npm run validate               # every algorithm
npm run validate -- LinkedList # only files whose name contains "LinkedList"
```

This runs each file against a mock canvas and reports files that throw, never call `step()`,
queue animation after the last step, are missing their `.md`, or don't match a sidebar entry.
Then `npm run build`, `python manage.py import_algorithm --prune`, and reload the page.
