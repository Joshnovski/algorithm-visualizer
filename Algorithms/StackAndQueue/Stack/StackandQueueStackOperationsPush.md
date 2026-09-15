# Stack Push

A stack is a last-in, first-out (LIFO) collection: elements are added and
removed at one end only, called the top. `push(x)` places a new element on the
top of the stack and makes it the new top; the element that was on top before
is now directly beneath it and cannot be reached until the new element is
popped again.

Because a push only touches the top, it never has to look at the rest of the
stack, so it runs in constant time regardless of how many elements are already
stored. When the stack is backed by a dynamic array the occasional resize makes
this amortised constant time; with a linked list it is always constant. The
visualisation pushes 27, 64 and 81 onto a stack that already holds 14, 52, 33.

## Complexity

| Operation             | Time            | Extra memory | Comments                                       |
| --------------------- | :-------------: | :----------: | :--------------------------------------------- |
| **push**              | 1               | 1            | Amortised 1 when backed by a resizing array    |
