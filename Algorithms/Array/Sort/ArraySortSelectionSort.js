// Selection Sort
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

seedrandom("2", { global: true }); // Fixed seed so the same array is generated every build
const values = Array.from({ length: 7 }, () => Math.floor(Math.random() * 90) + 10);

// RENDER DIAGRAM

const BASE = "#555555", COMPARE = "#f0b429", MINIMUM = "#ba0d5b", DONE = "#17ec7a";
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

function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let min = i;
    q.node(slots[min]).color(MINIMUM);
    step(`Pass ${i + 1}: assume ${arr[min]} (index ${i}) is the smallest of the unsorted part`);

    for (let j = i + 1; j < n; j++) {
      q.node(slots[j]).color(COMPARE);
      step(`Compare ${arr[j]} with the current minimum ${arr[min]}`);
      if (arr[j] < arr[min]) {
        q.node(slots[min]).color(BASE);
        min = j;
        q.node(slots[min]).color(MINIMUM);
        step(`${arr[j]} is smaller, it becomes the new minimum`);
      } else {
        q.node(slots[j]).color(BASE);
      }
    }

    if (min !== i) {
      swap(arr, i, min);
      q.node(slots[min]).color(BASE);
      step(`Swap the minimum ${arr[i]} into index ${i}`);
    }
    q.node(slots[i]).color(DONE);
    step(`${arr[i]} is now in its final position`);
  }
  q.node(slots[n - 1]).color(DONE);
  step(`Sorted: [${arr.join(", ")}]`);
}

selectionSort([...values]);
