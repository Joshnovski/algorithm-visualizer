# Tree Insert

A binary search tree (BST) keeps every value in its left subtree smaller
than the node and every value in its right subtree larger. To insert a
new value, start at the root and compare: go left when the new value is
smaller, right when it is larger, and repeat until the child slot in
that direction is empty. The new value becomes a leaf in that slot, so
the ordering property holds for the whole tree.

The visualisation starts from a balanced tree of nine values and inserts
45, 25 and 75 one at a time, highlighting every node compared on the
way down before the new leaf is attached.

## Complexity

| Name                  | Average         | Worst           | Memory    | Comments                                    |
| --------------------- | :-------------: | :-------------: | :-------: | :------------------------------------------ |
| **BST insert**        | log n           | n               | 1         | Worst case is a degenerate (list-like) tree |
