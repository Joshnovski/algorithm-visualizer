# Linked List Traverse

Traversal visits every node of a singly linked list in order. A `current`
pointer starts at `head`; on each iteration the algorithm reads the value in
the current node and then follows its `next` pointer. The loop ends when
`current` becomes `null`, which is how the end of the list is marked.

Unlike an array, a linked list cannot jump to the i-th element directly: the
nodes are not stored next to each other, so the only way to reach a node is to
follow the chain of pointers from the head. Visiting all n nodes therefore
costs linear time, and finding a single element by index is also linear in the
worst case.

## Complexity

| Operation             | Time            | Extra memory | Comments                                 |
| --------------------- | :-------------: | :----------: | :--------------------------------------- |
| **Traverse all**      | n               | 1            | One pointer follow per node              |
| **Access index i**    | i               | 1            | No random access, unlike an array        |
