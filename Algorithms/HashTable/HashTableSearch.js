// Search (chained hash table)
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

const M = 7; // Number of buckets
const initial = [63, 52, 17, 24, 12, 47]; // 63 → 0; 52, 17, 24 → 3 (one chain); 12, 47 → 5 (a second chain)
const searches = [63, 24, 38]; // Directly in a bucket, at the end of a chain, and not in the table
const hash = (k) => k % M;
const table = Array.from({ length: M }, () => []); // table[b] = keys chained under bucket b, head first

// RENDER DIAGRAM

const BASE = "#555555", FILLED = "#3b8beb", COMPARE = "#f0b429", ACTIVE = "#ba0d5b";
const FOUND = "#17ec7a", TRAVERSE = "#3b8beb", MISSING = "#ff6b6b", EDGE = "#888888";
const GAP = 60; // Distance between bucket centres
const KEY_Y = 90; // Height at which the key being searched for floats above the table
const CHAIN_GAP = 50; // Vertical distance between chained nodes below a bucket
const xAt = (i) => (i - (M - 1) / 2) * GAP;
canvas.size([460, 320]);

// One rectangular node per bucket, showing its index in dim text until a key lands in it
const buckets = Array.from({ length: M }, (_, i) => "b" + i);
canvas.nodes(buckets).add({
  shape: "rect", size: [18, 14], fixed: true, color: BASE,
  pos: (_, i) => [xAt(i), 0],
  labels: (_, i) => ({ 0: { text: String(i), color: "#888888", size: 11 } }),
});
buckets.forEach((b, i) => {
  canvas.node(b).label("idx").add({ text: String(i), pos: [0, 26], color: "#888888", size: 9 });
});
canvas.labels(["title"]).add({ text: `h(k) = k mod ${M}`, pos: [0, 135], color: "#888888", size: 12 });

// Node id of the idx-th key in bucket b: the bucket itself holds the head, chain nodes hold the rest
const nodeOf = (b, idx) => (idx === 0 ? "b" + b : "c" + table[b][idx]);

// Draw the keys that are already stored, directly and without animation
for (const key of initial) {
  const b = hash(key), depth = table[b].length;
  if (depth === 0) {
    canvas.node("b" + b).color(FILLED);
    canvas.node("b" + b).label().text(String(key)).color("#ffffff");
  } else {
    canvas.node("c" + key).add({
      shape: "rect", size: [18, 14], fixed: true, color: FILLED, pos: [xAt(b), -CHAIN_GAP * depth],
      labels: { 0: { text: String(key), color: "#ffffff", size: 13 } },
    });
    canvas.edge([nodeOf(b, depth - 1), "c" + key]).add({ directed: true, curve: "linear", color: EDGE });
  }
  table[b].push(key);
}

const q = canvas.withQ("q1"); // Everything queued on q is animated step by step

// Put every stored node and chain edge back to its resting colour
function resetColours() {
  const nodes = [], edges = [];
  table.forEach((chain, b) => chain.forEach((_, i) => {
    nodes.push(nodeOf(b, i));
    if (i > 0) edges.push([nodeOf(b, i - 1), nodeOf(b, i)]);
  }));
  q.nodes(nodes).color(FILLED);
  if (edges.length > 0) q.edges(edges).color(EDGE);
}

// Queued changes that tidy up after an operation; they run at the start of the next one
let cleanup = [];

function search(key) {
  const b = hash(key), id = "k" + key;
  resetColours();
  cleanup.forEach((fn) => fn());
  cleanup = [];
  q.node(id).add({
    shape: "circle", size: 14, fixed: true, color: ACTIVE, pos: [0, KEY_Y],
    labels: { 0: { text: String(key), color: "#ffffff", size: 13 } },
  });
  step(`Search for key ${key}`);

  q.node(id).pos([xAt(b), KEY_Y]);
  step(`h(${key}) = ${key} mod ${M} = ${b}, move above bucket ${b}`);

  if (table[b].length === 0) {
    q.node("b" + b).color(MISSING);
    q.node(id).color(MISSING);
    step(`Bucket ${b} is empty, ${key} not found`);
    cleanup.push(() => { q.node(id).remove(); q.node("b" + b).color(BASE); });
    return;
  }

  // Walk the chain comparing each stored key with the one we are looking for
  for (let i = 0; i < table[b].length; i++) {
    const node = nodeOf(b, i), k = table[b][i];
    if (i > 0) q.edge([nodeOf(b, i - 1), node]).traverse(TRAVERSE, nodeOf(b, i - 1));
    q.node(node).color(COMPARE);
    if (k === key) {
      q.node(node).color(FOUND);
      q.node(id).color(FOUND);
      step(`Compare ${k} with ${key}: equal`);
      q.node(id).remove();
      const where = i === 0 ? `directly in bucket ${b}` : `at position ${i + 1} of the chain under bucket ${b}`;
      step(`${key} found ${where} after ${i + 1} comparison${i === 0 ? "" : "s"}`);
      return;
    }
    step(`Compare ${k} with ${key}: not equal${i + 1 < table[b].length ? ", follow the chain" : ""}`);
  }

  q.nodes(table[b].map((_, i) => nodeOf(b, i))).color(MISSING);
  q.node(id).color(MISSING);
  step(`End of chain, ${key} not found after ${table[b].length} comparisons`);
  cleanup.push(() => q.node(id).remove());
}

for (const key of searches) search(key);
