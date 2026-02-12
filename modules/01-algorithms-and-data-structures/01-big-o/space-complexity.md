# Space Complexity

## Why this matters

Space complexity measures how much memory your algorithm uses as input size grows. In production, this determines:
- Whether your service can handle large datasets without running out of memory
- How many concurrent requests your server can handle
- Whether your mobile app crashes on low-end devices
- The cost of running your algorithm at scale

Memory is often cheaper than time, but not always. Understanding space complexity helps you make informed trade-offs.

## Core concepts

- **Auxiliary space**: Extra space used beyond the input (what we usually care about)
- **Total space**: Input space + auxiliary space
- **In-place algorithms**: Use O(1) auxiliary space (modify input directly)
- **Space-time trade-off**: Sometimes use more space to save time (caching, memoization)
- **Same simplification rules**: O(2n) = O(n), drop constants and lower-order terms

## Mental model

Think of space complexity as: "If I double the input size, how much more memory do I need?"

- **O(1)**: Same memory, no matter what (like swapping two variables)
- **O(n)**: Double the input = double the memory (like copying an array)
- **O(n²)**: Double the input = 4x the memory (like storing all pairs in a matrix)

## How to count space

### Step 1: Identify what uses memory
- Variables
- Data structures (arrays, objects, stacks, queues)
- Function call stack (recursion)
- Input/output (usually not counted in auxiliary space)

### Step 2: Count space in terms of n
- **Constant space**: O(1) - fixed number of variables
  - `let x = 5`
  - `let temp = arr[0]`
  - A few variables regardless of input size

- **Linear space**: O(n) - grows with input
  - Copying an array: `const copy = [...arr]`
  - Storing n elements: `const result = []`
  - Hash map with n key-value pairs

- **Quadratic space**: O(n²) - storing all pairs
  - Matrix: `const matrix = new Array(n).fill(null).map(() => new Array(n))`
  - Storing all pairs: `const pairs = []` where you add n² pairs

- **Logarithmic space**: O(log n) - recursion depth
  - Binary search recursion
  - Balanced tree traversal

### Step 3: Simplify (same as time complexity)
- Drop constants: O(2n) → O(n)
- Drop lower-order terms: O(n² + n) → O(n²)

## Common space complexities

### O(1) - Constant Space
**What it means**: Memory usage doesn't depend on input size.

**Example operations**:
- Swapping two variables
- Finding max/min in an array (just storing one value)
- In-place array modifications

**Visualization**: Flat line - always uses the same memory.

### O(log n) - Logarithmic Space
**What it means**: Usually from recursion depth in divide-and-conquer algorithms.

**Example algorithms**:
- Binary search (recursive)
- Balanced tree traversal (recursive)
- Quicksort (recursive, best case)

**Visualization**: Very slow growth - even with 1 million items, only ~20 stack frames.

### O(n) - Linear Space
**What it means**: Memory grows proportionally with input size.

**Example operations**:
- Copying an array
- Storing results in a new array
- Hash map with n elements
- Queue/stack that can hold up to n elements

**Visualization**: Straight diagonal line - double input = double memory.

### O(n log n) - Linearithmic Space
**What it means**: Common for recursive algorithms that create new arrays.

**Example algorithms**:
- Merge sort (creates new arrays at each level)
- Some divide-and-conquer algorithms

**Visualization**: Between linear and quadratic.

### O(n²) - Quadratic Space
**What it means**: Storing all pairs or a 2D structure.

**Example operations**:
- Creating an n×n matrix
- Storing all pairs from an array
- Adjacency matrix for a graph

**Visualization**: Steep curve - double input = 4x memory.

## Common pitfalls

