// Heap // Sort (heapsort: build a max-heap in place, then repeatedly move the root to the end)
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

const heap = [35, 80, 20, 60, 45, 90, 10]; // Unsorted input, sorted in place

// RENDER DIAGRAM

const BASE = "#555555", COMPARE = "#f0b429", ACTIVE = "#ba0d5b", DONE = "#17ec7a", DIM = "#3a3a3a", EDGE_BASE = "#888888";
const CAP = heap.length;
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

// Sift down within the first `size` elements: swap with the larger child while that child is bigger
function siftDown(k, size) {
  while (true) {
    const l = 2 * k + 1, r = 2 * k + 2;
    const children = [l, r].filter((c) => c < size);
    if (children.length === 0) {
      paint([k], BASE);
      return;
    }
    paint([k], ACTIVE);
    paint(children, COMPARE);
    step(children.length === 2
      ? `Compare ${heap[k]} with its children ${heap[l]} and ${heap[r]}`
      : `Compare ${heap[k]} with its only child ${heap[l]}`);
    const big = children.reduce((a, b) => (heap[b] > heap[a] ? b : a));
    paint(children, BASE);
    if (heap[k] >= heap[big]) {
      paint([k], BASE);
      step(`${heap[k]} is already the largest, no swap`);
      return;
    }
    const a = heap[k], b = heap[big];
    swap(k, big);
    paint([k], BASE);
    paint([big], ACTIVE);
    step(`${b} > ${a}, swap them`);
    k = big;
  }
}

const n = heap.length;

// Phase 1: heapify from the last parent down to the root
for (let i = parentOf(n - 1); i >= 0; i--) siftDown(i, n);
paint([0], BASE);
step(`Max-heap built: [${heap.join(", ")}], the largest value ${heap[0]} is at the root`);

// Phase 2: move the root (current maximum) to the end of the unsorted part and shrink the heap
for (let end = n - 1; end >= 1; end--) {
  const max = heap[0];
  swap(0, end);
  q.node(cellId(end)).color(DONE);
  q.node(treeId(end)).color(DIM);
  q.edge([treeId(parentOf(end)), treeId(end)]).color(DIM);
  step(`Swap the root ${max} with ${heap[0]} at index ${end}: ${max} is in its final position, heap size is now ${end}`);
  siftDown(0, end);
}
q.node(cellId(0)).color(DONE);
q.node(treeId(0)).color(DIM);
step(`Sorted: [${heap.join(", ")}]`);
