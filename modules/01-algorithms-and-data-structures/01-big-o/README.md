# Big O Notation

Big O notation describes how algorithms scale as input size grows. It's the foundation for understanding algorithm efficiency and making informed decisions about which approach to use.

## Why this matters

In production systems, understanding Big O helps you:
- Choose algorithms that scale with your data size
- Identify performance bottlenecks before they become critical
- Communicate trade-offs to your team
- Pass technical interviews with confidence

## Sections

1. [Time Complexity](./time-complexity.md) - How runtime grows with input size
2. [Space Complexity](./space-complexity.md) - How memory usage grows with input size
3. [Examples](./examples.ts) - TypeScript code examples demonstrating complexity analysis

## Quick reference

### Common Time Complexities

| Complexity | Name | Example | Growth Rate |
|------------|------|---------|-------------|
| O(1) | Constant | Array access, hash map lookup | No growth |
| O(log n) | Logarithmic | Binary search | Very slow growth |
| O(n) | Linear | Iterating through array | Proportional growth |
| O(n log n) | Linearithmic | Merge sort, heap sort | Between linear and quadratic |
| O(n²) | Quadratic | Nested loops, bubble sort | Double input = 4x time |
| O(2ⁿ) | Exponential | Naive Fibonacci | Extremely fast growth |

### Common Space Complexities

| Complexity | Name | Example | Growth Rate |
|------------|------|---------|-------------|
| O(1) | Constant | Swapping variables | No growth |
| O(log n) | Logarithmic | Recursive binary search | Very slow growth |
| O(n) | Linear | Copying array, hash map | Proportional growth |
| O(n²) | Quadratic | Storing all pairs, matrix | Double input = 4x memory |

## How to analyze complexity

1. **Identify input size** (usually `n`)
2. **Count operations** in terms of `n`
3. **Simplify** by dropping constants and lower-order terms
4. **Visualize** how it scales

## Key principles

- **Constants don't matter**: O(2n) = O(n)
- **Lower-order terms don't matter**: O(n² + n) = O(n²)
- **Focus on worst case**: Big O describes worst-case performance
- **Count total work**: Loops × work per iteration

## Next steps

Start with [Time Complexity](./time-complexity.md) to learn how to count operations and analyze runtime, then move to [Space Complexity](./space-complexity.md) to understand memory usage patterns.
