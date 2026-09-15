// Linked List Reverse
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

const values = [12, 45, 78, 23, 56]; // Fixed values so the log reads the same on every build

// RENDER DIAGRAM

const BASE = "#555555", VISIT = "#f0b429", ACTIVE = "#ba0d5b", DONE = "#17ec7a", EDGE = "#3b8beb";
const EDGE_BASE = "#b5b5b5"; // AlgorithmX's default edge colour, restored after a link is flipped
const NULL_COLOR = "#888888";
const CELL = 64; // Distance between node centres
const n = values.length;
// Slot -1 is the null the old head will point at, slot n is the null the old tail points at.
const xAt = (i) => (i - (n - 1) / 2) * CELL;
const PREV_Y = -52, CURR_Y = -68, NEXT_Y = -84; // The three pointer labels sit under the row
canvas.size([(n + 2) * CELL + 40, 240]);

const ids = values.map((_, i) => "n" + i);

canvas.nodes(ids).add({
  shape: "rect", size: [18, 14], fixed: true, color: BASE,
  pos: (_, i) => [xAt(i), 0],
  labels: (_, i) => ({ 0: { text: values[i], color: "#ffffff", size: 13 } }),
});
canvas.node("nil").add({
  shape: "rect", size: [18, 14], fixed: true, color: NULL_COLOR,
  pos: [xAt(n), 0],
  labels: { 0: { text: "null", color: "#ffffff", size: 11 } },
});
canvas.edges(ids.map((id, i) => [id, ids[i + 1] || "nil"])).add({ directed: true, curve: "linear" });
canvas.label("head").add({ text: "head", pos: [xAt(0), 34], color: "#888888", size: 12 });
canvas.labels(ids.map((_, i) => "idx" + i)).add({
  text: (_, i) => i, pos: (_, i) => [xAt(i), -30], color: "#888888", size: 10,
});
canvas.label("prev").add({ text: "prev", pos: [xAt(-1), PREV_Y], color: "#888888", size: 11 });
canvas.label("curr").add({ text: "curr", pos: [xAt(0), CURR_Y], color: ACTIVE, size: 11 });

const q = canvas.withQ("q1"); // Everything queued on q is animated step by step

q.node(ids[0]).color(VISIT);
step(`prev = null, curr = head (${values[0]}): flip one link at a time`);

let prevId = "nilL"; // The node curr.next will point at; starts as a null drawn on the left
for (let i = 0; i < n; i++) {
  const curr = ids[i], nextId = ids[i + 1] || "nil";
  const nextName = i + 1 < n ? values[i + 1] : "null";
  const prevName = i === 0 ? "null" : values[i - 1];

  q.node(curr).color(ACTIVE);
  if (i === 0) q.label("next").add({ text: "next", pos: [xAt(1), NEXT_Y], color: "#888888", size: 11 });
  else q.label("next").pos([xAt(i + 1), NEXT_Y]);
  step(`next = ${values[i]}.next, which is ${nextName}`);

  q.edge([curr, nextId]).remove();
  if (i === 0) {
    q.node("nilL").add({
      shape: "rect", size: [18, 14], fixed: true, color: NULL_COLOR,
      pos: [xAt(-1), 0],
      labels: { 0: { text: "null", color: "#ffffff", size: 11 } },
    });
  }
  q.edge([curr, prevId]).add({ directed: true, curve: "linear", color: EDGE });
  step(`${values[i]}.next = prev, so ${values[i]} now points back at ${prevName}`);

  q.node(curr).color(DONE);
  q.edge([curr, prevId]).color(EDGE_BASE);
  q.label("prev").pos([xAt(i), PREV_Y]);
  q.label("curr").pos([xAt(i + 1), CURR_Y]);
  if (i + 1 < n) q.node(nextId).color(VISIT);
  step(`prev = ${values[i]}, curr = ${nextName}`);
  prevId = curr;
}

q.label("head").pos([xAt(n - 1), 34]);
q.node("nil").remove();
step(`curr is null, stop: head = prev, the node holding ${values[n - 1]}`);

ids.forEach((_, i) => q.label("idx" + i).text(n - 1 - i));
q.labels(["curr", "next"]).remove();
step(`Reversed list: ${[...values].reverse().join(" → ")} → null`);
