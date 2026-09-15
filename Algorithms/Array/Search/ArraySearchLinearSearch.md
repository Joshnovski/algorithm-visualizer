# Linear Search

Linear search (or sequential search) checks each element of the array in
turn until it finds the target or runs out of elements. It makes no
assumptions about the data, so it works on unsorted arrays and on
structures that only allow sequential access, such as linked lists.

On average it inspects half of the elements when the target is present and
all of them when it is not, so its running time grows linearly with the
size of the input.

## Complexity

| Name              | Best | Average | Worst | Memory | Comments                        |
| ----------------- | :--: | :-----: | :---: | :----: | :------------------------------ |
| **Linear search** | 1    | n       | n     | 1      | Works on unsorted data          |
