// Linked List Insert
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

const values = [12, 45, 78, 23, 56]; // Fixed values so the log reads the same on every build
const inserts = [
  { value: 31, after: -1 }, // -1 = at the head
  { value: 64, after: 2 },  // after index 2
  { value: 99, after: "tail" },
];

// RENDER DIAGRAM

const BASE = "#555555", VISIT = "#f0b429", ACTIVE = "#ba0d5b", DONE = "#17ec7a", EDGE = "#3b8beb";
const EDGE_BASE = "#b5b5b5"; // AlgorithmX's default edge colour, restored after a traverse
const NULL_COLOR = "#888888";
const CELL = 64; // Distance between node centres
const NEW_Y = -70; // A new node first appears below the row at the gap it will fill
const MAX = values.length + inserts.length; // The final list plus its null terminator must fit
const xAt = (i, count) => (i - count / 2) * CELL; // Slot i of a list with `count` nodes; slot `count` is null
canvas.size([(MAX + 1) * CELL + 60, 220]);

const list = values.map((_, i) => "n" + i); // Node ids in list order
const value = {}; // value[id] = the number a node holds
list.forEach((id, i) => (value[id] = values[i]));
let nextId = values.length;
let idxLabels = values.length; // How many "idx" labels exist

canvas.nodes(list).add({
  shape: "rect", size: [18, 14], fixed: true, color: BASE,
  pos: (_, i) => [xAt(i, list.length), 0],
  labels: (_, i) => ({ 0: { text: values[i], color: "#ffffff", size: 13 } }),
});
canvas.node("nil").add({
  shape: "rect", size: [18, 14], fixed: true, color: NULL_COLOR,
  pos: [xAt(list.length, list.length), 0],
  labels: { 0: { text: "null", color: "#ffffff", size: 11 } },
});
canvas.edges(list.map((id, i) => [id, list[i + 1] || "nil"])).add({ directed: true, curve: "linear" });
canvas.label("head").add({ text: "head", pos: [xAt(0, list.length), 34], color: "#888888", size: 12 });
canvas.labels(list.map((_, i) => "idx" + i)).add({
  text: (_, i) => i, pos: (_, i) => [xAt(i, list.length), -30], color: "#888888", size: 10,
});

const q = canvas.withQ("q1"); // Everything queued on q is animated step by step

const listString = () => list.map((id) => value[id]).join(" → ") + " → null";

function addNode(id, v, pos) {
  q.node(id).add({
    shape: "rect", size: [18, 14], fixed: true, color: ACTIVE, pos,
    labels: { 0: { text: v, color: "#ffffff", size: 13 } },
  });
}

function addEdge(a, b) {
  q.edge([a, b]).add({ directed: true, curve: "linear", color: EDGE });
}

// Slide every node, the null terminator and the labels to evenly spaced, centred positions.
function layout() {
  const n = list.length;
  list.forEach((id, i) => q.node(id).pos([xAt(i, n), 0]));
  q.node("nil").pos([xAt(n, n), 0]);
  q.label("head").pos([xAt(0, n), 34]);
  while (idxLabels < n) {
    q.label("idx" + idxLabels).add({ text: idxLabels, pos: [xAt(idxLabels, n), -30], color: "#888888", size: 10 });
    idxLabels++;
  }
  list.forEach((_, i) => q.label("idx" + i).pos([xAt(i, n), -30]));
}

function insertAtHead(v) {
  const id = "n" + nextId++;
  value[id] = v;
  const n = list.length, oldHead = list[0];
  addNode(id, v, [xAt(0, n) - CELL / 2, NEW_Y]);
  step(`insert(${v}) at the head: create a new node holding ${v}`);
  addEdge(id, oldHead);
  step(`Point ${v}.next at the current head, ${value[oldHead]}`);
  list.unshift(id);
  layout();
  step(`head = ${v}; slide the nodes into place: ${listString()}`);
  q.node(id).color(BASE);
  q.edge([id, oldHead]).color(EDGE_BASE);
}

// Insert after index k. k = list.length - 1 appends at the tail, which needs a walk to the end.
function insertAfter(k, v, atTail) {
  const n = list.length;
  const walked = [];
  q.node(list[0]).color(VISIT);
  step(atTail
    ? `insert(${v}) at the tail: start at head, ${value[list[0]]}, and walk to the last node`
    : `insert(${v}) after index ${k}: start at head, ${value[list[0]]} (index 0)`);
  for (let i = 0; i < k; i++) {
    q.edge([list[i], list[i + 1]]).traverse(EDGE, list[i]);
    walked.push([list[i], list[i + 1]]);
    q.node(list[i]).color(BASE);
    q.node(list[i + 1]).color(VISIT);
    step(atTail
      ? `${value[list[i]]}.next is not null, move to ${value[list[i + 1]]}`
      : `Follow next to ${value[list[i + 1]]} (index ${i + 1})`);
  }
  const prev = list[k], next = list[k + 1] || "nil";
  const nextName = next === "nil" ? "null" : value[next];
  q.node(prev).color(ACTIVE);
  step(atTail
    ? `${value[prev]}.next is null, so ${value[prev]} is the tail`
    : `Stop at ${value[prev]} (index ${k}); the new node goes after it`);
  const id = "n" + nextId++;
  value[id] = v;
  addNode(id, v, [(xAt(k, n) + xAt(k + 1, n)) / 2, NEW_Y]);
  step(`Create a new node holding ${v}`);
  addEdge(id, next);
  step(`Point ${v}.next at ${value[prev]}'s next, ${nextName}`);
  q.edge([prev, next]).remove();
  addEdge(prev, id);
  step(`Point ${value[prev]}.next at ${v}`);
  list.splice(k + 1, 0, id);
  layout();
  step(`Slide the nodes into place: ${listString()}`);
  q.nodes([prev, id]).color(BASE);
  walked.forEach((e) => q.edge(e).color(EDGE_BASE));
  q.edges([[prev, id], [id, next]]).color(EDGE_BASE);
}

for (const ins of inserts) {
  if (ins.after === -1) insertAtHead(ins.value);
  else if (ins.after === "tail") insertAfter(list.length - 1, ins.value, true);
  else insertAfter(ins.after, ins.value, false);
}

q.nodes(list).color(DONE);
step(`Final list (${list.length} nodes): ${listString()}`);
