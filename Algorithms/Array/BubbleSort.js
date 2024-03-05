// GENERATE DATA STRUCTURE

seedrandom("2", { global: true }); // Set fixed seed (Later allow user to set seed)
const G = jsnx.fastGnpRandomGraph(5, 0.6); // Generate G(n, p) graph, n = nodes, p = probability of adding edge
for (let n of G) {
  G.node[n] = { seen: false }; // Mark each node initially as not visited
}

// RENDER DIAGRAM

canvas.nodes(G.nodes()).add();
canvas.edges(G.edges()).add();

// Recursive DFS function
function dfs(n) {
  const q = canvas.withQ('q1')
  G.node[n].seen = true;
  q.node(n).highlight().size("1.5x"); // Node identify as visited
  q.node(n).color("#ba0d5b"); // Node color
  stepCounter++;
  q.pause(speedValue);

  for (let n2 of G.neighbors(n)) {
    if (G.node[n2].seen) continue;
    q.edge([n, n2]).traverse("blue");
    dfs(n2); // DFS on neighbor
    q.edge([n2, n]).traverse("#ba0d5b");
    q.node(n).highlight().size("1.5x");
    stepCounter++;
    q.pause(speedValue);
  }
}

dfs(0);
// TIMING and INITIALIZATION
return stepCounter;
// return stepCounter;
// for (let n of G) {
//   if (G.node[n].seen) {
//     canvas.node(n).highlight().size("1.5x");
//   }
// }


// Immediately after DFS, highlight all seen nodes
// for (let n of G) {
//   if (G.node[n].seen) {
//     canvas.node(n).highlight().size("1.5x");
//   }
// }


// RENDER LOGS

// Function to wait until isPlaying is true
function waitForIsPlaying() {
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      if (isPlaying) {
        clearInterval(intervalId);
        resolve();
      }
    }, 100); // Check every 100ms
  });
}

// Modified DFS algorithm with message logging and isPlaying check
const dfs = async (n, parent = null) => {
  // Wait for isPlaying to be true before proceeding
  await waitForIsPlaying();

  // Mark the node as seen.
  G.node[n].seen = true;
  // If this is the start node, log the initial message.
  if (parent === null) {
    addInstantMessage(`Start at node ${n}`);
  } else {
    // Otherwise, log the traversal to this node from its parent.
    await addDelayedMessage(`Traverse edge [${parent}, ${n}]`);
  }

  // Iterate through all neighbors of node n.
  for (let n2 of G.neighbors(n)) {
    if (!G.node[n2].seen) {
      // If the neighbor has not been seen, continue the DFS recursively.
      await dfs(n2, n);
    }
  }

  // After exploring all neighbors of n, if this is not the start node, log the backtracking.
  if (parent !== null) {
    await addDelayedMessage(`Backtracking edge [${n}, ${parent}]`);
  }
};

// Start DFS and message logging with isPlaying check
(async () => {
  await dfs(0); // Start the DFS from node 0
  addDelayedMessage("DFS complete!");
})();