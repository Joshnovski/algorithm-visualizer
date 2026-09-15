// Collision Resolution (separate chaining)
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

const M = 7; // Number of buckets
const keys = [52, 12, 17, 30, 47, 24]; // 52, 17, 24 all hash to 3; 12, 47 both hash to 5; 30 hashes to 2
const hash = (k) => k % M;
const table = Array.from({ length: M }, () => []); // table[b] = keys chained under bucket b, head first

// RENDER DIAGRAM

const BASE = "#555555", FILLED = "#3b8beb", COMPARE = "#f0b429", ACTIVE = "#ba0d5b", EDGE = "#888888";
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

const q = canvas.withQ("q1"); // Everything queued on q is animated step by step

// Node id of the idx-th key in bucket b: the bucket itself holds the head, chain nodes hold the rest
const nodeOf = (b, idx) => (idx === 0 ? "b" + b : "c" + table[b][idx]);

function insert(key) {
  const b = hash(key), id = "k" + key;
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
  step(`Bucket ${b} is occupied by ${table[b][0]} → collision`);

  // Separate chaining: append a new node below the last key already in this bucket
  const depth = table[b].length, prev = nodeOf(b, depth - 1), last = table[b][depth - 1];
  table[b].push(key);
  q.node(id).remove();
  q.node("c" + key).add({
    shape: "rect", size: [18, 14], fixed: true, color: FILLED, pos: [xAt(b), -CHAIN_GAP * depth],
    labels: { 0: { text: String(key), color: "#ffffff", size: 13 } },
  });
  q.edge([prev, "c" + key]).add({ directed: true, curve: "linear", color: EDGE });
  q.node("b" + b).color(FILLED);
  step(depth === 1 ? `Chain ${key} under bucket ${b}` : `Chain ${key} after ${last} under bucket ${b}`);
}

for (const key of keys) insert(key);

const longest = table.reduce((best, chain, b) => (chain.length > table[best].length ? b : best), 0);
q.nodes(table[longest].map((_, i) => nodeOf(longest, i))).color(COMPARE);
step(`Longest chain has ${table[longest].length} keys; lookups in bucket ${longest} take up to ${table[longest].length} comparisons`);
