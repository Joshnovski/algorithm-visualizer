# Linked List Reverse

Reversing a singly linked list in place turns every `next` pointer around so
that the old tail becomes the new head. The classic iterative solution keeps
three pointers: `prev` (the part of the list already reversed, initially
`null`), `curr` (the node being processed, initially `head`) and `next` (saved
copy of `curr.next`, needed because the link is about to be overwritten).

Each iteration does four things: save `next = curr.next`, flip the link with
`curr.next = prev`, then advance with `prev = curr` and `curr = next`. When
`curr` reaches `null` every link has been flipped and `prev` points at the new
head. The list is visited exactly once and no extra nodes are created, so the
algorithm is linear in time and constant in extra space.

## Complexity

| Operation             | Time            | Extra memory | Comments                                       |
| --------------------- | :-------------: | :----------: | :--------------------------------------------- |
| **Reverse (iterative)** | n             | 1            | Three pointers, one pass over the list         |
| **Reverse (recursive)** | n             | n            | The call stack holds one frame per node        |
