# Tree Search

Searching a binary search tree (BST) works like binary search on a
sorted array. Start at the root and compare the target with the node's
value: if they are equal the search succeeds; if the target is smaller
move to the left child, otherwise move to the right child. Because
every left subtree holds only smaller values and every right subtree
only larger ones, each comparison rules out an entire subtree.

The search fails when it would have to move into an empty child. The
visualisation first looks for 65, which is present, and then for 55,
which is not: the path taken is highlighted in both cases, ending in
green when the value is found and red when a null child is reached.

## Complexity

| Name                  | Average         | Worst           | Memory    | Comments                                    |
| --------------------- | :-------------: | :-------------: | :-------: | :------------------------------------------ |
| **BST search**        | log n           | n               | 1         | Worst case is a degenerate (list-like) tree |
