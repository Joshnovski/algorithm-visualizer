// Binary Search (requires a sorted array)
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

seedrandom("2", { global: true }); // Fixed seed so the same array is generated every build
const values = Array.from({ length: 9 }, () => Math.floor(Math.random() * 90) + 10).sort((a, b) => a - b);
const targets = [values[6], 50]; // One value that is present, one that is not

// RENDER DIAGRAM

const BASE = "#555555", OUTSIDE = "#333333", COMPARE = "#f0b429", FOUND = "#17ec7a", MISSING = "#ff6b6b";
const CELL = 40; // Distance between cell centres
const xAt = (i) => (i - (values.length - 1) / 2) * CELL;
canvas.size([values.length * CELL + 80, 200]);

const ids = values.map((_, i) => "n" + i);
canvas.nodes(ids).add({
  shape: "rect", size: [16, 16], fixed: true, color: BASE,
  pos: (_, i) => [xAt(i), 0],
  labels: (_, i) => ({ 0: { text: values[i], color: "#ffffff", size: 13 } }),
});
canvas.labels(values.map((_, i) => "index" + i)).add({
  text: (_, i) => i, pos: (_, i) => [xAt(i), -30], color: "#888888", size: 10,
});
canvas.label("target").add({ text: "", pos: [0, 55], color: "#dddddd", size: 13 });
// Pointer labels shown under the index row
canvas.labels(["lo", "hi", "mid"]).add({
  text: (_, i) => ["lo", "hi", "mid"][i], pos: [0, -52], color: "#888888", size: 10,
});
canvas.label("mid").attrs({ color: COMPARE });

const q = canvas.withQ("q1"); // Everything queued on q is animated step by step

// Repeatedly halve the search range around the middle element
function binarySearch(arr, target) {
  q.label("target").text(`Searching for ${target}`);
  q.nodes(ids).color(BASE);
  let lo = 0, hi = arr.length - 1;
  q.label("lo").pos([xAt(lo), -52]);
  q.label("hi").pos([xAt(hi), -52]);
  step(`Search for ${target} in the whole array: lo = 0, hi = ${hi}`);

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    q.label("mid").pos([xAt(mid), -66]);
    q.node(ids[mid]).color(COMPARE);
    step(`mid = (${lo} + ${hi}) / 2 = ${mid}, compare ${arr[mid]} with ${target}`);

    if (arr[mid] === target) {
      q.node(ids[mid]).color(FOUND);
      step(`${arr[mid]} = ${target}. Found at index ${mid}`);
      return mid;
    }
    if (arr[mid] < target) {
      for (let k = lo; k <= mid; k++) q.node(ids[k]).color(OUTSIDE);
      lo = mid + 1;
      q.label("lo").pos([xAt(lo), -52]);
      step(`${arr[mid]} < ${target}, discard the left half: lo = ${lo}`);
    } else {
      for (let k = mid; k <= hi; k++) q.node(ids[k]).color(OUTSIDE);
      hi = mid - 1;
      q.label("hi").pos([xAt(hi), -52]);
      step(`${arr[mid]} > ${target}, discard the right half: hi = ${hi}`);
    }
  }

  q.nodes(ids).color(MISSING);
  step(`lo (${lo}) has passed hi (${hi}): ${target} is not in the array`);
  return -1;
}

for (const target of targets) binarySearch(values, target);
