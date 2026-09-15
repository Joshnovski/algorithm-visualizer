// Tree // Post-order Traversal (left subtree, right subtree, node)
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

// Fixed values, inserted in this order, give a balanced binary search tree with four levels
const initial = [50, 30, 70, 20, 40, 60, 80, 35, 65];

const makeNode = (value) => ({ id: "t" + value, value, left: null, right: null });
function insertPlain(node, value) { // Builds the tree without any animation
  if (!node) return makeNode(value);
  if (value < node.value) node.left = insertPlain(node.left, value);
  else node.right = insertPlain(node.right, value);
  return node;
}
let root = null;
for (const v of initial) root = insertPlain(root, v);

// RENDER DIAGRAM

const BASE = "#555555", VISIT = "#ba0d5b", DONE = "#17ec7a", EDGE_BASE = "#888888", TRAVERSE = "#3b8beb";
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
const childEdges = (nodes) => nodes.flatMap((n) => [n.left, n.right].filter(Boolean).map((c) => [n.id, c.id]));

const nodes = allNodes(root);
const edges = childEdges(nodes);
const pos = layout(root);
canvas.nodes(nodes.map((n) => n.id)).add({
  size: 14, fixed: true, color: BASE,
  pos: (_, i) => pos[nodes[i].id],
  labels: (_, i) => ({ 0: { text: nodes[i].value, color: "#ffffff", size: 13 } }),
});
canvas.edges(edges).add({ curve: "linear", color: EDGE_BASE });
canvas.labels(["output"]).add({ text: "Output:", pos: [0, -125], color: "#888888", size: 12 }); // Sequence so far

const q = canvas.withQ("q1"); // Everything queued on q is animated step by step

const output = [];
function emit(node) { // Appends the node's value to the output sequence shown under the tree
  output.push(node.value);
  q.node(node.id).highlight().size("1.5x");
  q.label("output").text(`Output: ${output.join(", ")}`);
}

// Post-order: recurse into the left subtree, then the right subtree, and output the node last
function postorder(node, parent) {
  const v = node.value;
  q.node(node.id).color(VISIT);
  if (parent) q.edge([parent.id, node.id]).traverse(TRAVERSE, parent.id);
  const next = node.left ? ": go into its left subtree first" : node.right ? ": no left subtree, go into its right subtree" : ", a leaf";
  step(`Visit ${v}${next}`);

  if (node.left) postorder(node.left, node);
  if (node.right) {
    if (node.left) {
      q.node(node.id).highlight().size("1.5x");
      step(`Left subtree of ${v} done, go into its right subtree`);
    }
    postorder(node.right, node);
  }

  emit(node);
  q.node(node.id).color(DONE);
  const why = !node.left && !node.right ? `${v} has no children` : `Subtrees of ${v} done`;
  step(`${why}: output ${v}, ${v} is complete`);
}

postorder(root, null);
q.edges(edges).color(DONE);
step(`Post-order traversal complete: ${output.join(", ")} (each node after its children)`);
