// Insert (chained hash table)
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

const M = 7; // Number of buckets
const initial = [63, 52, 17, 12]; // Already in the table: 63 → 0, 52 → 3, 17 → 3 (chained under 52), 12 → 5
const inserts = [30, 24, 24]; // 30 lands in an empty bucket, 24 collides, the second 24 is a duplicate
const hash = (k) => k % M;
const table = Array.from({ length: M }, () => []); // table[b] = keys chained under bucket b, head first

// RENDER DIAGRAM

const BASE = "#555555", FILLED = "#3b8beb", COMPARE = "#f0b429", ACTIVE = "#ba0d5b";
const FOUND = "#17ec7a", TRAVERSE = "#3b8beb", MISSING = "#ff6b6b", EDGE = "#888888";
const GAP = 60; // Distance between bucket centres
const KEY_Y = 90; // Height at which an incoming key floats above the table
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
const chainAttrs = (key, b, depth) => ({
  shape: "rect", size: [18, 14], fixed: true, color: FILLED, pos: [xAt(b), -CHAIN_GAP * depth],
  labels: { 0: { text: String(key), color: "#ffffff", size: 13 } },
});

// Draw the keys that are already stored, directly and without animation
for (const key of initial) {
  const b = hash(key), depth = table[b].length;
  if (depth === 0) {
    canvas.node("b" + b).color(FILLED);
    canvas.node("b" + b).label().text(String(key)).color("#ffffff");
  } else {
    canvas.node("c" + key).add(chainAttrs(key, b, depth));
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

let count = 0;
function insert(key) {
  const b = hash(key), id = "k" + (count++);
  resetColours();
  q.node(id).add({
    shape: "circle", size: 14, fixed: true, color: ACTIVE, pos: [0, KEY_Y],
    labels: { 0: { text: String(key), color: "#ffffff", size: 13 } },
  });
  step(`Insert key ${key}`);

  q.node(id).pos([xAt(b), KEY_Y]);
  step(`h(${key}) = ${key} mod ${M} = ${b}, move above bucket ${b}`);

  if (table[b].length === 0) {
    q.node(id).pos([xAt(b), 0]); // Drop into the bucket, then the bucket takes over showing the key
    q.node(id).remove();
    q.node("b" + b).color(FILLED);
    q.node("b" + b).label().text(String(key)).color("#ffffff");
    table[b].push(key);
    step(`Bucket ${b} is empty, place ${key}`);
    return;
  }

  q.node("b" + b).color(COMPARE);
  step(`Bucket ${b} is occupied by ${table[b][0]} → collision, walk the chain looking for ${key}`);

  // Walk the chain: the key may already be there, in which case nothing is inserted
  for (let i = 0; i < table[b].length; i++) {
    const node = nodeOf(b, i), k = table[b][i];
    if (i > 0) q.edge([nodeOf(b, i - 1), node]).traverse(TRAVERSE, nodeOf(b, i - 1));
    q.node(node).color(COMPARE);
    if (k === key) {
      q.node(node).color(FOUND);
      step(`Compare ${k} with ${key}: equal`);
      q.node(id).color(MISSING);
      q.node(id).remove();
      step(`${key} already present, no duplicate inserted`);
      return;
    }
    step(`Compare ${k} with ${key}: not equal`);
  }

  // Reached the end of the chain without finding the key: append it
  const depth = table[b].length, prev = nodeOf(b, depth - 1), last = table[b][depth - 1];
  table[b].push(key);
  q.node(id).remove();
  q.node("c" + key).add(chainAttrs(key, b, depth));
  q.edge([prev, "c" + key]).add({ directed: true, curve: "linear", color: EDGE });
  step(`End of chain, append ${key} after ${last} under bucket ${b}`);
}

for (const key of inserts) insert(key);
