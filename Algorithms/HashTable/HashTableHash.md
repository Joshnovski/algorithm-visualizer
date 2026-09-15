# Hash

A hash table stores key/value pairs in an array of *buckets*. Instead of searching for a
key, the table computes its position directly with a **hash function** `h(k)` that maps
any key to a bucket index in `0 … m-1`. The simplest such function for integer keys is the
division method, `h(k) = k mod m`, shown here with `m = 7` buckets.

Because the bucket is calculated rather than searched for, inserting or finding a key
costs a constant amount of work on average, regardless of how many keys are stored. A good
hash function spreads keys evenly over the buckets; the ratio of stored keys to buckets is
the **load factor** `n / m`, and tables are usually resized once it grows past a threshold
(typically around 0.7) so that most buckets stay nearly empty.

## Complexity

| Operation             | Average         | Worst               | Comments                                   |
| --------------------- | :-------------: | :-----------------: | :----------------------------------------- |
| **Hash a key**        | 1               | 1                   | One modulo operation                       |
| **Insert**            | 1               | n                   | Worst case when every key collides         |
| **Space**             | n               | n                   | `m` buckets plus the `n` stored keys       |
