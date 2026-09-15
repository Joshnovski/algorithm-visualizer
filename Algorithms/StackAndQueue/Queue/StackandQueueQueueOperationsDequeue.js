// Queue Dequeue
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

const values = [14, 52, 33, 27, 64]; // Initial queue, front to rear. Fixed so the log reads the same every build
const DEQUEUES = 3; // How many times dequeue() is called

// RENDER DIAGRAM

const BASE = "#555555", VISIT = "#f0b429", ACTIVE = "#ba0d5b", DONE = "#17ec7a", REMOVE = "#ff6b6b";
const CELL = 48; // Distance between element centres
const MAX = values.length;
const xAt = (i) => (i - (MAX - 1) / 2) * CELL; // Element i counted from the front (left)
const OUT_X = xAt(0) - CELL - 16; // A dequeued element slides out here before it disappears
const LABEL_Y = -32; // "front" and "rear" pointer labels sit under the row
canvas.size([(MAX + 2) * CELL + 60, 160]);

const queue = values.map((_, i) => "n" + i); // Node ids, front to rear
const value = {}; // value[id] = the number an element holds
queue.forEach((id, i) => (value[id] = values[i]));

canvas.nodes(queue).add({
  shape: "rect", size: [18, 14], fixed: true, color: BASE,
  pos: (_, i) => [xAt(i), 0],
  labels: (_, i) => ({ 0: { text: values[i], color: "#ffffff", size: 13 } }),
});
canvas.label("front").add({ text: "front", pos: [xAt(0), LABEL_Y], color: "#888888", size: 11 });
canvas.label("rear").add({ text: "rear", pos: [xAt(queue.length - 1), LABEL_Y], color: "#888888", size: 11 });

const q = canvas.withQ("q1"); // Everything queued on q is animated step by step

const queueString = () => queue.map((id) => value[id]).join(", ");
const returned = [];

q.node(queue[0]).color(VISIT);
step(`Queue holds ${queue.length} elements (front → rear): ${queueString()}; front points at ${value[queue[0]]}`);

function dequeue() {
  const id = queue[0], next = queue[1];
  q.node(id).color(ACTIVE);
  step(`dequeue(): front points at ${value[id]}`);
  q.node(id).pos([OUT_X, 0]);
  q.node(id).color(REMOVE);
  step(`Detach ${value[id]} from the front`);
  q.node(id).remove();
  queue.shift();
  returned.push(value[id]);
  queue.forEach((other, i) => q.node(other).pos([xAt(i), 0])); // Everyone shifts one slot towards the front
  q.label("rear").pos([xAt(queue.length - 1), LABEL_Y]);
  step(`dequeue() returns ${value[id]}; ${value[next]} is the new front, size = ${queue.length}`);
}

for (let i = 0; i < DEQUEUES; i++) dequeue();

q.nodes(queue).color(DONE);
step(`Dequeued ${returned.join(", ")} in first-in, first-out order; ${queueString()} remain`);
