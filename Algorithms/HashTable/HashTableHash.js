// Hash
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

const M = 7; // Number of buckets
const keys = [45, 71, 89, 63, 34]; // Fixed keys, none of them collide under k mod 7
const hash = (k) => k % M;

// RENDER DIAGRAM

const BASE = "#555555", FILLED = "#3b8beb", ACTIVE = "#ba0d5b", DONE = "#17ec7a";
const GAP = 60; // Distance between bucket centres
const KEY_Y = 90; // Height at which an incoming key floats above the table
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

function insert(key) {
  const b = hash(key), id = "k" + key;
  q.node(id).add({
    shape: "circle", size: 14, fixed: true, color: ACTIVE, pos: [0, KEY_Y],
    labels: { 0: { text: String(key), color: "#ffffff", size: 13 } },
  });
  step(`Insert key ${key}`);

  q.node(id).pos([xAt(b), KEY_Y]);
  step(`h(${key}) = ${key} mod ${M} = ${b}, move above bucket ${b}`);

  q.node(id).pos([xAt(b), 0]); // Drop into the bucket, then the bucket takes over showing the key
  q.node(id).remove();
  q.node("b" + b).color(FILLED);
  q.node("b" + b).label().text(String(key)).color("#ffffff");
  step(`Bucket ${b} is empty, place ${key}`);
}

for (const key of keys) insert(key);

q.nodes(keys.map((k) => "b" + hash(k))).color(DONE);
step(`${keys.length} keys placed in ${M} buckets, load factor ${keys.length}/${M} ≈ ${(keys.length / M).toFixed(2)}`);
