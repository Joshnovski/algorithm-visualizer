# Merge Sort

Merge sort is a divide-and-conquer algorithm. It splits the array in half,
recursively sorts each half, and then *merges* the two sorted halves by
repeatedly taking the smaller of the two front elements. Because a single
element is trivially sorted, the recursion bottoms out at arrays of length one.

Every level of the recursion touches each element once during merging, and
there are log n levels, giving a guaranteed n log n running time for any
input. The price is the extra memory used while merging.

![Algorithm Visualization](https://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif)

## Complexity

| Name           | Best    | Average | Worst   | Memory | Stable | Comments                          |
| -------------- | :-----: | :-----: | :-----: | :----: | :----: | :-------------------------------- |
| **Merge sort** | n log n | n log n | n log n | n      | Yes    | Guaranteed n log n                |
