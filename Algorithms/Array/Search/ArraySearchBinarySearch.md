# Binary Search

Binary search finds a target in a **sorted** array by repeatedly halving the
search range. It compares the target with the middle element: if they are
equal the search is over, if the target is smaller the right half is
discarded, otherwise the left half is discarded. Each comparison removes
half of the remaining candidates, so even a million elements need at most
about twenty comparisons.

The array must be sorted beforehand, and it must support random access
(jumping straight to the middle element), so binary search is not suitable
for linked lists.

![Algorithm Visualization](https://upload.wikimedia.org/wikipedia/commons/8/83/Binary_Search_Depiction.svg)

## Complexity

| Name              | Best | Average | Worst | Memory | Comments                      |
| ----------------- | :--: | :-----: | :---: | :----: | :---------------------------- |
| **Binary search** | 1    | log n   | log n | 1      | Requires a sorted array       |
