// Depth-First Search
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

seedrandom("2", { global: true }); // Fixed seed so the same graph is generated every build
const G = jsnx.fastGnpRandomGraph(7, 0.4); // G(n, p) random graph: n nodes, p = edge probability
for (const n of G) {
  G.node[n] = { seen: false }; // Mark each node initially as not visited
}
const startingNode = 0;

// RENDER DIAGRAM

const VISITING = "#ba0d5b", DONE = "#17ec7a", TRAVERSE = "#3b8beb", BACKTRACK = "#f0b429";
canvas.size([420, 320]);
canvas.edgelength(90);
canvas.nodes(G.nodes()).add({ labels: { 0: { color: "#ffffff" } } });
canvas.edges(G.edges()).add();

const q = canvas.withQ("q1"); // Everything queued on q is animated step by step

// Recursive DFS: go as deep as possible before backtracking
function dfs(n, parent = null) {
  G.node[n].seen = true;
  q.node(n).color(VISITING).highlight().size("1.5x");
  step(parent === null ? `Start at node ${n}` : `Visit node ${n} (from ${parent})`);

  for (const n2 of G.neighbors(n)) {
    if (G.node[n2].seen) continue;
    q.edge([n, n2]).traverse(TRAVERSE, n);
    dfs(n2, n);
    q.edge([n2, n]).traverse(BACKTRACK, n2);
    q.node(n).highlight().size("1.5x");
    step(`Backtrack from ${n2} to ${n}`);
  }

  q.node(n).color(DONE);
  step(`Node ${n} finished: all neighbours explored`);
}

dfs(startingNode);
