# Divide and Conquer Pattern

Divide and conquer breaks a problem into smaller subproblems, solves them recursively, and combines the results. It's particularly powerful for problems involving sorted data or recursive structures.

## Why this matters

Divide and conquer can reduce time complexity significantly (e.g. O(n) to O(log n)) by eliminating large portions of the search space at each step. It's the foundation for many efficient algorithms like binary search.

## Core concepts

- **Divide**: Break problem into smaller subproblems
- **Conquer**: Solve subproblems recursively (or directly if small enough)
- **Combine**: Merge solutions of subproblems into solution for original problem
- **Base case**: Handle smallest subproblem directly
- **Works best on sorted data**: Can eliminate half the search space

## When to use

- ✅ Sorted arrays (including rotated sorted)
- ✅ Problems that can be split into similar subproblems
- ✅ Need O(log n) or O(n log n) solutions
- ✅ Problem involves "find in sorted array" or "count in sorted array"

## Pattern structure

```typescript
function divideAndConquer(arr: ElementType[], ...args): ResultType {
  // Base case: solve directly for small inputs
  if (arr.length <= 1) {
    return baseCaseSolution(arr);
  }
  
  // Divide: split into smaller subproblems
  const mid = Math.floor(arr.length / 2);
  const left = divideAndConquer(arr.slice(0, mid), ...args);
  const right = divideAndConquer(arr.slice(mid), ...args);
  
  // Combine: merge solutions
  return combine(left, right);
}
```

## Example 1: findRotatedIndex

**Problem**: Accept a rotated array of sorted numbers and an integer. Return the index of the integer in the array. If the value is not found, return -1.

**What is a rotated array?**

A rotated array is formed by taking a sorted array and "rotating" it at a pivot point. The ordering remains, but the start of the array shifts.

**Examples of rotated arrays:**

- `[4, 5, 6, 7, 0, 1, 2]` &nbsp;&nbsp;&nbsp;&nbsp;// was `[0, 1, 2, 4, 5, 6, 7]`, rotated at `7`
- `[30, 40, 50, 5, 10, 20]` &nbsp;// was `[5, 10, 20, 30, 40, 50]`, rotated at `50`
- `[2, 3, 4, 5, 1]` &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// was `[1, 2, 3, 4, 5]`, rotated at `5`

Your function should efficiently find the index of a given integer within such an array.

**Requirements**: Time O(log n), Space O(1).

```typescript
function findRotatedIndex(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // Found the target value at mid
    if (arr[mid] === target) return mid;

    // Determine if the left half is normally ordered (not rotated)
    if (arr[left] <= arr[mid]) {
      // Target is within the properly ordered left half
      if (target >= arr[left] && target < arr[mid]) {
        right = mid - 1;
      } else {
        // Target is either not in left half or in the rotated right half
        left = mid + 1;
      }
    } else {
      // Otherwise, the right half must be ordered (left half is rotated)
      // Check if target is within the ordered right half
      if (target > arr[mid] && target <= arr[right]) {
        left = mid + 1;
      } else {
        // Target is either not in right half or in the rotated left half
        right = mid - 1;
      }
    }
  }

  return -1;
}
```

## Example 2: sortedFrequency

**Problem**: Given a sorted array and a number, count the occurrences of the number in the array. Return -1 if the number is not in the array.

**Requirements**: Time O(log n).

```typescript
function sortedFrequency(arr: number[], target: number): number {
  const firstIndex = findFirst(arr, target);
  if (firstIndex === -1) return -1;
  const lastIndex = findLast(arr, target);
  return lastIndex - firstIndex + 1;
}

function findFirst(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;
  let firstIndex = -1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      firstIndex = mid;
      right = mid - 1;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return firstIndex;
}

function findLast(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;
  let lastIndex = -1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      lastIndex = mid;
      left = mid + 1;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return lastIndex;
}
```

## Example 3: countZeroes

**Problem**: Given an array of 1s and 0s which has all 1s first followed by all 0s, return the number of zeroes in the array.

**Requirements**: Time O(log n).

```typescript
function countZeroes(arr: number[]): number {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === 0) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return arr.length - left;
}
```

## Common pitfalls

1. **Incorrect base case**: Make sure base case handles smallest input correctly
2. **Off-by-one errors**: Be careful with array indices and mid calculations
3. **Not eliminating search space**: Each step should eliminate a significant portion
4. **Infinite recursion**: Ensure recursive calls approach base case
5. **Wrong return for "not found"**: sortedFrequency returns -1 when target is not present

## When to use this pattern

- ✅ Sorted arrays (including rotated)
- ✅ Problems that can be split into similar subproblems
- ✅ Need O(log n) solutions
- ✅ Binary search problems
- ✅ Problems involving "find in sorted" or "count in sorted"

## Variations

- **Binary search**: Eliminate half at each step
- **Find first/last**: Two binary searches for frequency
- **Rotated array**: Compare with both ends to decide which half is sorted

## Time and space complexity

- **Time**: O(log n) for search/count in sorted data
- **Space**: O(1) for iterative implementations
- **Advantage**: Reduces problem size exponentially at each step
