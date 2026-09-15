// Dijkstra's Shortest Path
// Each call to step("message") ends one animation frame and writes the message to the log.

// GENERATE DATA STRUCTURE

seedrandom("2", { global: true }); // Fixed seed so the same graph is generated every build
const G = jsnx.fastGnpRandomGraph(7, 0.45); // G(n, p) random graph: n nodes, p = edge probability
for (const [u, v] of G.edges()) {
  G.getEdgeData(u, v).weight = Math.floor(Math.random() * 9) + 1; // Edge weights 1..9
}
const weight = (u, v) => G.getEdgeData(u, v).weight;
const startingNode = 0;

// RENDER DIAGRAM

const FRONTIER = "#f0b429", VISITING = "#ba0d5b", DONE = "#17ec7a", TRAVERSE = "#3b8beb", PATH = "#17ec7a";
canvas.size([460, 400]);
canvas.edgelength(100);
canvas.nodes(G.nodes()).add({
  labels: {
    0: { color: "#ffffff" },
    dist: { text: "∞", radius: 22, angle: 90, align: "bottom-middle", color: FRONTIER, size: 11 },
  },
});
canvas.edges(G.edges()).add({ labels: ([u, v]) => ({ 0: { text: weight(u, v), color: "#bbbbbb", size: 10 } }) });

const q = canvas.withQ("q1"); // Everything queued on q is animated step by step

function dijkstra(start) {
  const dist = {}, prev = {}, visited = new Set();
  for (const n of G.nodes()) dist[n] = Infinity;
  dist[start] = 0;
  q.node(start).label("dist").text(0);
  q.node(start).color(FRONTIER);
  step(`Set distance of ${start} to 0 and every other node to ∞`);

  while (true) {
    // Pick the unvisited node with the smallest tentative distance
    let u = null;
    for (const n of G.nodes()) {
      if (!visited.has(n) && dist[n] < Infinity && (u === null || dist[n] < dist[u])) u = n;
    }
    if (u === null) break;

    visited.add(u);
    q.node(u).color(VISITING).highlight().size("1.5x");
    if (prev[u] !== undefined) q.edge([prev[u], u]).color(PATH);
    step(`Visit ${u}: its distance ${dist[u]} is the smallest among unvisited nodes, so it is final`);

    for (const v of G.neighbors(u)) {
      if (visited.has(v)) continue;
      const alt = dist[u] + weight(u, v);
      q.edge([u, v]).traverse(TRAVERSE, u);
      if (alt < dist[v]) {
        const old = dist[v] === Infinity ? "∞" : dist[v];
        dist[v] = alt;
        prev[v] = u;
        q.node(v).label("dist").text(alt);
        q.node(v).color(FRONTIER);
        step(`Relax edge ${u}–${v} (weight ${weight(u, v)}): ${dist[u]} + ${weight(u, v)} = ${alt} < ${old}, update ${v}`);
      } else {
        step(`Edge ${u}–${v} (weight ${weight(u, v)}): ${dist[u]} + ${weight(u, v)} = ${alt} is not shorter than ${dist[v]}`);
      }
    }
    q.node(u).color(DONE);
  }

  const summary = G.nodes().map((n) => `${n}: ${dist[n] === Infinity ? "unreachable" : dist[n]}`).join(", ");
  step(`Done. Shortest distances from ${start} → ${summary}`);
}

dijkstra(startingNode);
