# Quick Sort

Quick sort picks one element as the *pivot* and partitions the rest of the
array into elements smaller than the pivot (moved to its left) and elements
greater than or equal to it (left on its right). After partitioning the pivot
is in its final sorted position, and the two sides are sorted recursively.

This visualisation uses the Lomuto partition scheme with the last element as
the pivot. With a good choice of pivot the partitions are balanced and the
sort runs in n log n time; with an unlucky pivot on every level (for example
the largest element of an already sorted array) it degrades to n².

![Algorithm Visualization](https://upload.wikimedia.org/wikipedia/commons/6/6a/Sorting_quicksort_anim.gif)

## Complexity

| Name           | Best    | Average | Worst         | Memory | Stable | Comments                                   |
| -------------- | :-----: | :-----: | :-----------: | :----: | :----: | :----------------------------------------- |
| **Quick sort** | n log n | n log n | n<sup>2</sup> | log n  | No     | Worst case depends on pivot selection      |
