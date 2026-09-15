// Queue Enqueue
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

const values = [14, 52, 33]; // Initial queue, front to rear. Fixed so the log reads the same every build
const enqueues = [27, 64, 81]; // Values enqueued one after another

// RENDER DIAGRAM

const BASE = "#555555", VISIT = "#f0b429", ACTIVE = "#ba0d5b", DONE = "#17ec7a";
const CELL = 48; // Distance between element centres
const MAX = values.length + enqueues.length; // The full queue must fit
const xAt = (i) => (i - (MAX - 1) / 2) * CELL; // Element i counted from the front (left)
const APPEAR_X = xAt(MAX); // A new element first appears here, to the right of the rear
const LABEL_Y = -32; // "front" and "rear" pointer labels sit under the row
canvas.size([(MAX + 2) * CELL + 60, 160]);

const queue = values.map((_, i) => "n" + i); // Node ids, front to rear
const value = {}; // value[id] = the number an element holds
queue.forEach((id, i) => (value[id] = values[i]));
let nextId = values.length;

canvas.nodes(queue).add({
  shape: "rect", size: [18, 14], fixed: true, color: BASE,
  pos: (_, i) => [xAt(i), 0],
  labels: (_, i) => ({ 0: { text: values[i], color: "#ffffff", size: 13 } }),
});
canvas.label("front").add({ text: "front", pos: [xAt(0), LABEL_Y], color: "#888888", size: 11 });
canvas.label("rear").add({ text: "rear", pos: [xAt(queue.length - 1), LABEL_Y], color: "#888888", size: 11 });

const q = canvas.withQ("q1"); // Everything queued on q is animated step by step

const queueString = () => queue.map((id) => value[id]).join(", ");

q.node(queue[queue.length - 1]).color(VISIT);
step(`Queue holds ${queue.length} elements (front → rear): ${queueString()}; rear points at ${value[queue[queue.length - 1]]}`);

function enqueue(v) {
  const n = queue.length, rear = queue[n - 1];
  const id = "n" + nextId++;
  value[id] = v;
  q.node(rear).color(BASE);
  q.node(id).add({
    shape: "rect", size: [18, 14], fixed: true, color: ACTIVE, pos: [APPEAR_X, 0],
    labels: { 0: { text: v, color: "#ffffff", size: 13 } },
  });
  step(`enqueue(${v}): create an element holding ${v}`);
  q.node(id).pos([xAt(n), 0]);
  q.label("rear").pos([xAt(n), LABEL_Y]);
  queue.push(id);
  step(`Attach ${v} behind ${value[rear]}; rear now points at ${v}`);
  q.node(id).color(BASE);
  step(`Queue (front → rear): ${queueString()}; size = ${queue.length}`);
}

for (const v of enqueues) enqueue(v);

q.nodes(queue).color(DONE);
step(`Enqueued ${enqueues.join(", ")}: front is still ${value[queue[0]]}, rear is ${value[queue[queue.length - 1]]}`);
