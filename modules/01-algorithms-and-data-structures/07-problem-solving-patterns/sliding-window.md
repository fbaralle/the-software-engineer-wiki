# Sliding Window Pattern

The sliding window pattern maintains a window (subarray or substring) that "slides" through the data. Instead of recalculating everything for each window position, we efficiently update the window by adding one element and removing another.

## Why this matters

Many problems involve finding optimal subarrays or substrings. Brute force would check every possible window (O(n²) or O(n³)), but sliding window reduces this to O(n) by reusing calculations.

## Core concepts

- **Window**: A contiguous subarray or substring
- **Expand**: Add elements to the right
- **Shrink**: Remove elements from the left
- **Reuse calculations**: Don't recalculate everything, just update
- **Two types**: Fixed-size window or variable-size window

## When to use

- ✅ Subarrays or substrings
- ✅ "Maximum/minimum of consecutive elements"
- ✅ "Longest/shortest subarray that..."
- ✅ Need to avoid recalculating for each window
- ✅ Problem involves "consecutive" or "contiguous"

## Pattern structure

### Fixed-size window
```typescript
function fixedWindow(arr: number[], k: number): ResultType {
  // Initialize window
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  
  let result = windowSum;
  
  // Slide the window
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i]; // Remove left, add right
    result = Math.max(result, windowSum); // Update result
  }
  
  return result;
}
```

### Variable-size window
```typescript
function variableWindow(arr: number[], condition: Function): ResultType {
  let left = 0;
  let right = 0;
  let windowValue = 0;
  let result = 0;
  
  while (right < arr.length) {
    // Expand window
    windowValue += arr[right];
    
    // Shrink window while condition is met
    while (condition(windowValue)) {
      // Update result
      result = Math.max(result, right - left + 1);
      windowValue -= arr[left];
      left++;
    }
    
    right++;
  }
  
  return result;
}
```

## Example 1: Maximum Subarray Sum

**Problem**: Find the maximum sum of any subarray of length k.

**Approach**: Use fixed-size sliding window, update sum by subtracting left element and adding right element.

```typescript
function maxSubarraySum(arr: number[], k: number): number {
  if (arr.length < k) return 0;
  
  // Calculate sum of first window
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  
  let maxSum = windowSum;
  
  // Slide the window
  for (let i = k; i < arr.length; i++) {
    // Remove leftmost element, add new rightmost element
    windowSum = windowSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }
  
  return maxSum;
}

// Time: O(n) - single pass
// Space: O(1)
```

## Example 2: Minimum Subarray Length

**Problem**: Find the length of the smallest subarray with sum >= target.

**Approach**: Use variable-size window, expand until condition met, then shrink while maintaining condition.

```typescript
function minSubArrayLen(arr: number[], target: number): number {
  let left = 0;
  let sum = 0;
  let minLen = Infinity;
  
  for (let right = 0; right < arr.length; right++) {
    // Expand window
    sum += arr[right];
    
    // Shrink window while sum >= target
    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= arr[left];
      left++;
    }
  }
  
  return minLen === Infinity ? 0 : minLen;
}

// Time: O(n) - each element visited at most twice
// Space: O(1)
```

## Example 3: Longest Substring with Unique Characters

**Problem**: Find the length of the longest substring with all unique characters.

**Approach**: Use variable-size window with frequency counter to track characters in window.

```typescript
function findLongestSubstring(str: string): number {
  let left = 0;
  let maxLen = 0;
  const charIndex: Record<string, number> = {}; // character -> last seen index
  
  for (let right = 0; right < str.length; right++) {
    const char = str[right];
    
    // If character seen before and within current window, move left pointer
    if (charIndex[char] !== undefined && charIndex[char] >= left) {
      left = charIndex[char] + 1;
    }
    
    charIndex[char] = right;
    maxLen = Math.max(maxLen, right - left + 1);
  }
  
  return maxLen;
}

// Alternative: Count characters instead of tracking indices
function findLongestSubstringV2(str: string): number {
  let left = 0;
  let maxLen = 0;
  const charCount: Record<string, number> = {};
  
  for (let right = 0; right < str.length; right++) {
    const char = str[right];
    charCount[char] = (charCount[char] || 0) + 1;
    
    // Shrink window if duplicate found
    while (charCount[char] > 1) {
      charCount[str[left]]--;
      left++;
    }
    
    maxLen = Math.max(maxLen, right - left + 1);
  }
  
  return maxLen;
}

// Time: O(n) - each character visited at most twice
// Space: O(min(n, m)) where m is character set size
```

## Example 4: Longest Substring with At Most K Distinct Characters

**Problem**: Find the length of the longest substring with at most k distinct characters.

**Approach**: Variable-size window with frequency counter, shrink when distinct count > k.

```typescript
function longestSubstringKDistinct(str: string, k: number): number {
  let left = 0;
  let maxLen = 0;
  const charCount: Record<string, number> = {};
  let distinctCount = 0;
  
  for (let right = 0; right < str.length; right++) {
    const char = str[right];
    
    // Add character to window
    if (!charCount[char]) {
      distinctCount++;
    }
    charCount[char] = (charCount[char] || 0) + 1;
    
    // Shrink window if too many distinct characters
    while (distinctCount > k) {
      charCount[str[left]]--;
      if (charCount[str[left]] === 0) {
        distinctCount--;
      }
      left++;
    }
    
    maxLen = Math.max(maxLen, right - left + 1);
  }
  
  return maxLen;
}

// Time: O(n)
// Space: O(k) for character count map
```

## Example 5: Average of Subarrays

**Problem**: Find the average of all subarrays of size k.

**Approach**: Fixed-size sliding window, calculate average for each window.

```typescript
function findAverages(arr: number[], k: number): number[] {
  const averages: number[] = [];
  let windowSum = 0;
  
  // Calculate sum of first window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  averages.push(windowSum / k);
  
  // Slide the window
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i];
    averages.push(windowSum / k);
  }
  
  return averages;
}

// Time: O(n)
// Space: O(n) for result array
```

## Common pitfalls

1. **Not initializing window correctly**: Make sure first window is calculated properly
2. **Off-by-one errors**: Be careful with window boundaries (right - left + 1)
3. **Not updating window efficiently**: Don't recalculate entire window, just update
4. **Forgetting to shrink window**: In variable-size, must shrink when condition met
5. **Not handling empty inputs**: Check array/string length

## When to use this pattern

- ✅ Subarrays or substrings
- ✅ Consecutive elements
- ✅ Maximum/minimum of windows
- ✅ Need to avoid O(n²) or O(n³) brute force
- ✅ Problem involves "contiguous" or "consecutive"

## Variations

- **Fixed-size window**: Window size doesn't change
- **Variable-size window**: Window expands/shrinks based on condition
- **Two windows**: Maintain two separate windows
- **With frequency counter**: Track character/element frequencies in window

## Time and space complexity

- **Time**: Usually O(n) - each element visited at most twice
- **Space**: Usually O(1) for fixed window, O(k) for variable window with tracking
- **Advantage**: Reduces O(n²) or O(n³) to O(n)
