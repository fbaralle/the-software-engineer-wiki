/**
 * Big O Notation Examples
 * 
 * This file contains practical TypeScript examples demonstrating
 * time and space complexity analysis.
 */

// ============================================================================
// TIME COMPLEXITY EXAMPLES
// ============================================================================

/**
 * O(1) - Constant Time
 * Runtime doesn't depend on input size
 */
export function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0]; // One operation, regardless of array size
}

export function hashMapLookup<K, V>(map: Map<K, V>, key: K): V | undefined {
  return map.get(key); // Average O(1) lookup
}

/**
 * O(log n) - Logarithmic Time
 * Each step eliminates half the remaining work
 */
export function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
  // Time: O(log n) - each iteration eliminates half the search space
  // Space: O(1) - only using a few variables
}

/**
 * O(n) - Linear Time
 * Runtime grows proportionally with input size
 */
export function findMax(arr: number[]): number {
  if (arr.length === 0) throw new Error("Array is empty");
  
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
  // Time: O(n) - one pass through the array
  // Space: O(1) - only storing one variable
}

export function countOccurrences(arr: number[], target: number): number {
  let count = 0;
  for (const num of arr) {
    if (num === target) count++;
  }
  return count;
  // Time: O(n) - must check every element
  // Space: O(1) - only one counter variable
}

/**
 * O(n log n) - Linearithmic Time
 * Common for efficient sorting algorithms
 */
export function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
  // Time: O(n log n) - divide and conquer with O(n) merge at each level
  // Space: O(n) - creating new arrays at each level
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  
  return result.concat(left.slice(i)).concat(right.slice(j));
}

/**
 * O(n²) - Quadratic Time
 * For each element, process all other elements
 */
export function findDuplicates(arr: number[]): number[] {
  const duplicates: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j] && !duplicates.includes(arr[i])) {
        duplicates.push(arr[i]);
      }
    }
  }
  return duplicates;
  // Time: O(n²) - nested loops comparing all pairs
  // Space: O(n) worst case - storing duplicates
}

export function bubbleSort(arr: number[]): number[] {
  const sorted = [...arr]; // O(n) space
  const n = sorted.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (sorted[j] > sorted[j + 1]) {
        // Swap
        [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
      }
    }
  }
  return sorted;
  // Time: O(n²) - nested loops
  // Space: O(n) - copying the array
}

/**
 * O(2ⁿ) - Exponential Time
 * Runtime doubles with each additional input element
 */
export function fibonacciNaive(n: number): number {
  if (n <= 1) return n;
  return fibonacciNaive(n - 1) + fibonacciNaive(n - 2);
  // Time: O(2ⁿ) - each call makes two more calls
  // Space: O(n) - maximum depth of recursion stack
}

// Optimized version using memoization
export function fibonacciMemoized(n: number, memo: Map<number, number> = new Map()): number {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n)!;
  
  const result = fibonacciMemoized(n - 1, memo) + fibonacciMemoized(n - 2, memo);
  memo.set(n, result);
  return result;
  // Time: O(n) - each number calculated once
  // Space: O(n) - memo map + recursion stack
}

// ============================================================================
// SPACE COMPLEXITY EXAMPLES
// ============================================================================

/**
 * O(1) - Constant Space
 * Memory usage doesn't depend on input size
 */
export function swapElements<T>(arr: T[], i: number, j: number): void {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  // Space: O(1) - only one temporary variable
}

export function reverseArrayInPlace<T>(arr: T[]): void {
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
  // Space: O(1) - only using a few variables, modifying input directly
}

/**
 * O(log n) - Logarithmic Space
 * Usually from recursion depth
 */
export function binarySearchRecursive(
  arr: number[],
  target: number,
  left: number = 0,
  right: number = arr.length - 1
): number {
  if (left > right) return -1;
  
  const mid = Math.floor((left + right) / 2);
  if (arr[mid] === target) return mid;
  
  if (arr[mid] < target) {
    return binarySearchRecursive(arr, target, mid + 1, right);
  } else {
    return binarySearchRecursive(arr, target, left, mid - 1);
  }
  // Space: O(log n) - maximum recursion depth is log n
}

/**
 * O(n) - Linear Space
 * Memory grows proportionally with input size
 */
export function copyArray<T>(arr: T[]): T[] {
  return [...arr];
  // Space: O(n) - creating a new array of size n
}

export function filterEvenNumbers(arr: number[]): number[] {
  const evens: number[] = [];
  for (const num of arr) {
    if (num % 2 === 0) {
      evens.push(num);
    }
  }
  return evens;
  // Space: O(n) worst case - if all numbers are even
}

export function createFrequencyMap(arr: number[]): Map<number, number> {
  const freq = new Map<number, number>();
  for (const num of arr) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }
  return freq;
  // Space: O(n) - storing up to n unique keys
}

/**
 * O(n²) - Quadratic Space
 * Storing all pairs or a 2D structure
 */
export function getAllPairs<T>(arr: T[]): [T, T][] {
  const pairs: [T, T][] = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      pairs.push([arr[i], arr[j]]);
    }
  }
  return pairs;
  // Space: O(n²) - storing n(n-1)/2 ≈ n² pairs
}

export function createAdjacencyMatrix(n: number): number[][] {
  const matrix: number[][] = [];
  for (let i = 0; i < n; i++) {
    matrix[i] = new Array(n).fill(0);
  }
  return matrix;
  // Space: O(n²) - n×n matrix
}

// ============================================================================
// COMPLEXITY ANALYSIS PRACTICE
// ============================================================================

/**
 * Analyze this function's time and space complexity
 * 
 * Time: O(n²) - nested loops
 * Space: O(n) - storing results array
 */
export function findPairsWithSum(arr: number[], target: number): [number, number][] {
  const pairs: [number, number][] = [];
  
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        pairs.push([arr[i], arr[j]]);
      }
    }
  }
  
  return pairs;
}

/**
 * Optimized version using hash map
 * 
 * Time: O(n) - single pass through array
 * Space: O(n) - hash map storage
 */
export function findPairsWithSumOptimized(arr: number[], target: number): [number, number][] {
  const pairs: [number, number][] = [];
  const seen = new Map<number, number>(); // value -> index
  
  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (seen.has(complement)) {
      pairs.push([complement, arr[i]]);
    }
    seen.set(arr[i], i);
  }
  
  return pairs;
}

/**
 * Example showing how to count operations
 * 
 * Operations breakdown:
 * - Initialization: O(1)
 * - Outer loop: runs n times
 * - Inner loop: runs n times per outer iteration = n² total
 * - Operations inside inner loop: O(1) each
 * - Total: O(1) + O(n²) × O(1) = O(n²)
 */
export function countOperationsExample(n: number): number {
  let count = 0;                    // O(1) - one operation
  
  for (let i = 0; i < n; i++) {    // O(n) iterations
    for (let j = 0; j < n; j++) {  // O(n) iterations per i = O(n²) total
      count++;                      // O(1) per iteration
    }
  }
  
  return count;                     // O(1) - one operation
  // Total time: O(1) + O(n²) + O(1) = O(n²)
  // Total space: O(1) - only one variable
}
