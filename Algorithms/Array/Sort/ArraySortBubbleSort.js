// Bubble Sort
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

seedrandom("2", { global: true }); // Fixed seed so the same array is generated every build
const values = Array.from({ length: 7 }, () => Math.floor(Math.random() * 90) + 10);

// RENDER DIAGRAM

const BASE = "#555555", COMPARE = "#f0b429", SWAP = "#ba0d5b", DONE = "#17ec7a";
const CELL = 40; // Distance between cell centres
const xAt = (i) => (i - (values.length - 1) / 2) * CELL;
canvas.size([values.length * CELL + 80, 160]);

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
  q.node(slots[i]).pos([xAt(j), 0]);
  q.node(slots[j]).pos([xAt(i), 0]);
  [slots[i], slots[j]] = [slots[j], slots[i]];
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      q.nodes([slots[j], slots[j + 1]]).color(COMPARE);
      step(`Pass ${i + 1}: compare ${arr[j]} and ${arr[j + 1]}`);
      if (arr[j] > arr[j + 1]) {
        q.nodes([slots[j], slots[j + 1]]).color(SWAP);
        swap(arr, j, j + 1);
        swapped = true;
        step(`${arr[j + 1]} > ${arr[j]}, swap them`);
      }
      q.nodes([slots[j], slots[j + 1]]).color(BASE);
    }
    q.node(slots[n - 1 - i]).color(DONE);
    step(`${arr[n - 1 - i]} has bubbled to its final position`);
    if (!swapped) {
      q.nodes(slots.slice(0, n - 1 - i)).color(DONE);
      step("No swaps in this pass, so the array is already sorted");
      return;
    }
  }
  q.node(slots[0]).color(DONE);
  step(`Sorted: [${arr.join(", ")}]`);
}

bubbleSort([...values]);
