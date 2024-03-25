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



// RENDER LOGS

function dfs(n, parent = null, logs = []) {
  G.node[n].seen = true;
  if (parent === null) {
    logs.push(`Start at node ${n}`);
  } else {
    logs.push(`Traverse edge [${parent}, ${n}]`);
  }
  for (let n2 of G.neighbors(n)) {
    if (!G.node[n2].seen) {
      dfs(n2, n, logs);
    }
  }
  if (parent !== null) {
    logs.push(`Backtracking edge [${n}, ${parent}]`);
  }
  return logs;
};

const logs = dfs(0);
// logs.push("DFS complete!");
// console.log(logs);
return logs;
