# Selection Sort

Selection sort divides the array into a sorted part on the left and an
unsorted part on the right. On every pass it scans the unsorted part to
find the smallest element and swaps it into the first unsorted position,
growing the sorted part by one. It always performs the same number of
comparisons regardless of the input, but never more than n − 1 swaps,
which makes it useful when writes are expensive.

![Algorithm Visualization](https://upload.wikimedia.org/wikipedia/commons/9/94/Selection-Sort-Animation.gif)

## Complexity

| Name               | Best          | Average       | Worst         | Memory | Stable | Comments                          |
| ------------------ | :-----------: | :-----------: | :-----------: | :----: | :----: | :-------------------------------- |
| **Selection sort** | n<sup>2</sup> | n<sup>2</sup> | n<sup>2</sup> | 1      | No     | At most n − 1 swaps               |