1. **Confusing input space with auxiliary space**: 
   - Input space is usually not counted (it's given)
   - Focus on extra space your algorithm uses

2. **Forgetting recursion stack**: 
   - Each recursive call uses stack space
   - Depth of recursion matters: O(n) depth = O(n) space

3. **Ignoring data structure overhead**: 
   - Hash maps have overhead beyond just storing values
   - Usually still O(n) but with a larger constant factor

4. **Not considering space-time trade-offs**: 
   - Sometimes O(n) space can reduce time from O(n²) to O(n)
   - Example: Hash map for O(1) lookups vs O(n) array search

5. **In-place vs new data structures**: 
   - In-place: O(1) space but modifies input
   - New structure: O(n) space but preserves input

## Example (TypeScript)

```typescript
// O(1) - Constant space
function swap(arr: number[], i: number, j: number): void {
  const temp = arr[i];  // O(1) - one variable
  arr[i] = arr[j];      // O(1)
  arr[j] = temp;        // O(1)
  // Total: O(1) auxiliary space
}

function findMax(arr: number[]): number {
  let max = arr[0];     // O(1) - one variable
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];     // Still O(1) - just updating one variable
    }
  }
  return max;
  // Total: O(1) auxiliary space
}

// O(n) - Linear space
function copyArray(arr: number[]): number[] {
  const copy: number[] = [];           // O(n) - new array
  for (let i = 0; i < arr.length; i++) {
    copy.push(arr[i]);                 // O(n) elements
  }
  return copy;
  // Total: O(n) auxiliary space
}

function createFrequencyMap(arr: number[]): Map<number, number> {
  const freq = new Map<number, number>(); // O(n) - up to n keys
  for (const num of arr) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }
  return freq;
  // Total: O(n) auxiliary space
}

// O(log n) - Logarithmic space (from recursion)
function binarySearchRecursive(
  arr: number[], 
  target: number, 
  left: number = 0, 
  right: number = arr.length - 1
): number {
  if (left > right) return -1;         // O(1)
  
  const mid = Math.floor((left + right) / 2); // O(1)
  if (arr[mid] === target) return mid; // O(1)
  
  if (arr[mid] < target) {
    return binarySearchRecursive(arr, target, mid + 1, right); // Recursive call
  } else {
    return binarySearchRecursive(arr, target, left, mid - 1);  // Recursive call
  }
  // Maximum depth: O(log n) - each call eliminates half
  // Total: O(log n) space (call stack)
}

// O(n) - Linear space (from recursion depth)
function factorialRecursive(n: number): number {
  if (n <= 1) return 1;                // O(1)
  return n * factorialRecursive(n - 1); // O(n) recursive calls
  // Total: O(n) space (call stack depth = n)
}

// O(n) - Linear space (storing results)
function getEvenNumbers(arr: number[]): number[] {
  const evens: number[] = [];           // O(n) worst case (all even)
  for (const num of arr) {
    if (num % 2 === 0) {
      evens.push(num);                  // Up to n elements
    }
  }
  return evens;
  // Total: O(n) auxiliary space
}

// O(n²) - Quadratic space
function getAllPairs(arr: number[]): [number, number][] {
  const pairs: [number, number][] = []; // O(n²) - n² pairs
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      pairs.push([arr[i], arr[j]]);    // n(n-1)/2 ≈ n² pairs
    }
  }
  return pairs;
  // Total: O(n²) auxiliary space
}

function createMatrix(n: number): number[][] {
  const matrix: number[][] = [];        // O(n²) - n×n matrix
  for (let i = 0; i < n; i++) {
    matrix[i] = new Array(n).fill(0);  // n rows × n columns
  }
  return matrix;
  // Total: O(n²) auxiliary space
}

// O(n log n) - Linearithmic space (merge sort)
function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;     // O(1)
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));   // O(n/2 log(n/2)) space
  const right = mergeSort(arr.slice(mid));     // O(n/2 log(n/2)) space
  
  return merge(left, right);           // O(n) for merge
  // Total: O(n log n) space
  // Each level creates O(n) space, and there are O(log n) levels
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];         // O(n) - combined size
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    result.push(left[i] < right[j] ? left[i++] : right[j++]);
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
}
```

## When to use this

- **Memory-constrained environments**: Mobile apps, embedded systems, edge computing
- **Large datasets**: When input size could be millions or billions
- **Concurrent systems**: Each request uses memory - more efficient = more concurrent users
- **Cost optimization**: Cloud services charge for memory usage
- **Choosing algorithms**: 
  - Merge sort: O(n log n) time, O(n) space
  - Quick sort: O(n log n) time average, O(log n) space
  - Heap sort: O(n log n) time, O(1) space
- **Space-time trade-offs**: 
  - Use hash map (O(n) space) for O(1) lookups instead of O(n) array search
  - Memoization: Use O(n) space to reduce time from O(2ⁿ) to O(n)

## Rare cases (mentioned but not detailed)

- **O(n!)**: Storing all permutations
- **O(2ⁿ)**: Storing all subsets (power set)
- **Amortized space**: Average space over a sequence of operations
- **Input space vs auxiliary space**: Sometimes input space matters (streaming algorithms)
- **Space complexity of data structures**: Some structures have inherent space overhead
