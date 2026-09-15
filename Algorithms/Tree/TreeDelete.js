// Tree // Delete (binary search tree)
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

// Fixed values, inserted in this order, give a balanced tree with four levels
const initial = [50, 30, 70, 20, 40, 60, 80, 35, 65];
const toDelete = [35, 60, 50]; // A leaf, a node with one child, then the root with two children

// Ids are tied to the node object, not to its value: a deletion can copy a value between nodes
let nextId = 0;
const makeNode = (value) => ({ id: "n" + nextId++, value, left: null, right: null });
function insertPlain(node, value) { // Builds the tree without any animation
  if (!node) return makeNode(value);
  if (value < node.value) node.left = insertPlain(node.left, value);
  else node.right = insertPlain(node.right, value);
  return node;
}
let root = null;
for (const v of initial) root = insertPlain(root, v);

// RENDER DIAGRAM

const BASE = "#555555", COMPARE = "#f0b429", ACTIVE = "#ba0d5b", REMOVED = "#ff6b6b";
const EDGE_BASE = "#888888", TRAVERSE = "#3b8beb";
const OFFSET = [160, 80, 40, 20]; // Horizontal distance between a node at depth d and its children
canvas.size([560, 300]);

// Computes { id: [x, y] } for every node: y by depth (root at the top), x offset halves per level
function layout(node, depth = 0, x = 0, out = {}) {
  if (!node) return out;
  out[node.id] = [x, 110 - depth * 60];
  layout(node.left, depth + 1, x - OFFSET[depth], out);
  layout(node.right, depth + 1, x + OFFSET[depth], out);
  return out;
}
function allNodes(node, out = []) {
  if (node) { out.push(node); allNodes(node.left, out); allNodes(node.right, out); }
  return out;
}
function inorder(node, out = []) {
  if (node) { inorder(node.left, out); out.push(node.value); inorder(node.right, out); }
  return out;
}
const childEdges = (nodes) => nodes.flatMap((n) => [n.left, n.right].filter(Boolean).map((c) => [n.id, c.id]));

const nodes = allNodes(root);
const pos = layout(root);
canvas.nodes(nodes.map((n) => n.id)).add({
  size: 14, fixed: true, color: BASE,
  pos: (_, i) => pos[nodes[i].id],
  labels: (_, i) => ({ 0: { text: nodes[i].value, color: "#ffffff", size: 13 } }),
});
canvas.edges(childEdges(nodes)).add({ curve: "linear", color: EDGE_BASE });

const q = canvas.withQ("q1"); // Everything queued on q is animated step by step

// Points parent at `replacement` instead of `child` (parent === null means child is the root)
function replaceChild(parent, child, replacement) {
  if (!parent) root = replacement;
  else if (parent.left === child) parent.left = replacement;
  else parent.right = replacement;
}

// Slides every remaining node to the position the layout gives it after a structural change
function reposition() {
  const newPos = layout(root);
  for (const n of allNodes(root)) q.node(n.id).pos(newPos[n.id]);
}

function remove(value) {
  const touched = [], edges = [];
  let parent = null, node = root;
  while (node.value !== value) {
    touched.push(node.id);
    q.node(node.id).color(COMPARE);
    const goLeft = value < node.value;
    const next = goLeft ? node.left : node.right;
    edges.push([node.id, next.id]);
    q.edge([node.id, next.id]).traverse(TRAVERSE, node.id);
    step(`${touched.length === 1 ? `Delete ${value}: ` : ""}${value} ${goLeft ? "<" : ">"} ${node.value}, go ${goLeft ? "left" : "right"}`);
    parent = node;
    node = next;
  }
  touched.push(node.id);
  q.node(node.id).color(ACTIVE);
  step(parent ? `Found ${value}` : `Delete ${value}: it is the root`);

  if (!node.left && !node.right) {
    // Case 1: a leaf can simply be unlinked
    q.node(node.id).color(REMOVED);
    step(`${value} is a leaf, so it can simply be removed`);
    q.edge([parent.id, node.id]).remove();
    q.node(node.id).remove();
    replaceChild(parent, node, null);
    step(`Remove ${value}`);
  } else if (!node.left || !node.right) {
    // Case 2: the single child takes the node's place
    const child = node.left || node.right;
    touched.push(child.id);
    q.node(node.id).color(REMOVED);
    q.node(child.id).color(COMPARE);
    step(`${value} has one child (${child.value}), which takes its place`);
    q.edge([node.id, child.id]).remove();
    if (parent) q.edge([parent.id, node.id]).remove();
    q.node(node.id).remove();
    if (parent) q.edge([parent.id, child.id]).add({ curve: "linear", color: EDGE_BASE });
    replaceChild(parent, node, child);
    step(parent ? `Remove ${value} and link ${parent.value} to ${child.value}` : `Remove ${value}, ${child.value} becomes the root`);
    reposition();
    step(`Slide ${child.value} and its subtree up one level`);
  } else {
    // Case 3: replace the value with its in-order successor (smallest value in the right subtree)
    let sParent = node, s = node.right;
    touched.push(s.id);
    edges.push([node.id, s.id]);
    q.edge([node.id, s.id]).traverse(TRAVERSE, node.id);
    q.node(s.id).color(COMPARE);
    step(`${value} has two children: look for its in-order successor in the right subtree, starting at ${s.value}`);
    while (s.left) {
      touched.push(s.left.id);
      edges.push([s.id, s.left.id]);
      q.edge([s.id, s.left.id]).traverse(TRAVERSE, s.id);
      q.node(s.left.id).color(COMPARE);
      step(`Go left to ${s.left.value}`);
      sParent = s;
      s = s.left;
    }
    q.node(s.id).color(ACTIVE);
    step(`${s.value} has no left child, so ${s.value} is the successor of ${value}`);
    node.value = s.value;
    q.node(node.id).label().text(s.value);
    q.node(s.id).color(REMOVED);
    step(`Copy ${s.value} into the node that held ${value}`);
    q.edge([sParent.id, s.id]).remove();
    q.node(s.id).remove();
    if (s.right) {
      q.edge([s.id, s.right.id]).remove();
      q.edge([sParent.id, s.right.id]).add({ curve: "linear", color: EDGE_BASE });
    }
    replaceChild(sParent, s, s.right);
    step(`Remove the successor node ${s.value}`);
    if (s.right) {
      reposition();
      step(`Slide ${s.right.value} and its subtree up one level`);
    }
  }

  // Reset the colours of everything that is still in the tree
  const remaining = new Set(allNodes(root).map((n) => n.id));
  const keptNodes = touched.filter((id) => remaining.has(id));
  const keptEdges = edges.filter(([a, b]) => remaining.has(a) && remaining.has(b));
  if (keptNodes.length) q.nodes(keptNodes).color(BASE);
  if (keptEdges.length) q.edges(keptEdges).color(EDGE_BASE);
  step(`Deleted ${value}. In-order: ${inorder(root).join(", ")}`);
}

for (const v of toDelete) remove(v);
