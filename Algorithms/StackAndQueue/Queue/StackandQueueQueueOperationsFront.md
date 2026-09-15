# Queue Front

`front()`, also called `peek()`, returns the element at the front of the queue
*without* removing it. It lets an algorithm look at the next item to be served
and decide what to do before committing to a `dequeue()`, for example when
merging two sorted streams or processing events only once they are due.

Since the queue keeps a direct reference to its front element, `front()` is a
single read and runs in constant time. The visualisation calls `front()` on a
queue holding 14, 52, 33, 27, shows that 14 is returned and nothing changes,
then dequeues once and calls `front()` again to show that 52 is now at the
front.

## Complexity

| Operation             | Time            | Extra memory | Comments                                       |
| --------------------- | :-------------: | :----------: | :--------------------------------------------- |
| **front / peek**      | 1               | 1            | Reads the front element, the queue is unchanged |
