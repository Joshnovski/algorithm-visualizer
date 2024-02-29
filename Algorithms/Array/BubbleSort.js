// Generate Random Graph
seedrandom("2", { global: true }); // Set fixed seed (Later allow user to set seed)
const G = jsnx.fastGnpRandomGraph(7, 0.6); // Generate G(n, p) graph, n = nodes, p = probability of adding edge
for (let n of G) {
  G.node[n] = { seen: false }; // Mark each node initially as not visited
}

// Render graph
canvas.nodes(G.nodes()).add();
canvas.edges(G.edges()).add();

// Async function to wait for isPlaying to be true
async function waitForIsPlaying() {
  while (!isPlaying) {
    await new Promise(resolve => setTimeout(resolve, 100)); // Wait for 100ms before checking again
  }
}

// Recursive DFS function
async function dfs(n) {
  await waitForIsPlaying();
  G.node[n].seen = true;
  canvas.node(n).highlight().size("1.5x"); // Node identify as visited
  canvas.node(n).color("#ba0d5b"); // Node color
  canvas.pause(2);

  for (let n2 of G.neighbors(n)) {
    if (G.node[n2].seen) continue;
    await waitForIsPlaying();
    canvas.edge([n, n2]).traverse("blue");
    await dfs(n2); // DFS on neighbor
    canvas.edge([n2, n]).traverse("#ba0d5b");
    canvas.node(n).highlight().size("1.5x");
    canvas.pause(2);
  }
}
dfs(0).then(() => {
  for (let n of G) {
    if (G.node[n].seen) {
      canvas.node(n).highlight().size("1.5x");
    }
  }
});