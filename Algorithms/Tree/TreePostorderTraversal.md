# Post-order Traversal

Post-order traversal visits the nodes of a binary tree recursively in
the order **left subtree, right subtree, node**. A node's value is only
output after both of its subtrees have been completely processed, so
the leaves come out first and the root is always the last value.

Because every child is handled before its parent, post-order is the
natural order for operations that must finish with the children before
touching the parent, such as freeing the memory of a tree or evaluating
an expression tree. The visualisation colours a node magenta when it is
reached and green at the moment its value is output.

## Complexity

| Name                     | Time            | Memory          | Comments                                  |
| ------------------------ | :-------------: | :-------------: | :---------------------------------------- |
| **Post-order traversal** | n               | h               | h = tree height, used by the call stack   |
