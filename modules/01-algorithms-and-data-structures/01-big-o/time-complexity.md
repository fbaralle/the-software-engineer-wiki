# Time Complexity

## Why this matters

Time complexity tells you how your algorithm's runtime grows as input size increases. In production, this is the difference between a feature that works smoothly with 1000 users and one that crashes with 10,000. Understanding Big O helps you:
- Choose the right algorithm for the problem
- Identify performance bottlenecks before they become critical
- Communicate trade-offs to your team
- Pass technical interviews

## Core concepts

- **Big O notation**: Describes the worst-case growth rate of an algorithm
- **Input size (n)**: Usually the number of elements you're processing
- **Operations**: Any step that takes time (comparisons, assignments, function calls)
- **Constants don't matter**: O(2n) = O(n), O(5) = O(1)
- **Lower-order terms don't matter**: O(n² + n) = O(n²)
- **Focus on the dominant term**: The part that grows fastest as n increases

## Mental model

Think of Big O as answering: "If I double the input size, how much longer does this take?"

- **O(1)**: Same time, no matter what (like looking up a value in a hash map)
- **O(n)**: Double the input = double the time (like scanning an array)
- **O(n²)**: Double the input = 4x the time (like nested loops comparing all pairs)
- **O(log n)**: Double the input = just one more step (like binary search)

## How to count operations

### Step 1: Identify the input size
What grows? Usually `n` = array length, number of nodes, etc.



### Step 2: Count operations in terms of n
- **Constant operations**: O(1) - happen a fixed number of times
  - Variable assignments: `let x = 5`
  - Arithmetic: `x + y`
  - Array access: `arr[0]`
  - Object property access: `obj.key`

- **Linear operations**: O(n) - happen once per element
  - Single loop: `for (let i = 0; i < n; i++)`
  - Array methods: `.forEach()`, `.map()`, `.filter()`

- **Nested loops**: O(n²) - for each element, visit all others
  - Two nested loops: `for (let i = 0; i < n; i++) { for (let j = 0; j < n; j++) }`

- **Logarithmic operations**: O(log n) - divide the problem in half each time
  - Binary search
  - Balanced tree operations

### Step 3: Simplify the expression
- Drop constants: O(2n) → O(n)
- Drop lower-order terms: O(n² + n + 5) → O(n²)
- Keep only the dominant term

### Step 4: Visualize complexity
```
n = 10      n = 100     n = 1000
─────────────────────────────────
O(1)        1           1           1
O(log n)    3           7           10
O(n)        10          100         1000
O(n log n)  30          700         10000
O(n²)       100         10000       1000000
O(2ⁿ)       1024        1.27e30     (huge!)
```

## Common time complexities

### O(1) - Constant Time
**What it means**: Runtime doesn't depend on input size.

**Example operations**:
- Array access by index: `arr[5]`
- Hash map lookup: `map.get(key)`
- Object property access: `obj.name`

**Visualization**: Flat line - always takes the same time.

### O(log n) - Logarithmic Time
**What it means**: Each step eliminates half the remaining work.

**Example algorithms**:
- Binary search in sorted array
- Finding element in balanced binary search tree
- Divide-and-conquer algorithms (when they split in half)

**Visualization**: Very slow growth - even with 1 million items, only ~20 steps.

### O(n) - Linear Time
**What it means**: Runtime grows proportionally with input size.

**Example operations**:
- Iterating through an array once
- Finding max/min in unsorted array
- Counting elements

**Visualization**: Straight diagonal line - double input = double time.

### O(n log n) - Linearithmic Time
**What it means**: Common for efficient sorting algorithms.

**Example algorithms**:
- Merge sort
- Heap sort
- Quick sort (average case)

**Visualization**: Between linear and quadratic - grows faster than O(n) but much slower than O(n²).

### O(n²) - Quadratic Time
**What it means**: For each element, you process all other elements.

**Example operations**:
- Nested loops comparing all pairs
- Bubble sort, insertion sort, selection sort
- Checking all pairs in an array

**Visualization**: Steep curve - double input = 4x time.

