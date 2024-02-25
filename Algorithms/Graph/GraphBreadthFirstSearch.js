// Generate Random Graph
seedrandom("2", { global: true }); // Set fixed seed (Later allow user to set seed)
const G = jsnx.fastGnpRandomGraph(7, 0.6); // Generate G(n, p) graph, n = nodes, p = probability of adding edge
for (let n of G) {
  G.node[n] = { seen: false }; // Mark each node initially as not visited
}

// Render graph
canvas.nodes(G.nodes()).add();
canvas.edges(G.edges()).add();

// Recursive DFS function
function dfs(n) {
  G.node[n].seen = true;
  canvas.node(n).highlight().size("1.5x"); // Node identify as visited
  canvas.node(n).color("#ba0d5b"); // Node color
  canvas.pause(2);

  for (let n2 of G.neighbors(n)) {
    if (G.node[n2].seen) continue;
    canvas.edge([n, n2]).traverse("blue");
    dfs(n2); // DFS on neighbor
    canvas.edge([n2, n]).traverse("#ba0d5b");
    canvas.node(n).highlight().size("1.5x");
    canvas.pause(2);
  }
}
dfs(0); // Start DFS from node 0
// Immediately after DFS, highlight all seen nodes
for (let n of G) {
  if (G.node[n].seen) {
    canvas.node(n).highlight().size("1.5x");
  }
}