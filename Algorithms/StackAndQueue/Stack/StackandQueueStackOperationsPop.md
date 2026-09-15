# Stack Pop

`pop()` removes the element on the top of a stack and returns it. Because a
stack is last-in, first-out, the element returned is always the one that was
pushed most recently; after the pop, the element beneath it becomes the new
top. Popping an empty stack is an error (an *underflow*), so callers normally
check `isEmpty()` first.

Like `push`, a pop only touches the top of the stack and therefore runs in
constant time no matter how many elements are stored. The visualisation starts
with 14, 52, 33, 27, 64 (bottom to top) and pops three times, returning 64, 27
and 33 in that order.

## Complexity

| Operation             | Time            | Extra memory | Comments                                       |
| --------------------- | :-------------: | :----------: | :--------------------------------------------- |
| **pop**               | 1               | 1            | Returns the most recently pushed element       |
