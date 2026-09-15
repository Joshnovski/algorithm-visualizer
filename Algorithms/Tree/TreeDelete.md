# Tree Delete

Deleting from a binary search tree (BST) starts with a normal search for
the value. What happens next depends on how many children the node has:

- **No children (a leaf)**: unlink the node from its parent.
- **One child**: the child takes the node's place under the parent, so
  the whole subtree moves up one level.
- **Two children**: find the node's in-order successor, the smallest
  value in its right subtree (go right once, then left as far as
  possible). Copy the successor's value into the node, then delete the
  successor, which has no left child and therefore falls into one of
  the first two cases.

The visualisation shows the three cases in order: the leaf 35, then 60
(one child, 65), then the root 50, whose successor 65 is copied into the
root before the successor node is removed. The BST property holds after
each deletion, which is why the in-order listing stays sorted.

## Complexity

| Name                  | Average         | Worst           | Memory    | Comments                                    |
| --------------------- | :-------------: | :-------------: | :-------: | :------------------------------------------ |
| **BST delete**        | log n           | n               | 1         | Worst case is a degenerate (list-like) tree |
