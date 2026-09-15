// Stack Top (peek)
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

const values = [14, 52, 33, 42]; // Initial stack, bottom to top. Fixed so the log reads the same every build
const PUSHED = 77; // Value pushed between the two top() calls

// RENDER DIAGRAM

const BASE = "#555555", VISIT = "#f0b429", ACTIVE = "#ba0d5b", DONE = "#17ec7a";
const HIDDEN = "#333333"; // Elements below the top cannot be read
const CELL = 32; // Vertical distance between element centres (y points up)
const MAX = values.length + 1; // The stack after the push must fit
const yAt = (i) => (i - (MAX - 1) / 2) * CELL; // Element i counted from the bottom
const TOP_X = -60; // The "top" pointer label sits to the left of the column
const SIDE_X = 100; // A new element first appears here, to the right of the column
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

function top() {
  const n = stack.length, id = stack[n - 1];
  q.node(id).color(DONE);
  step(`top(): read the element top points at`);
  q.node(id).highlight().size("1.5x");
  step(`top() returns ${value[id]}`);
  q.node(id).color(BASE);
  step(`Nothing is removed: the stack is unchanged, size = ${n}`);
}

q.node(stack[stack.length - 1]).color(VISIT);
step(`Stack holds ${stack.length} elements (bottom → top): ${stackString()}; top points at ${value[stack[stack.length - 1]]}`);

q.nodes(stack.slice(0, -1)).color(HIDDEN);
step(`Only the top element is reachable; ${stack.slice(0, -1).map((id) => value[id]).reverse().join(", ")} are below it`);
q.nodes(stack.slice(0, -1)).color(BASE);

top();

const n = stack.length, below = stack[n - 1], id = "n" + n;
value[id] = PUSHED;
q.node(id).add({
  shape: "rect", size: [24, 12], fixed: true, color: ACTIVE, pos: [SIDE_X, yAt(n)],
  labels: { 0: { text: PUSHED, color: "#ffffff", size: 13 } },
});
step(`push(${PUSHED}): create an element holding ${PUSHED}`);
q.node(id).pos([0, yAt(n)]);
q.label("top").pos([TOP_X, yAt(n)]);
stack.push(id);
step(`Place ${PUSHED} on top of ${value[below]}; top now points at ${PUSHED}`);
q.node(id).color(BASE);
step(`Stack (bottom → top): ${stackString()}; size = ${stack.length}`);

top();
