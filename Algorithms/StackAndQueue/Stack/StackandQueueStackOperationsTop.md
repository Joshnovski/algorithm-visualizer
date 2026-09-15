# Stack Top

`top()`, also called `peek()`, returns the element on the top of the stack
*without* removing it. It answers the question "what would `pop()` give me?"
while leaving the stack exactly as it was, which is useful when an algorithm
needs to inspect the most recent item before deciding whether to remove it,
for example when matching brackets or evaluating expressions.

Since the stack keeps a direct reference to its top element, `top()` is a
single read and runs in constant time. The visualisation calls `top()` on a
stack holding 14, 52, 33, 42, shows that 42 is returned and nothing changes,
then pushes 77 and calls `top()` again to show that the newest element is now
returned.

## Complexity

| Operation             | Time            | Extra memory | Comments                                       |
| --------------------- | :-------------: | :----------: | :--------------------------------------------- |
| **top / peek**        | 1               | 1            | Reads the top element, the stack is unchanged  |
