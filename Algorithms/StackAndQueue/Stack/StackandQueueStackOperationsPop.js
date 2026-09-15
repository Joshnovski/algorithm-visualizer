// Stack Pop
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

const values = [14, 52, 33, 27, 64]; // Initial stack, bottom to top. Fixed so the log reads the same every build
const POPS = 3; // How many times pop() is called

// RENDER DIAGRAM

const BASE = "#555555", VISIT = "#f0b429", ACTIVE = "#ba0d5b", DONE = "#17ec7a", REMOVE = "#ff6b6b";
const CELL = 32; // Vertical distance between element centres (y points up)
const MAX = values.length;
const yAt = (i) => (i - (MAX - 1) / 2) * CELL; // Element i counted from the bottom
const TOP_X = -60; // The "top" pointer label sits to the left of the column
const SIDE_X = 100; // A popped element slides out here before it disappears
canvas.size([300, MAX * CELL + 70]);

const stack = values.map((_, i) => "n" + i); // Node ids, bottom to top
const value = {}; // value[id] = the number an element holds
stack.forEach((id, i) => (value[id] = values[i]));

canvas.nodes(stack).add({
  shape: "rect", size: [24, 12], fixed: true, color: BASE,
  pos: (_, i) => [0, yAt(i)],
  labels: (_, i) => ({ 0: { text: values[i], color: "#ffffff", size: 13 } }),
});
canvas.label("top").add({ text: "top →", pos: [TOP_X, yAt(stack.length - 1)], align: "middle", color: "#888888", size: 12 });
canvas.label("bottom").add({ text: "bottom", pos: [0, yAt(0) - 28], color: "#888888", size: 10 });

const q = canvas.withQ("q1"); // Everything queued on q is animated step by step

const stackString = () => stack.map((id) => value[id]).join(", ");
const returned = [];

q.node(stack[stack.length - 1]).color(VISIT);
step(`Stack holds ${stack.length} elements (bottom → top): ${stackString()}; top points at ${value[stack[stack.length - 1]]}`);

function pop() {
  const n = stack.length, id = stack[n - 1], below = stack[n - 2];
  q.node(id).color(ACTIVE);
  step(`pop(): top points at ${value[id]}`);
  q.node(id).pos([SIDE_X, yAt(n - 1)]);
  q.node(id).color(REMOVE);
  q.label("top").pos([TOP_X, yAt(n - 2)]);
  step(`Detach ${value[id]}; top moves down to ${value[below]}`);
  q.node(id).remove();
  stack.pop();
  returned.push(value[id]);
  step(`pop() returns ${value[id]}; size = ${stack.length}`);
}

for (let i = 0; i < POPS; i++) pop();

q.nodes(stack).color(DONE);
step(`Popped ${returned.join(", ")} in last-in, first-out order; ${stackString()} remain`);
