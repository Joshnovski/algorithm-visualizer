// Linear Search
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

seedrandom("2", { global: true }); // Fixed seed so the same array is generated every build
const values = Array.from({ length: 8 }, () => Math.floor(Math.random() * 90) + 10);
const targets = [values[5], 7]; // One value that is present, one that is not

// RENDER DIAGRAM

const BASE = "#555555", COMPARE = "#f0b429", FOUND = "#17ec7a", MISSING = "#ff6b6b";
const CELL = 40; // Distance between cell centres
const xAt = (i) => (i - (values.length - 1) / 2) * CELL;
canvas.size([values.length * CELL + 80, 180]);

const ids = values.map((_, i) => "n" + i);
canvas.nodes(ids).add({
  shape: "rect", size: [16, 16], fixed: true, color: BASE,
  pos: (_, i) => [xAt(i), 0],
  labels: (_, i) => ({ 0: { text: values[i], color: "#ffffff", size: 13 } }),
});
canvas.labels(values.map((_, i) => "index" + i)).add({
  text: (_, i) => i, pos: (_, i) => [xAt(i), -30], color: "#888888", size: 10,
});
canvas.label("target").add({ text: "", pos: [0, 50], color: "#dddddd", size: 13 });

const q = canvas.withQ("q1"); // Everything queued on q is animated step by step

// Check every element from left to right until the target turns up
function linearSearch(arr, target) {
  q.label("target").text(`Searching for ${target}`);
  q.nodes(ids).color(BASE);
  step(`Search for ${target}, starting from index 0`);

  for (let i = 0; i < arr.length; i++) {
    q.node(ids[i]).color(COMPARE);
    if (arr[i] === target) {
      q.node(ids[i]).color(FOUND);
      step(`Index ${i}: ${arr[i]} = ${target}. Found after ${i + 1} comparison${i ? "s" : ""}`);
      return i;
    }
    step(`Index ${i}: ${arr[i]} ≠ ${target}, move on`);
    q.node(ids[i]).color(BASE);
  }

  q.nodes(ids).color(MISSING);
  step(`Reached the end: ${target} is not in the array (${arr.length} comparisons)`);
  return -1;
}

for (const target of targets) linearSearch(values, target);
