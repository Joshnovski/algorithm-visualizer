# Insertion Sort

Insertion sort builds the sorted array one element at a time. It takes the
next unsorted element (the *key*), shifts every larger element of the sorted
prefix one place to the right, and drops the key into the gap. It is the way
most people sort a hand of playing cards.

It is slow on large random inputs, but it is simple, stable, works in place
and runs in linear time on data that is already nearly sorted, which is why
it is used inside more advanced sorts for small partitions.

![Algorithm Visualization](https://upload.wikimedia.org/wikipedia/commons/4/42/Insertion_sort.gif)

## Complexity

| Name               | Best | Average       | Worst         | Memory | Stable | Comments                              |
| ------------------ | :--: | :-----------: | :-----------: | :----: | :----: | :------------------------------------ |
| **Insertion sort** | n    | n<sup>2</sup> | n<sup>2</sup> | 1      | Yes    | Fast on nearly sorted input           |
