# Collision Resolution

A hash function maps many possible keys onto a small number of buckets, so sooner or later
two different keys hash to the same index. This is a **collision**, and every hash table
needs a rule for dealing with it. The visualisation uses **separate chaining**: each bucket
holds the first key that lands in it, and any further keys with the same hash are linked
below it in a chain (a short linked list). Inserting into a chain is cheap, but a lookup in
that bucket may have to compare against every key in the chain.

The other common family is *open addressing* (linear probing, quadratic probing, double
hashing), where a colliding key is placed in a different, still-empty bucket of the same
array instead. Whichever scheme is used, performance depends on the load factor `n / m`:
with chaining the average chain length is exactly the load factor, so keeping it small keeps
lookups close to constant time.

## Complexity

| Operation             | Average         | Worst               | Comments                                      |
| --------------------- | :-------------: | :-----------------: | :-------------------------------------------- |
| **Insert**            | 1               | n                   | Worst case when every key lands in one chain  |
| **Search / Delete**   | 1 + n/m         | n                   | Average chain length equals the load factor   |
| **Space**             | n + m           | n + m               | One chain node per stored key                 |
