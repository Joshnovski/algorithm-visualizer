// Insertion Sort
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

seedrandom("2", { global: true }); // Fixed seed so the same array is generated every build
const values = Array.from({ length: 7 }, () => Math.floor(Math.random() * 90) + 10);

// RENDER DIAGRAM

const BASE = "#555555", COMPARE = "#f0b429", KEY = "#ba0d5b", DONE = "#17ec7a";
const CELL = 40; // Distance between cell centres
const LIFT = 45; // How far the key is lifted while it looks for its place
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

function insertionSort(arr) {
  const n = arr.length;
  q.node(slots[0]).color(DONE);
  step(`${arr[0]} on its own is a sorted prefix of length 1`);

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    const keyNode = slots[i];
    q.node(keyNode).color(KEY).pos([xAt(i), LIFT]);
    step(`Take ${key} (index ${i}) as the key and lift it out`);

    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      q.node(slots[j]).color(COMPARE);
      step(`${arr[j]} > ${key}, shift ${arr[j]} one place right`);
      q.node(slots[j]).color(DONE).pos([xAt(j + 1), 0]);
      slots[j + 1] = slots[j];
      arr[j + 1] = arr[j];
      j--;
    }

    slots[j + 1] = keyNode;
    arr[j + 1] = key;
    q.node(keyNode).color(DONE).pos([xAt(j + 1), 0]);
    if (j >= 0) {
      step(`${arr[j]} ≤ ${key}, insert ${key} at index ${j + 1}`);
    } else {
      step(`Nothing smaller left, insert ${key} at index 0`);
    }
  }
  step(`Sorted: [${arr.join(", ")}]`);
}

insertionSort([...values]);
