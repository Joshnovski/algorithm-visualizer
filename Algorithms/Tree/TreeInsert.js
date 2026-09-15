// Tree // Insert (binary search tree)
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

// Fixed values, inserted in this order, give a balanced starting tree with four levels
const initial = [50, 30, 70, 20, 40, 60, 80, 35, 65];
const toInsert = [45, 25, 75];

const makeNode = (value) => ({ id: "t" + value, value, left: null, right: null });
function insertPlain(node, value) { // Builds the starting tree without any animation
  if (!node) return makeNode(value);
  if (value < node.value) node.left = insertPlain(node.left, value);
  else node.right = insertPlain(node.right, value);
  return node;
}
let root = null;
for (const v of initial) root = insertPlain(root, v);

// RENDER DIAGRAM

const BASE = "#555555", COMPARE = "#f0b429", DONE = "#17ec7a", EDGE_BASE = "#888888", TRAVERSE = "#3b8beb";
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

function insert(value) {
  const newNode = makeNode(value);
  const visited = [], edges = [];
  let node = root;
  while (true) {
    visited.push(node.id);
    q.node(node.id).color(COMPARE);
    const goLeft = value < node.value;
    const next = goLeft ? node.left : node.right;
    const side = goLeft ? "left" : "right";
    const prefix = visited.length === 1 ? `Insert ${value}: ` : "";
    if (next) {
      edges.push([node.id, next.id]);
      q.edge([node.id, next.id]).traverse(TRAVERSE, node.id);
      step(`${prefix}${value} ${goLeft ? "<" : ">"} ${node.value}, go ${side}`);
      node = next;
      continue;
    }
    step(`${prefix}${value} ${goLeft ? "<" : ">"} ${node.value} and the ${side} child of ${node.value} is empty`);
    if (goLeft) node.left = newNode; else node.right = newNode;
    q.node(newNode.id).add({
      size: 14, fixed: true, color: DONE, pos: layout(root)[newNode.id],
      labels: { 0: { text: value, color: "#ffffff", size: 13 } },
    });
    q.edge([node.id, newNode.id]).add({ curve: "linear", color: EDGE_BASE });
    step(`Insert ${value} as the ${side} child of ${node.value}`);
    break;
  }
  q.nodes([...visited, newNode.id]).color(BASE);
  if (edges.length) q.edges(edges).color(EDGE_BASE);
  step(`${value} inserted, the tree now has ${allNodes(root).length} nodes`);
}

for (const v of toInsert) insert(v);
