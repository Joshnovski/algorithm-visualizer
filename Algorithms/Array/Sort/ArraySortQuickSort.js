// Quick Sort (Lomuto partition scheme, last element as pivot)
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

seedrandom("2", { global: true }); // Fixed seed so the same array is generated every build
const values = Array.from({ length: 7 }, () => Math.floor(Math.random() * 90) + 10);

// RENDER DIAGRAM

const BASE = "#555555", COMPARE = "#f0b429", SMALLER = "#ba0d5b", PIVOT = "#3b8beb", DONE = "#17ec7a";
const CELL = 40; // Distance between cell centres
const LIFT = 45; // The pivot is lifted out of the row while partitioning
const xAt = (i) => (i - (values.length - 1) / 2) * CELL;
canvas.size([values.length * CELL + 80, 200]);

// One rectangular node per cell. slots[i] is the id of the node currently sitting at index i.
const slots = values.map((_, i) => "n" + i);
canvas.nodes(slots).add({
  shape: "rect", size: [16, 16], fixed: true, color: BASE,
  pos: (_, i) => [xAt(i), 0],
  labels: (_, i) => ({ 0: { text: values[i], color: "#ffffff", size: 13 } }),
});
canvas.labels(values.map((_, i) => "index" + i)).add({
  text: (_, i) => i, pos: (_, i) => [xAt(i), -30], color: "#888888", size: 10,
});

const q = canvas.withQ("q1"); // Everything queued on q is animated step by step

function swap(arr, i, j) {
  if (i === j) return;
  q.node(slots[i]).pos([xAt(j), 0]);
  q.node(slots[j]).pos([xAt(i), 0]);
  [slots[i], slots[j]] = [slots[j], slots[i]];
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

// Moves everything smaller than the pivot to the left, returns the pivot's final index
function partition(arr, lo, hi) {
  const pivot = arr[hi];
  q.node(slots[hi]).color(PIVOT).pos([xAt(hi), LIFT]);
  step(`Partition [${arr.slice(lo, hi + 1).join(", ")}] using pivot ${pivot}`);

  let i = lo - 1; // Boundary: arr[lo..i] holds the elements smaller than the pivot
  for (let j = lo; j < hi; j++) {
    q.node(slots[j]).color(COMPARE);
    if (arr[j] < pivot) {
      i++;
      const message = i === j
        ? `${arr[j]} < ${pivot}, already on the small side`
        : `${arr[j]} < ${pivot}, swap it with ${arr[i]} to move it to the small side`;
      swap(arr, i, j);
      q.node(slots[i]).color(SMALLER);
      if (i !== j) q.node(slots[j]).color(BASE);
      step(message);
    } else {
      step(`${arr[j]} ≥ ${pivot}, leave it on the large side`);
      q.node(slots[j]).color(BASE);
    }
  }

  q.node(slots[hi]).pos([xAt(hi), 0]);
  swap(arr, i + 1, hi);
  q.node(slots[i + 1]).color(DONE);
  for (let k = lo; k <= i; k++) q.node(slots[k]).color(BASE);
  step(`Place pivot ${pivot} at index ${i + 1}, its final position`);
  return i + 1;
}

function quickSort(arr, lo, hi) {
  if (lo > hi) return;
  if (lo === hi) {
    q.node(slots[lo]).color(DONE);
    step(`${arr[lo]} is alone in its partition, so it is in its final position`);
    return;
  }
  const p = partition(arr, lo, hi);
  quickSort(arr, lo, p - 1);
  quickSort(arr, p + 1, hi);
}

const arr = [...values];
quickSort(arr, 0, arr.length - 1);
step(`Sorted: [${arr.join(", ")}]`);
