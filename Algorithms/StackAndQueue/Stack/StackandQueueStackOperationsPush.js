// Stack Push
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

const values = [14, 52, 33]; // Initial stack, bottom to top. Fixed so the log reads the same every build
const pushes = [27, 64, 81]; // Values pushed one after another

// RENDER DIAGRAM

const BASE = "#555555", VISIT = "#f0b429", ACTIVE = "#ba0d5b", DONE = "#17ec7a";
const CELL = 32; // Vertical distance between element centres (y points up)
const MAX = values.length + pushes.length; // The full stack must fit
const yAt = (i) => (i - (MAX - 1) / 2) * CELL; // Element i counted from the bottom
const TOP_X = -60; // The "top" pointer label sits to the left of the column
const SIDE_X = 100; // A new element first appears here, to the right of the column
canvas.size([300, MAX * CELL + 70]);

const stack = values.map((_, i) => "n" + i); // Node ids, bottom to top
const value = {}; // value[id] = the number an element holds
stack.forEach((id, i) => (value[id] = values[i]));
let nextId = values.length;

canvas.nodes(stack).add({
  shape: "rect", size: [24, 12], fixed: true, color: BASE,
  pos: (_, i) => [0, yAt(i)],
  labels: (_, i) => ({ 0: { text: values[i], color: "#ffffff", size: 13 } }),
});
canvas.label("top").add({ text: "top →", pos: [TOP_X, yAt(stack.length - 1)], align: "middle", color: "#888888", size: 12 });
canvas.label("bottom").add({ text: "bottom", pos: [0, yAt(0) - 28], color: "#888888", size: 10 });

const q = canvas.withQ("q1"); // Everything queued on q is animated step by step

const stackString = () => stack.map((id) => value[id]).join(", ");

q.node(stack[stack.length - 1]).color(VISIT);
step(`Stack holds ${stack.length} elements (bottom → top): ${stackString()}; top points at ${value[stack[stack.length - 1]]}`);

function push(v) {
  const n = stack.length, below = stack[n - 1];
  const id = "n" + nextId++;
  value[id] = v;
  q.node(below).color(BASE);
  q.node(id).add({
    shape: "rect", size: [24, 12], fixed: true, color: ACTIVE, pos: [SIDE_X, yAt(n)],
    labels: { 0: { text: v, color: "#ffffff", size: 13 } },
  });
  step(`push(${v}): create an element holding ${v}`);
  q.node(id).pos([0, yAt(n)]);
  q.label("top").pos([TOP_X, yAt(n)]);
  stack.push(id);
  step(`Place ${v} on top of ${value[below]}; top now points at ${v}`);
  q.node(id).color(BASE);
  step(`Stack (bottom → top): ${stackString()}; size = ${stack.length}`);
}

for (const v of pushes) push(v);

q.nodes(stack).color(DONE);
step(`Pushed ${pushes.join(", ")}: the last value pushed, ${value[stack[stack.length - 1]]}, is on top`);
