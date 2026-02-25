# Frequency Counter Pattern

The frequency counter pattern uses objects or maps to count the frequency of elements. This pattern transforms O(n²) nested loop solutions into O(n) solutions.

## Why this matters

Many problems involve comparing collections or counting occurrences. Using nested loops gives O(n²) complexity, but frequency counters reduce this to O(n) by trading space for time.

## Core concepts

- **Use objects/maps to count frequencies** - Store element → count mappings
- **Trade space for time** - Use O(n) extra space to get O(n) time instead of O(n²)
- **Single pass through data** - Build frequency map in one iteration
- **Compare frequencies** - Instead of nested loops, compare frequency maps

## When to use

- ✅ Comparing two collections (anagrams, same digit frequency, same elements)
- ✅ Counting occurrences (duplicates, frequencies)
- ✅ Need fast lookups instead of nested loops
- ✅ Problem involves "how many times does X appear?"

## Pattern structure

```typescript
function frequencyCounterPattern(arr: ElementType[]): ResultType {
  // Step 1: Build frequency map
  const freq: Record<ElementType, number> = {};
  for (const element of arr) {
    freq[element] = (freq[element] || 0) + 1;
  }
  
  // Step 2: Use frequency map to solve problem
  // (varies by problem)
  
  return result;
}
```

## Example 1: sameFrequency

**Problem**: Given two positive integers, find out if the two numbers have the same frequency of digits.

**Requirements**: Time O(N).

```typescript
function sameFrequency(num1: number, num2: number): boolean {
  const str1 = String(num1);
  const str2 = String(num2);
  if (str1.length !== str2.length) return false;

  const freq1: Record<string, number> = {};
  for (const d of str1) {
    freq1[d] = (freq1[d] || 0) + 1;
  }

  const freq2: Record<string, number> = {};
  for (const d of str2) {
    freq2[d] = (freq2[d] || 0) + 1;
  }

  for (const d in freq1) {
    if (freq1[d] !== freq2[d]) return false;
  }
  return true;
}
```

## Example 2: areThereDuplicates (Frequency Counter)

**Problem**: Accept a variable number of arguments and check whether there are any duplicates among the arguments passed in. Solvable with frequency counter or multiple pointers.

**Requirements**: Time O(n), Space O(n).

```typescript
function areThereDuplicates(...args: (number | string)[]): boolean {
  const freq: Record<string, number> = {};
  for (const x of args) {
    const key = String(x);
    if (freq[key]) return true;
    freq[key] = 1;
  }
  return false;
}
```

## Example 3: findAllDuplicates

**Problem**: Given an array of positive integers, some elements appear twice and others appear once. Find all the elements that appear twice in this array. Return the elements in any order.

**Requirements**: Time O(n).

```typescript
function findAllDuplicates(arr: number[]): number[] {
  const freq: Record<number, number> = {};
  const duplicates: number[] = [];
  for (const num of arr) {
    freq[num] = (freq[num] || 0) + 1;
    if (freq[num] === 2) {
      duplicates.push(num);
    }
  }
  return duplicates;
}
```

## Common pitfalls

1. **Forgetting to initialize counts**: Use `(freq[key] || 0) + 1` pattern
2. **Comparing wrong things**: Make sure you're comparing frequencies, not just existence
3. **Not handling empty inputs**: Check for empty arrays/strings
4. **Type coercion**: Object keys are strings — convert numbers to strings for keys when mixing types (e.g. in areThereDuplicates)

## When to use this pattern

- ✅ Comparing two collections (e.g. digit frequencies)
- ✅ Counting occurrences
- ✅ Finding duplicates
- ✅ Need to avoid O(n²) nested loops

## Time and space complexity

- **Time**: O(n) — single pass through data
- **Space**: O(n) — frequency map storage
- **Trade-off**: Use extra space to reduce time from O(n²) to O(n)
