# Multiple Pointers Pattern

The multiple pointers pattern uses two or more pointers that traverse the data structure, usually from different positions or moving at different speeds. This is especially effective on sorted arrays.

## Why this matters

Multiple pointers can reduce time complexity from O(n²) to O(n) by avoiding nested loops. They're particularly powerful for problems involving pairs, searching, or comparing elements in sorted data.

## Core concepts

- **Two or more pointers** - Track positions in the data structure
- **Move pointers conditionally** - Based on some condition or comparison
- **Works best on sorted data** - But can work on unsorted with modifications
- **Single pass** - Usually O(n) time complexity
- **Space efficient** - Often O(1) space complexity

## When to use

- ✅ Sorted arrays
- ✅ Finding pairs that meet a condition
- ✅ Comparing elements from different positions
- ✅ Need to avoid O(n²) nested loops
- ✅ Problem involves "two elements" or "pairs"

## Pattern structure

```typescript
function multiplePointersPattern(arr: ElementType[]): ResultType {
  let left = 0;
  let right = arr.length - 1;
  // or
  let slow = 0;
  let fast = 1;
  
  while (/* condition */) {
    // Compare or process elements at pointer positions
    // Move pointers based on condition
  }
  
  return result;
}
```

## Example 1: areThereDuplicates (Multiple Pointers — Bonus)

**Problem**: Same as frequency counter version — check for duplicates among variable arguments. This version uses sort + adjacent comparison for O(1) space.

**Requirements**: Time O(n log n), Space O(1).

```typescript
function areThereDuplicates(...args: (number | string)[]): boolean {
  args.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
  for (let i = 1; i < args.length; i++) {
    if (args[i] === args[i - 1]) return true;
  }
  return false;
}
```

## Example 2: averagePair

**Problem**: Given a sorted array of integers and a target average, determine if there is a pair of values in the array where the average of the pair equals the target average. There may be more than one pair that matches.

**Requirements**: Time O(n), Space O(1).

```typescript
function averagePair(arr: number[], targetAvg: number): boolean {
  if (arr.length < 2) return false;
  const targetSum = 2 * targetAvg;
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === targetSum) return true;
    if (sum < targetSum) left++;
    else right--;
  }
  return false;
}
```

## Example 3: isSubsequence

**Problem**: Takes two strings and checks whether the characters in the first string form a subsequence of the characters in the second string — i.e. the characters in the first string appear somewhere in the second string without their order changing.

**Requirements**: Time O(n + m), Space O(1).

```typescript
function isSubsequence(str1: string, str2: string): boolean {
  let i = 0;
  let j = 0;
  while (i < str1.length && j < str2.length) {
    if (str1[i] === str2[j]) i++;
    j++;
  }
  return i === str1.length;
}
```

## Example 4: findPair (Frequency Counter / Multiple Pointers)

**Problem**: Given an unsorted array and a number n, find if there exists a pair of elements in the array whose difference is n. Return true if the pair exists, false otherwise.

**Part 1 — Requirements**: Time O(n), Space O(n).

```typescript
function findPair(arr: number[], n: number): boolean {
  const seen = new Set<number>();
  for (const num of arr) {
    if (n === 0 && seen.has(num)) return true;
    if (seen.has(num + n) || seen.has(num - n)) return true;
    seen.add(num);
  }
  return false;
}
```

**Part 2 — Requirements**: Time O(n log n), Space O(1).

```typescript
function findPairTwoPointers(arr: number[], n: number): boolean {
  arr.sort((a, b) => a - b);
  let left = 0;
  let right = 1;
  while (right < arr.length) {
    const diff = arr[right] - arr[left];
    if (diff === n) return true;
    if (diff < n) right++;
    else {
      left++;
      if (left === right) right++;
    }
  }
  return false;
}
```

## Common pitfalls

1. **Not handling empty arrays**: Check length before processing
2. **Off-by-one errors**: Be careful with pointer bounds
3. **Forgetting to move pointers**: Always move at least one pointer in the loop
4. **Not handling duplicates**: May need to skip duplicate values
5. **Assuming sorted input**: For findPair Part 2, sort first; for averagePair / isSubsequence, input is assumed sorted or order matters as specified

## When to use this pattern

- ✅ Sorted arrays (most common)
- ✅ Finding pairs/triplets
- ✅ Comparing elements from different positions
- ✅ Need O(n) instead of O(n²)
- ✅ Space-efficient solutions needed

## Variations

- **Two pointers from ends**: For sorted arrays, pairs (e.g. averagePair)
- **Fast and slow pointers**: For cycle detection, finding middle
- **Combined with frequency counter**: For unsorted arrays (e.g. findPair Part 1)

## Time and space complexity

- **Time**: Usually O(n) for two pointers, O(n log n) when sort is used
- **Space**: Usually O(1) when no extra structure is used
- **Advantage**: Reduces nested loops to a single pass or sort + pass
