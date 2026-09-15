# Heap Insert

A binary max-heap is a complete binary tree in which every parent is
greater than or equal to its children, so the largest value is always
at the root. Because the tree is complete it can be stored in a plain
array with no pointers: the root is at index 0 and the children of the
node at index i are at 2i+1 and 2i+2, so the parent of index i is at
(i-1)/2 rounded down.

To insert a value, append it at the end of the array, which keeps the
tree complete, and then **sift it up**: compare it with its parent and
swap the two while the parent is smaller. The value stops as soon as
its parent is at least as large, or when it reaches the root. The
visualisation shows the tree and the backing array side by side; a swap
only exchanges values between two fixed slots.

## Complexity

| Name                  | Average         | Worst           | Memory    | Comments                                    |
| --------------------- | :-------------: | :-------------: | :-------: | :------------------------------------------ |
| **Heap insert**       | 1               | log n           | 1         | Average is O(1) for random inserts          |
