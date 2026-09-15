// Linked List Delete
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

const values = [12, 45, 78, 23, 56]; // Fixed values so the log reads the same on every build
const deletes = ["head", 23, "tail"]; // Delete the head, then the node holding 23, then the tail

// RENDER DIAGRAM

const BASE = "#555555", VISIT = "#f0b429", ACTIVE = "#ba0d5b", DONE = "#17ec7a", EDGE = "#3b8beb", REMOVE = "#ff6b6b";
const EDGE_BASE = "#b5b5b5"; // AlgorithmX's default edge colour, restored after a traverse
const NULL_COLOR = "#888888";
const CELL = 64; // Distance between node centres
const OUT_Y = -70; // An unlinked node drops below the row before it is freed
const xAt = (i, count) => (i - count / 2) * CELL; // Slot i of a list with `count` nodes; slot `count` is null
canvas.size([(values.length + 1) * CELL + 60, 220]);

const list = values.map((_, i) => "n" + i); // Node ids in list order
const value = {}; // value[id] = the number a node holds
list.forEach((id, i) => (value[id] = values[i]));
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
const nameOf = (id) => (id === "nil" ? "null" : value[id]);

function addEdge(a, b) {
  q.edge([a, b]).add({ directed: true, curve: "linear", color: EDGE });
}

// Slide every node, the null terminator and the labels to evenly spaced, centred positions.
function layout() {
  const n = list.length;
  list.forEach((id, i) => q.node(id).pos([xAt(i, n), 0]));
  q.node("nil").pos([xAt(n, n), 0]);
  q.label("head").pos([xAt(0, n), 34]);
  while (idxLabels > n) {
    idxLabels--;
    q.label("idx" + idxLabels).remove();
  }
  list.forEach((_, i) => q.label("idx" + i).pos([xAt(i, n), -30]));
}

function deleteHead() {
  const n = list.length, id = list[0], next = list[1];
  q.node(id).color(ACTIVE);
  step(`deleteHead(): head points at ${value[id]}`);
  q.label("head").pos([xAt(1, n), 34]);
  q.node(id).color(REMOVE);
  step(`head = ${value[id]}.next, so head now points at ${value[next]}`);
  q.edge([id, next]).remove();
  q.node(id).pos([xAt(0, n), OUT_Y]);
  step(`Unlink ${value[id]}: nothing points at it any more`);
  q.node(id).remove();
  list.shift();
  layout();
  step(`Free node ${value[id]}: ${listString()}`);
}

// Walk from the head until a node holds v, then bypass and free it.
function deleteValue(v) {
  const n = list.length;
  const walked = [];
  q.node(list[0]).color(VISIT);
  step(`delete(${v}): start at head, ${value[list[0]]}`);
  let i = 0;
  while (value[list[i]] !== v) {
    q.edge([list[i], list[i + 1]]).traverse(EDGE, list[i]);
    walked.push([list[i], list[i + 1]]);
    q.node(list[i]).color(BASE);
    q.node(list[i + 1]).color(VISIT);
    step(`${value[list[i]]} ≠ ${v}, move to ${value[list[i + 1]]}`);
    i++;
  }
  const target = list[i], prev = list[i - 1], next = list[i + 1] || "nil";
  q.node(prev).color(VISIT);
  q.node(target).color(REMOVE);
  step(`Found ${v} at index ${i}; the previous node is ${value[prev]}`);
  q.edge([prev, target]).remove();
  addEdge(prev, next);
  q.node(target).pos([xAt(i, n), OUT_Y]);
  step(`Point ${value[prev]}.next past ${v} at ${nameOf(next)}`);
  q.edge([target, next]).remove();
  q.node(target).remove();
  list.splice(i, 1);
  layout();
  q.node(prev).color(BASE);
  walked.slice(0, -1).forEach((e) => q.edge(e).color(EDGE_BASE)); // The last walked edge was removed
  q.edge([prev, next]).color(EDGE_BASE);
  step(`Free node ${v}: ${listString()}`);
}

function deleteTail() {
  const n = list.length;
  const walked = [];
  q.node(list[0]).color(VISIT);
  step(`deleteTail(): start at head, ${value[list[0]]}, and walk to the last node`);
  for (let i = 0; i < n - 1; i++) {
    q.edge([list[i], list[i + 1]]).traverse(EDGE, list[i]);
    walked.push([list[i], list[i + 1]]);
    q.node(list[i]).color(BASE);
    q.node(list[i + 1]).color(VISIT);
    step(`${value[list[i]]}.next is not null, move to ${value[list[i + 1]]}`);
  }
  const tail = list[n - 1], prev = list[n - 2];
  q.node(prev).color(VISIT);
  q.node(tail).color(REMOVE);
  step(`${value[tail]}.next is null, so ${value[tail]} is the tail; the previous node is ${value[prev]}`);
  q.edge([prev, tail]).remove();
  addEdge(prev, "nil");
  q.node(tail).pos([xAt(n - 1, n), OUT_Y]);
  step(`Point ${value[prev]}.next at null`);
  q.edge([tail, "nil"]).remove();
  q.node(tail).remove();
  list.pop();
  layout();
  q.node(prev).color(BASE);
  walked.slice(0, -1).forEach((e) => q.edge(e).color(EDGE_BASE)); // The last walked edge was removed
  q.edge([prev, "nil"]).color(EDGE_BASE);
  step(`Free node ${value[tail]}: ${listString()}`);
}

for (const d of deletes) {
  if (d === "head") deleteHead();
  else if (d === "tail") deleteTail();
  else deleteValue(d);
}

q.nodes(list).color(DONE);
step(`Final list (${list.length} nodes): ${listString()}`);
