# In-order Traversal

In-order traversal visits the nodes of a binary tree recursively in the
order **left subtree, node, right subtree**. Starting at the root, the
traversal first descends all the way down the left branch; a node's
value is only output once its whole left subtree has been output, and
its right subtree is processed afterwards.

Applied to a binary search tree this produces the values in ascending
order, since everything in a left subtree is smaller than the node and
everything in the right subtree is larger. The visualisation colours a
node magenta when it is first reached, pulses it when its value is
output, and turns it green once both of its subtrees are finished.

## Complexity

| Name                     | Time            | Memory          | Comments                                  |
| ------------------------ | :-------------: | :-------------: | :---------------------------------------- |
| **In-order traversal**   | n               | h               | h = tree height, used by the call stack   |
