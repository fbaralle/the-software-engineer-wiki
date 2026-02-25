# Arrays and Objects Performance

Understanding the performance characteristics of arrays and objects (hash maps) in TypeScript is crucial for choosing the right data structure for your use case.

## Why this matters

Choosing the wrong data structure can turn an O(n) operation into O(n²), causing performance issues at scale. Knowing when arrays are fast vs slow, and when objects are fast vs slow, helps you write efficient code from the start.

## Sections

1. [Arrays Performance](./arrays-performance.md) - Time and space complexity of array operations
2. [Objects Performance](./objects-performance.md) - Time and space complexity of object operations

## Quick reference

### Arrays - Common Operations

| Operation | Time Complexity | Notes |
|-----------|----------------|-------|
| Access by index | O(1) | Fast - direct memory access |
| Search by value | O(n) | Must check each element |
| Insert at end | O(1) amortized | Usually fast, may need resize |
| Insert at beginning | O(n) | Must shift all elements |
| Delete at end | O(1) | Fast |
| Delete at beginning | O(n) | Must shift all elements |
| Slice | O(n) | Creates new array |

### Objects (Hash Maps) - Common Operations

| Operation | Time Complexity | Notes |
|-----------|----------------|-------|
| Access by key | O(1) average | Fast - hash lookup |
| Search by value | O(n) | Must check each value |
| Insert | O(1) average | Fast |
| Delete | O(1) average | Fast |
| Iterate keys/values | O(n) | Must visit all entries |
