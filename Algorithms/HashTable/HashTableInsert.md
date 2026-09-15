# Insert

Inserting a key into a chained hash table starts by hashing it, `h(k) = k mod m`, to find
its bucket. If the bucket is empty the key is simply placed there. If the bucket is already
occupied the key has collided with an existing one, and the insert has to walk the bucket's
chain: it compares the new key against every key already stored there, because a hash table
keeps each key only once. If a match is found the table is left unchanged; otherwise the new
key is appended to the end of the chain.

The walk is what makes the cost of an insert depend on the load factor. With keys spread
evenly, a chain has about `n / m` entries, so an insert does a constant amount of work on
average. In the worst case, when every key hashes to the same bucket, an insert has to compare
against all `n` stored keys before it can append.

## Complexity

| Operation             | Average         | Worst               | Comments                                      |
| --------------------- | :-------------: | :-----------------: | :-------------------------------------------- |
| **Insert**            | 1 + n/m         | n                   | Walks the chain to reject duplicate keys      |
| **Space**             | n + m           | n + m               | One chain node per stored key                 |
