# Search

Looking a key up in a chained hash table takes two moves. First the key is hashed,
`h(k) = k mod m`, which points straight at the one bucket that could contain it; every other
bucket is ignored. Then the chain hanging off that bucket is walked, comparing each stored key
with the one being searched for, until a match is found or the chain runs out. A key that
sits directly in its bucket is found after a single comparison; a key at the end of a chain
costs one comparison per link, and an absent key always costs a full walk of its chain.

This is why hash tables are fast: the hash calculation replaces the scan that an unsorted
array or linked list would need. The only work that grows with the amount of stored data is
the chain walk, and its expected length is the load factor `n / m`, which a well-managed
table keeps below one.

## Complexity

| Operation             | Average         | Worst               | Comments                                      |
| --------------------- | :-------------: | :-----------------: | :-------------------------------------------- |
| **Search (hit)**      | 1 + n/m         | n                   | Stops at the first matching key               |
| **Search (miss)**     | 1 + n/m         | n                   | Has to walk the whole chain                   |
| **Space**             | n + m           | n + m               | One chain node per stored key                 |