### O(2ⁿ) - Exponential Time
**What it means**: Runtime doubles with each additional input element.

**Example algorithms**:
- Recursive Fibonacci (naive implementation)
- Generating all subsets of a set
- Brute-force solutions to some problems

**Visualization**: Extremely steep - becomes impractical quickly.

## Common pitfalls

1. **Confusing best/average/worst case**: Big O describes worst case. Quick sort is O(n²) worst case but O(n log n) average case.

2. **Counting operations incorrectly**: 
   - ❌ "This loop runs n times, so it's O(n)" - but if each iteration does O(n) work, it's O(n²)
   - ✅ Count the total work: loops × work per iteration

3. **Ignoring hidden operations**: 
   - Array methods like `.splice()` or `.shift()` can be O(n) because they shift elements
   - String concatenation in loops can be O(n²) if not done carefully

4. **Thinking constants matter**: O(100n) is still O(n). Constants only matter when comparing algorithms with the same Big O.

5. **Forgetting space complexity**: Fast algorithms sometimes use more memory.

## Example (TypeScript)

```typescript
// O(1) - Constant time
function getFirst(arr: number[]): number {
  return arr[0]; // One operation, regardless of array size
}

// O(n) - Linear time
function findMax(arr: number[]): number {
  let max = arr[0];           // O(1)
  for (let i = 1; i < arr.length; i++) { // O(n) iterations
    if (arr[i] > max) {       // O(1) per iteration
      max = arr[i];           // O(1) per iteration
    }
  }
  return max;                  // O(1)
  // Total: O(1) + O(n) × O(1) + O(1) = O(n)
}

// O(n²) - Quadratic time
function findDuplicates(arr: number[]): number[] {
  const duplicates: number[] = [];           // O(1)
  for (let i = 0; i < arr.length; i++) {   // O(n) iterations
    for (let j = i + 1; j < arr.length; j++) { // O(n) iterations per i
      if (arr[i] === arr[j]) {              // O(1)
        duplicates.push(arr[i]);            // O(1)
      }
    }
  }
  return duplicates;
  // Total: O(n) × O(n) × O(1) = O(n²)
}

// O(log n) - Logarithmic time
function binarySearch(arr: number[], target: number): number {
  let left = 0;                              // O(1)
  let right = arr.length - 1;                 // O(1)
  
  while (left <= right) {                    // O(log n) iterations
    const mid = Math.floor((left + right) / 2); // O(1)
    if (arr[mid] === target) return mid;     // O(1)
    if (arr[mid] < target) {
      left = mid + 1;                        // O(1)
    } else {
      right = mid - 1;                       // O(1)
    }
  }
  return -1;
  // Each iteration eliminates half the search space
  // Total: O(log n)
}

// O(n log n) - Linearithmic time
function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;          // O(1)
  
  const mid = Math.floor(arr.length / 2);   // O(1)
  const left = mergeSort(arr.slice(0, mid));    // O(n/2 log(n/2))
  const right = mergeSort(arr.slice(mid));      // O(n/2 log(n/2))
  
  return merge(left, right);                // O(n)
  // Total: O(n log n)
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) { // O(n) total
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
}
```

## When to use this

- **Before writing code**: Think about the input size. Will it grow? How much?
- **During code review**: Spot nested loops and ask "Is this necessary?"
- **When optimizing**: Measure first, but use Big O to guide where to look
- **In interviews**: Explain your approach's complexity and trade-offs
- **Choosing data structures**: 
  - Need fast lookup? Use hash map (O(1)) not array (O(n))
  - Need sorted data? Consider binary search tree (O(log n)) vs sorted array (O(log n) search, O(n) insert)

## Rare cases (mentioned but not detailed)

- **O(n!)**: Factorial time - generating all permutations
- **O(nᵏ)**: Polynomial time where k > 2 - some graph algorithms
- **O(√n)**: Square root time - checking primes up to √n
- **Amortized analysis**: Average case over a sequence of operations (like dynamic arrays)
- **Average vs worst case**: Some algorithms have different complexities for average vs worst case
