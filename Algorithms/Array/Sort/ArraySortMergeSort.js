// Merge Sort
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

seedrandom("2", { global: true }); // Fixed seed so the same array is generated every build
const values = Array.from({ length: 7 }, () => Math.floor(Math.random() * 90) + 10);

// RENDER DIAGRAM

const BASE = "#555555", COMPARE = "#f0b429", TAKEN = "#ba0d5b", DONE = "#17ec7a";
const CELL = 40; // Distance between cell centres
const TOP = 90; // y of the full array; each level of recursion sits LEVEL lower
const LEVEL = 45;
const xAt = (i) => (i - (values.length - 1) / 2) * CELL;
const yAt = (depth) => TOP - depth * LEVEL;
canvas.size([values.length * CELL + 80, 280]);

// One rectangular node per cell. slots[i] is the id of the node currently sitting at index i.
const slots = values.map((_, i) => "n" + i);
canvas.nodes(slots).add({
  shape: "rect", size: [16, 16], fixed: true, color: BASE,
  pos: (_, i) => [xAt(i), yAt(0)],
  labels: (_, i) => ({ 0: { text: values[i], color: "#ffffff", size: 13 } }),
});
canvas.labels(values.map((_, i) => "index" + i)).add({
  text: (_, i) => i, pos: (_, i) => [xAt(i), yAt(0) + 30], color: "#888888", size: 10,
});

const q = canvas.withQ("q1"); // Everything queued on q is animated step by step

const range = (lo, hi) => slots.slice(lo, hi + 1);

// Merge the two sorted halves arr[lo..mid] and arr[mid+1..hi] back up one level
function merge(arr, lo, mid, hi, depth) {
  const merged = []; // [{ value, id }] in sorted order
  let i = lo, j = mid + 1;
  while (i <= mid && j <= hi) {
    q.nodes([slots[i], slots[j]]).color(COMPARE);
    step(`Compare ${arr[i]} and ${arr[j]}`);
    if (arr[i] <= arr[j]) {
      q.node(slots[i]).color(TAKEN);
      merged.push({ value: arr[i], id: slots[i] });
      q.node(slots[j]).color(BASE);
      i++;
    } else {
      q.node(slots[j]).color(TAKEN);
      merged.push({ value: arr[j], id: slots[j] });
      q.node(slots[i]).color(BASE);
      j++;
    }
  }
  while (i <= mid) merged.push({ value: arr[i], id: slots[i++] });
  while (j <= hi) merged.push({ value: arr[j], id: slots[j++] });

  merged.forEach((item, k) => {
    arr[lo + k] = item.value;
    slots[lo + k] = item.id;
    q.node(item.id).pos([xAt(lo + k), yAt(depth)]).color(depth === 0 ? DONE : BASE);
  });
  step(`Merge into [${merged.map((m) => m.value).join(", ")}]`);
}

function mergeSort(arr, lo, hi, depth) {
  if (lo >= hi) {
    step(`[${arr[lo]}] has one element, so it is already sorted`);
    return;
  }
  const mid = Math.floor((lo + hi) / 2);
  range(lo, mid).forEach((id, k) => q.node(id).pos([xAt(lo + k) - 8, yAt(depth + 1)]));
  range(mid + 1, hi).forEach((id, k) => q.node(id).pos([xAt(mid + 1 + k) + 8, yAt(depth + 1)]));
  step(`Split [${arr.slice(lo, hi + 1).join(", ")}] into [${arr.slice(lo, mid + 1).join(", ")}] and [${arr.slice(mid + 1, hi + 1).join(", ")}]`);

  mergeSort(arr, lo, mid, depth + 1);
  mergeSort(arr, mid + 1, hi, depth + 1);
  merge(arr, lo, mid, hi, depth);
}

const arr = [...values];
mergeSort(arr, 0, arr.length - 1, 0);
step(`Sorted: [${arr.join(", ")}]`);
