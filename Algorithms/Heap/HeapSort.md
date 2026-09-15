# Heap Sort

Heapsort sorts an array in place using the binary max-heap structure.
It runs in two phases. First the unsorted array is turned into a
max-heap by **heapifying**: starting from the last node that has
children and working back to the root, each node is sifted down so that
it is at least as large as everything below it. Once the root holds the
largest value the heap is complete.

In the second phase the root is swapped with the last element of the
heap, which puts the maximum in its final sorted position. The heap
size shrinks by one so that slot is never touched again, and the value
that moved to the root is sifted down to restore the heap. Repeating
this until the heap has one element leaves the array sorted in
ascending order. The visualisation greys out tree nodes as they leave
the heap and turns array cells green as they become sorted.

## Complexity

| Name                  | Best            | Average             | Worst               | Memory    | Stable    | Comments  |
| --------------------- | :-------------: | :-----------------: | :-----------------: | :-------: | :-------: | :-------- |
| **Heap sort**         | n log(n)        | n log(n)            | n log(n)            | 1         | No        |           |
