// Linked List Traverse
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

const values = [12, 45, 78, 23, 56]; // Fixed values so the log reads the same on every build

// RENDER DIAGRAM

const BASE = "#555555", VISIT = "#f0b429", ACTIVE = "#ba0d5b", DONE = "#17ec7a", EDGE = "#3b8beb";
const NULL_COLOR = "#888888";
const CELL = 64; // Distance between node centres
const n = values.length;
const xAt = (i) => (i - n / 2) * CELL; // Slot i; slot n is the null terminator
canvas.size([(n + 1) * CELL + 60, 220]);

const list = values.map((_, i) => "n" + i); // Node ids in list order

canvas.nodes(list).add({
  shape: "rect", size: [18, 14], fixed: true, color: BASE,
  pos: (_, i) => [xAt(i), 0],
  labels: (_, i) => ({ 0: { text: values[i], color: "#ffffff", size: 13 } }),
});
canvas.node("nil").add({
  shape: "rect", size: [18, 14], fixed: true, color: NULL_COLOR,
  pos: [xAt(n), 0],
  labels: { 0: { text: "null", color: "#ffffff", size: 11 } },
});
canvas.edges(list.map((id, i) => [id, list[i + 1] || "nil"])).add({ directed: true, curve: "linear" });
canvas.label("head").add({ text: "head", pos: [xAt(0), 34], color: "#888888", size: 12 });
canvas.labels(list.map((_, i) => "idx" + i)).add({
  text: (_, i) => i, pos: (_, i) => [xAt(i), -30], color: "#888888", size: 10,
});
canvas.label("curr").add({ text: "current", pos: [xAt(0), -52], color: ACTIVE, size: 11 });
canvas.label("out").add({ text: "output:", pos: [0, -84], color: "#888888", size: 12 });

const q = canvas.withQ("q1"); // Everything queued on q is animated step by step

const output = [];
q.node(list[0]).color(VISIT);
step(`current = head, the node holding ${values[0]}`);

for (let i = 0; i < n; i++) {
  const id = list[i], next = list[i + 1] || "nil";
  output.push(values[i]);
  q.node(id).color(ACTIVE);
  q.label("out").text("output: " + output.join(", "));
  step(`Visit node ${i}: read its value, ${values[i]}`);
  q.edge([id, next]).traverse(EDGE, id);
  q.node(id).color(DONE);
  q.label("curr").pos([xAt(i + 1), -52]);
  if (next !== "nil") {
    q.node(next).color(VISIT);
    step(`Follow ${values[i]}.next to ${values[i + 1]}`);
  } else {
    step(`Follow ${values[i]}.next, which is null`);
  }
}

q.node("nil").highlight().size("1.5x");
step(`Reached null, traversal complete: ${output.join(", ")}`);
