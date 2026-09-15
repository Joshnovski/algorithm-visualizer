# Heap Delete

Deleting from a binary max-heap normally means removing the root, which
holds the largest value; this operation is also called *extract-max*.
The root cannot simply be dropped, because that would leave a hole and
break the complete shape that lets the heap live in an array. Instead
the root is swapped with the last element, the last slot is removed
(that is where the maximum now sits), and the value that landed at the
root is **sifted down**: compare it with its children and swap it with
the larger child while that child is bigger, until it has no children
or both are smaller.

The visualisation extracts the maximum twice from a heap of seven
values, showing the tree and the backing array together. The tree node
and array cell of a removed slot disappear; every other node keeps its
place and only the values move between slots.

## Complexity

| Name                  | Average         | Worst           | Memory    | Comments                                    |
| --------------------- | :-------------: | :-------------: | :-------: | :------------------------------------------ |
| **Extract max**       | log n           | log n           | 1         | Sift-down walks at most one root-leaf path  |
