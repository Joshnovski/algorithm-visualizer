# Linked List Insert

A singly linked list is a chain of nodes where each node holds a value and a
pointer (`next`) to the following node; the last node points at `null` and a
`head` pointer marks the first node. Inserting a new node never moves the
existing nodes in memory: the new node is created, its `next` pointer is set to
the node that should follow it, and the `next` pointer of the node before it is
redirected to the new node.

Inserting at the head takes constant time because `head` already points at the
only node that has to change. Inserting after a given position, or at the tail
of a list without a tail pointer, first requires walking the chain from `head`
until the right node is found, which is linear in the length of the list. The
visualisation shows all three cases: inserting 31 at the head, 64 after index 2
and 99 at the tail.

## Complexity

| Operation             | Time            | Extra memory | Comments                                   |
| --------------------- | :-------------: | :----------: | :----------------------------------------- |
| **Insert at head**    | 1               | 1            | Only `head` and the new node change        |
| **Insert after index k** | k            | 1            | Walk k links, then relink two pointers     |
| **Insert at tail**    | n               | 1            | 1 if the list also keeps a tail pointer    |
