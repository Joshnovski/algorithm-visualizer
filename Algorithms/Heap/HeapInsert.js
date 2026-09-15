// Heap // Insert (binary max-heap stored in an array)
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

const heap = [90, 70, 80, 40, 60, 75]; // A valid max-heap: every parent >= its children
const toInsert = [85, 95];

// RENDER DIAGRAM

const BASE = "#555555", COMPARE = "#f0b429", ACTIVE = "#ba0d5b", DONE = "#17ec7a", EDGE_BASE = "#888888";
const CAP = heap.length + toInsert.length; // Slots in use by the end; positions are precomputed for all
const CELL = 40, ARRAY_Y = -110, TOP_Y = 130, LEVEL_Y = 55, OFFSET = [120, 60, 30];
canvas.size([480, 340]);

// Tree view above: index 0 is the root, the children of i are 2i+1 and 2i+2
const treePos = [];
(function layout(i, depth, x) {
  if (i >= CAP) return;
  treePos[i] = [x, TOP_Y - depth * LEVEL_Y];
  layout(2 * i + 1, depth + 1, x - OFFSET[depth]);
  layout(2 * i + 2, depth + 1, x + OFFSET[depth]);
})(0, 0, 0);
// Array view below: one cell per index
const arrayPos = Array.from({ length: CAP }, (_, i) => [(i - (CAP - 1) / 2) * CELL, ARRAY_Y]);

const parentOf = (i) => Math.floor((i - 1) / 2);
const treeId = (i) => "h" + i, cellId = (i) => "a" + i; // Ids are the array index: values move, nodes stay
const valueLabel = (v) => ({ text: v, color: "#ffffff", size: 13 });
const indexLabel = (i) => ({ text: i, pos: [0, -28], color: "#888888", size: 10 });

const idx = heap.map((_, i) => i);
canvas.nodes(idx.map(treeId)).add({
  size: 14, fixed: true, color: BASE,
  pos: (_, i) => treePos[i],
  labels: (_, i) => ({ 0: valueLabel(heap[i]) }),
});
canvas.edges(idx.slice(1).map((i) => [treeId(parentOf(i)), treeId(i)])).add({ curve: "linear", color: EDGE_BASE });
canvas.nodes(idx.map(cellId)).add({
  shape: "rect", size: [16, 16], fixed: true, color: BASE,
  pos: (_, i) => arrayPos[i],
  labels: (_, i) => ({ 0: valueLabel(heap[i]), idx: indexLabel(i) }),
});

const q = canvas.withQ("q1"); // Everything queued on q is animated step by step

// Colours the tree node and the array cell of each index together
const paint = (indices, color) => q.nodes(indices.flatMap((i) => [treeId(i), cellId(i)])).color(color);

function swap(i, j) { // Swap the values at indices i and j: the nodes stay put, only their labels change
  [heap[i], heap[j]] = [heap[j], heap[i]];
  for (const k of [i, j]) {
    q.node(treeId(k)).label().text(heap[k]);
    q.node(cellId(k)).label().text(heap[k]);
  }
}

function insert(value) {
  const i = heap.length;
  heap.push(value);
  q.node(treeId(i)).add({ size: 14, fixed: true, color: ACTIVE, pos: treePos[i], labels: { 0: valueLabel(value) } });
  q.edge([treeId(parentOf(i)), treeId(i)]).add({ curve: "linear", color: EDGE_BASE });
  q.node(cellId(i)).add({
    shape: "rect", size: [16, 16], fixed: true, color: ACTIVE, pos: arrayPos[i],
    labels: { 0: valueLabel(value), idx: indexLabel(i) },
  });
  step(`Insert ${value}: append it at index ${i}, the first free slot`);

  // Sift up: swap with the parent while the parent is smaller
  let k = i;
  while (true) {
    if (k === 0) {
      paint([k], DONE);
      step(`${value} is at the root, the heap property holds`);
      break;
    }
    const p = parentOf(k);
    paint([p], COMPARE);
    step(`Compare ${value} with its parent ${heap[p]} at index ${p}`);
    if (value <= heap[p]) {
      paint([p], BASE);
      paint([k], DONE);
      step(`${value} <= ${heap[p]}, the heap property holds`);
      break;
    }
    const parentValue = heap[p];
    swap(k, p);
    paint([k], BASE);
    paint([p], ACTIVE);
    step(`${value} > ${parentValue}, swap them`);
    k = p;
  }
  paint([k], BASE);
  step(`Heap after inserting ${value}: [${heap.join(", ")}]`);
}

for (const v of toInsert) insert(v);
