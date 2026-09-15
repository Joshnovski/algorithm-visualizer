# Linked List Delete

Deleting a node from a singly linked list means making the list skip over it:
the `next` pointer of the node *before* the target is redirected to the node
*after* it, and the target is freed. Because each node only knows about its
successor, the algorithm has to keep track of the previous node while it walks
the list, so that it has a pointer to redirect once the target is found.

Deleting the head is a constant-time special case: `head` is simply moved to
the second node. Deleting by value or deleting the tail requires a traversal
from `head`, which is linear in the length of the list. The visualisation
deletes the head, then searches for and deletes the value 23, then walks to the
end and deletes the tail.

## Complexity

| Operation             | Time            | Extra memory | Comments                                        |
| --------------------- | :-------------: | :----------: | :---------------------------------------------- |
| **Delete head**       | 1               | 1            | Move `head` to `head.next`                      |
| **Delete by value**   | n               | 1            | Walk until the value is found, keeping `prev`   |
| **Delete tail**       | n               | 1            | The second-to-last node must be found first     |
