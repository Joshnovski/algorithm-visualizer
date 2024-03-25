// GENERATE DATA STRUCTURE

seedrandom("2", { global: true }); // Set fixed seed (Later allow user to set seed)
const G = jsnx.fastGnpRandomGraph(5, 0.6); // Generate G(n, p) graph, n = nodes, p = probability of adding edge
for (let n of G) {
  G.node[n] = { seen: false }; // Mark each node initially as not visited
}

// RENDER DIAGRAM

canvas.nodes(G.nodes()).add();
canvas.edges(G.edges()).add();

// Breadth-First Search function
function bfs(start) {
    const q = canvas.withQ('q1')
    let queue = [start]; // Initialize queue with the start node
    G.node[start].seen = true; // Mark the start node as seen
    
    while (queue.length > 0) {
      const n = queue.shift(); // Dequeue a node for processing
      
      // Visualize: Node identify as visited
      q.node(n).highlight().size("1.5x");
      q.node(n).color("#ba0d5b"); // Node color
      stepCounter++;
      q.pause(speedValue);
  
      for (let n2 of G.neighbors(n)) {
        if (!G.node[n2].seen) {
          G.node[n2].seen = true; // Mark neighbor as seen
          queue.push(n2); // Enqueue unvisited neighbor
          
          // Visualize: Edge traversal
          q.edge([n, n2]).traverse("blue");
          stepCounter++;
          q.pause(speedValue);
        }
      }
    }
  }

startingNode = 0;
// TIMING and INITIALIZATION
bfs(startingNode);
return stepCounter;



// RENDER LOGS

function bfs(n, logs = [], seen = new Set()) {
    let queue = [n]; // Initialize queue with the start node
    seen.add(n); // Mark the start node as seen
  
    logs.push(`Start at node ${n}`); // Log the starting node
  
    while (queue.length > 0) {
      const node = queue.shift(); // Dequeue a node for processing
  
      // For each neighbor of the current node
      G.neighbors(node).forEach(neighbor => {
        if (!seen.has(neighbor)) {
          seen.add(neighbor); // Mark neighbor as seen
          queue.push(neighbor); // Enqueue unvisited neighbor
  
          // Log the edge traversal
          logs.push(`Node ${node} visits ${neighbor}`);
        }
      });
    }
    return logs;
  };

const logs = bfs(startingNode);
// logs.push("BFS complete!");
// console.log(logs);
return logs;
