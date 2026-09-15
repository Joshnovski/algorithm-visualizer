// Breadth-First Search
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

seedrandom("2", { global: true }); // Fixed seed so the same graph is generated every build
const G = jsnx.fastGnpRandomGraph(7, 0.4); // G(n, p) random graph: n nodes, p = edge probability
for (const n of G) {
  G.node[n] = { seen: false }; // Mark each node initially as not discovered
}
const startingNode = 0;

// RENDER DIAGRAM

const QUEUED = "#f0b429", VISITING = "#ba0d5b", DONE = "#17ec7a", TRAVERSE = "#3b8beb";
canvas.size([420, 320]);
canvas.edgelength(90);
canvas.nodes(G.nodes()).add({ labels: { 0: { color: "#ffffff" } } });
canvas.edges(G.edges()).add();

const q = canvas.withQ("q1"); // Everything queued on q is animated step by step

// BFS explores the graph level by level using a FIFO queue
function bfs(start) {
  const queue = [start];
  G.node[start].seen = true;
  q.node(start).color(QUEUED);
  step(`Start at node ${start}: mark it discovered and enqueue it. Queue: [${queue}]`);

  while (queue.length > 0) {
    const n = queue.shift();
    q.node(n).color(VISITING).highlight().size("1.5x");
    step(`Dequeue node ${n} and look at its neighbours. Queue: [${queue}]`);

    for (const n2 of G.neighbors(n)) {
      if (G.node[n2].seen) continue;
      G.node[n2].seen = true;
      queue.push(n2);
      q.edge([n, n2]).traverse(TRAVERSE, n);
      q.node(n2).color(QUEUED);
      step(`Discover node ${n2} via edge ${n}–${n2} and enqueue it. Queue: [${queue}]`);
    }

    q.node(n).color(DONE);
  }

  const unreached = G.nodes().filter((n) => !G.node[n].seen);
  step(unreached.length === 0
    ? "Queue is empty: every node has been visited"
    : `Queue is empty. Nodes ${unreached.join(", ")} are not reachable from ${start}`);
}

bfs(startingNode);
