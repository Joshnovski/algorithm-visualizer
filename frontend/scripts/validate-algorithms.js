/*
 * Validates every algorithm file under ../Algorithms without a browser.
 *
 *   npm run validate            (from the frontend folder)
 *
 * Checks, for each <Name>.js:
 *   - a matching <Name>.md description exists
 *   - the name matches a leaf in src/algorithms.json (and every leaf has a file)
 *   - the code runs without throwing against a mock canvas
 *   - it calls step("message") at least once, every message is a non-empty string
 *   - it does not leave events on the animation queue after the final step
 */
const fs = require("fs");
const path = require("path");
const seedrandom = require("seedrandom");
const jsnx = require("jsnetworkx");

const ALGORITHMS_DIR = path.resolve(__dirname, "../../Algorithms");
const catalogue = require("../src/algorithms.json");
// Optional substring filter, e.g. `npm run validate -- LinkedList` checks only those files
// (and skips the "every catalogue entry has a file" check).
const FILTER = process.argv[2] || "";

// Mirrors handleDropdownClick in App.js: "Graph" + "Depth-First Search" -> "GraphDepthFirstSearch"
const formatName = (segments) => segments.map((s) => s.replace(/[\s-]+/g, "")).join("");

const leafNames = new Set();
const collectLeaves = (items, trail) => {
  for (const item of items) {
    const fullPath = [...trail, item.title];
    if (item.children) collectLeaves(item.children, fullPath);
    else leafNames.add(formatName(fullPath));
  }
};
collectLeaves(catalogue, []);

// A canvas stand-in: every property is a chainable no-op, except pause() which we count so
// we can make sure nothing is queued after the final step().
const makeMockCanvas = (state) => {
  const handler = {
    get(_target, prop) {
      if (prop === "then") return undefined;
      if (prop === "pause") {
        return () => {
          state.queuedEventsSinceStep = 0;
          return proxy;
        };
      }
      return (...args) => {
        state.queuedEventsSinceStep += 1;
        return proxy;
      };
    },
    apply() {
      return proxy;
    },
  };
  const proxy = new Proxy(function () {}, handler);
  return proxy;
};

const walk = (dir) => {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith(".js")) out.push(full);
  }
  return out;
};

let failures = 0;
const fail = (file, message) => {
  failures += 1;
  console.error(`  FAIL  ${path.relative(ALGORITHMS_DIR, file)}: ${message}`);
};

const files = walk(ALGORITHMS_DIR).filter((f) => path.basename(f).includes(FILTER));
const seenNames = new Set();

for (const file of files) {
  const name = path.basename(file, ".js");
  seenNames.add(name);
  const mdFile = file.replace(/\.js$/, ".md");
  if (!fs.existsSync(mdFile)) fail(file, "missing description file " + path.basename(mdFile));
  if (!leafNames.has(name)) fail(file, "no entry in src/algorithms.json produces this name");

  const code = fs.readFileSync(file, "utf8");
  const state = { queuedEventsSinceStep: 0 };
  const logs = [];
  const step = (message) => {
    if (typeof message !== "string" || message.trim() === "") {
      throw new Error(`step() called with an invalid message: ${JSON.stringify(message)}`);
    }
    logs.push(message);
    state.queuedEventsSinceStep = 0;
  };
  const quietConsole = { log() {}, warn() {}, error() {} };

  try {
    const run = new Function("canvas", "jsnx", "seedrandom", "console", "step", code);
    run(makeMockCanvas(state), jsnx, seedrandom, quietConsole, step);
  } catch (e) {
    fail(file, `threw while running: ${e && e.message}`);
    continue;
  }

  if (logs.length === 0) fail(file, "never called step()");
  if (state.queuedEventsSinceStep > 0) {
    fail(file, `${state.queuedEventsSinceStep} animation call(s) after the last step() will never be shown`);
  }
  if (!code.includes("canvas.size(")) fail(file, "does not call canvas.size([width, height])");

  console.log(`  ok    ${path.relative(ALGORITHMS_DIR, file)}  (${logs.length} steps)`);
}

for (const leaf of leafNames) {
  if (!FILTER && !seenNames.has(leaf)) {
    failures += 1;
    console.error(`  FAIL  catalogue entry "${leaf}" has no Algorithms/**/${leaf}.js file`);
  }
}

console.log(failures === 0 ? `\nAll ${files.length} algorithms passed.` : `\n${failures} problem(s) found.`);
process.exit(failures === 0 ? 0 : 1);
