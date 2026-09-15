# Dijkstra's Shortest Path

Dijkstra's algorithm finds the shortest path from a start node to every
other node in a graph whose edge weights are non-negative. It keeps a
tentative distance for each node (initially infinity, and 0 for the start).
On every round it takes the unvisited node with the smallest tentative
distance, marks it final, and *relaxes* each of its edges: if going through
the node gives a neighbour a shorter distance, the neighbour's distance is
updated.

Because the node chosen on each round has the smallest distance among all
remaining nodes, and edge weights cannot be negative, no later path can
improve on it. This greedy choice is what makes the algorithm correct.

![Algorithm Visualization](https://upload.wikimedia.org/wikipedia/commons/5/57/Dijkstra_Animation.gif)

## Complexity

| Implementation           | Time                | Comments                                   |
| ------------------------ | :-----------------: | :----------------------------------------- |
| Array scan (shown here)  | V<sup>2</sup>       | Simple, fine for small dense graphs        |
| Binary heap              | (V + E) log V       | Usual choice in practice                   |
| Fibonacci heap           | E + V log V         | Best asymptotic bound                      |
