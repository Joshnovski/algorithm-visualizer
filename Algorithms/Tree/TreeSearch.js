// Tree // Search (binary search tree)
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

// Fixed values, inserted in this order, give a balanced tree with four levels
const initial = [50, 30, 70, 20, 40, 60, 80, 35, 65];
const toSearch = [65, 55]; // 65 is in the tree, 55 is not

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

const BASE = "#555555", COMPARE = "#f0b429", FOUND = "#17ec7a", NOT_FOUND = "#ff6b6b";
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

function search(value, isLast) {
  const visited = [], edges = [];
  let node = root;
  while (node) {
    visited.push(node.id);
    q.node(node.id).color(COMPARE);
    step(`${visited.length === 1 ? `Search ${value}: c` : "C"}ompare ${value} with ${node.value}`);
    if (value === node.value) {
      q.node(node.id).color(FOUND);
      step(`${value} = ${node.value}, found after ${visited.length} comparisons`);
      break;
    }
    const goLeft = value < node.value;
    const next = goLeft ? node.left : node.right;
    const side = goLeft ? "left" : "right";
    if (!next) {
      q.node(node.id).color(NOT_FOUND);
      step(`${value} ${goLeft ? "<" : ">"} ${node.value} but the ${side} child is empty: ${value} not found`);
      break;
    }
    edges.push([node.id, next.id]);
    q.edge([node.id, next.id]).traverse(TRAVERSE, node.id);
    step(`${value} ${goLeft ? "<" : ">"} ${node.value}, go ${side}`);
    node = next;
  }
  if (isLast) return; // Nothing may be queued after the final step
  q.nodes(visited).color(BASE);
  if (edges.length) q.edges(edges).color(EDGE_BASE);
  step("Reset the colours for the next search");
}

toSearch.forEach((v, i) => search(v, i === toSearch.length - 1));
