# Queue Enqueue

A queue is a first-in, first-out (FIFO) collection: elements join at one end,
the rear, and leave from the other end, the front, like people waiting in
line. `enqueue(x)` attaches a new element behind the current rear and makes it
the new rear. The front is unaffected, so the element that has waited longest
is still the next one to be served.

With a linked list that keeps a tail pointer, or a circular array buffer, an
enqueue only touches the rear and runs in constant time. The visualisation
enqueues 27, 64 and 81 behind a queue that already holds 14, 52, 33.

## Complexity

| Operation             | Time            | Extra memory | Comments                                       |
| --------------------- | :-------------: | :----------: | :--------------------------------------------- |
| **enqueue**           | 1               | 1            | Requires a rear/tail pointer or circular buffer |
