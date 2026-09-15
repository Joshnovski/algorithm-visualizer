# Delete

Deleting from a chained hash table is a search followed by an unlink. The key is hashed to
its bucket, then the bucket's chain is walked comparing each stored key with the one to
remove. When the match is found it is cut out of the chain: the node before it is re-linked
to the node after it. If the match is the head of the chain, which lives in the bucket itself,
its successor is moved up into the bucket so the bucket is never left holding a stale key. If
the walk reaches the end of the chain without a match there is nothing to delete.

Separate chaining makes deletion straightforward, which is one of its advantages over open
addressing. With open addressing a deleted slot cannot simply be emptied, because later keys
that probed past it would become unreachable, so those tables have to leave a *tombstone*
marker behind instead.

## Complexity

| Operation             | Average         | Worst               | Comments                                      |
| --------------------- | :-------------: | :-----------------: | :-------------------------------------------- |
| **Delete**            | 1 + n/m         | n                   | Cost of the search; the unlink itself is 1    |
| **Space**             | n + m           | n + m               | One chain node per stored key                 |
