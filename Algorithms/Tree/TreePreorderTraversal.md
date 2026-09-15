# Pre-order Traversal

Pre-order traversal visits the nodes of a binary tree recursively in the
order **node, left subtree, right subtree**. A node's value is output
the moment it is reached, before either of its subtrees is explored, so
the root is always the first value and every parent appears before its
children.

This ordering is the one that reproduces the tree when the values are
inserted into a fresh binary search tree in the same sequence, which is
why pre-order is commonly used to serialise or copy a tree. The
visualisation colours a node magenta when it is reached and output, and
green once both of its subtrees are finished.

## Complexity

| Name                     | Time            | Memory          | Comments                                  |
| ------------------------ | :-------------: | :-------------: | :---------------------------------------- |
| **Pre-order traversal**  | n               | h               | h = tree height, used by the call stack   |
