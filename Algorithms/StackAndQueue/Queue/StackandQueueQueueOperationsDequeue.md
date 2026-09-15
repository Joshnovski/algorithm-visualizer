# Queue Dequeue

`dequeue()` removes the element at the front of a queue and returns it. Because
a queue is first-in, first-out, the element returned is always the one that
was enqueued earliest; the element behind it becomes the new front. Dequeuing
an empty queue is an error, so callers normally check `isEmpty()` first.

Removing the front element is a constant-time operation when the queue is
implemented as a linked list or a circular buffer: only the front pointer
moves. (A naive array implementation that physically shifts every remaining
element left would be linear; the shift shown in the animation is only there to
keep the picture tidy.) The visualisation starts with 14, 52, 33, 27, 64 and
dequeues three times, returning 14, 52 and 33 in that order.

## Complexity

| Operation             | Time            | Extra memory | Comments                                       |
| --------------------- | :-------------: | :----------: | :--------------------------------------------- |
| **dequeue**           | 1               | 1            | n with a plain array that shifts its elements  |
