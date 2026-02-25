# Problem Solving Strategy

A systematic approach to solving coding problems prevents you from getting stuck and helps you write correct, efficient solutions.

## Why this matters

Jumping straight into coding without understanding the problem leads to bugs, inefficient solutions, and wasted time. Following a structured approach helps you:
- Understand the problem completely before coding
- Break complex problems into manageable pieces
- Write cleaner, more maintainable code
- Avoid common mistakes

## Core concepts

1. **Understand the problem** - Ask questions, clarify edge cases
2. **Break it down** - Identify subproblems and steps
3. **Simplify** - Start with a simpler version, then add complexity
4. **Look back and refactor** - Review your solution, optimize, improve

## Step 1: Understand the Problem

Before writing any code, make sure you fully understand what's being asked.

### Questions to ask:

1. **What are the inputs?**
   - What types? (array, string, number)
   - What are the constraints? (size limits, value ranges)
   - Can inputs be empty? Null? Undefined?

2. **What is the expected output?**
   - What type should it be?
   - What format?
   - Edge cases?

3. **What are the constraints?**
   - Time/space complexity requirements?
   - Can I modify the input?
   - Are there any restrictions?

4. **What are the edge cases?**
   - Empty input
   - Single element
   - All same values
   - Very large input
   - Negative numbers
   - Duplicates

### Example: Understanding a problem

**Problem**: "Write a function that finds the maximum sum of any subarray"

**Questions to clarify**:
- Input: Array of numbers? Can they be negative?
- Output: Just the sum (number) or the subarray itself?
- Constraints: Can the array be empty? What if all numbers are negative?
- Edge cases: Single element, all negatives, all positives

## Step 2: Break It Down

Break the problem into smaller, manageable pieces. Write out the steps in plain English or pseudocode.

### Approach:

1. **Identify the main steps** - What are the high-level operations?
2. **Identify subproblems** - What smaller problems need to be solved?
3. **Think about data structures** - What will help solve this?
4. **Consider patterns** - Does this match a known pattern?

### Example: Breaking down a problem

**Problem**: "Check if two strings are anagrams"

**Breakdown**:
1. Compare lengths - if different, not anagrams
2. Count frequency of each character in first string
3. Count frequency of each character in second string
4. Compare frequencies - if same, anagrams

**Pattern recognition**: This uses frequency counting!

## Step 3: Simplify

Start with the simplest version of the problem, then add complexity.

### Strategy:

1. **Solve a simpler version first**
   - Smaller input size
   - Fewer constraints
   - Basic case only

2. **Add complexity incrementally**
   - Handle edge cases
   - Optimize
   - Add features

3. **Test as you go**
   - Verify simple case works
   - Then test edge cases
   - Then test larger inputs

### Example: Simplifying a problem

**Problem**: "Find the longest substring with unique characters"

**Simplified version first**:
1. Start with: "Check if a substring has unique characters"
2. Then: "Find all substrings and check uniqueness"
3. Finally: "Optimize with sliding window"

## Step 4: Look Back and Refactor

After solving, review your solution and improve it.

### Questions to ask:

1. **Does it work correctly?**
   - Test all edge cases
   - Verify with examples
   - Check for off-by-one errors

2. **Can it be more efficient?**
   - Time complexity optimal?
   - Space complexity optimal?
   - Any unnecessary operations?

3. **Can it be cleaner?**
   - Variable names clear?
   - Logic easy to follow?
   - Can extract helper functions?

4. **Can it be more robust?**
   - Handle edge cases?
   - Input validation?
   - Error handling?

### Refactoring checklist:

- ✅ Remove duplicate code
- ✅ Extract helper functions
- ✅ Improve variable names
- ✅ Add comments for complex logic
- ✅ Optimize time/space complexity
- ✅ Handle edge cases
- ✅ Add input validation

## Example: Complete Problem-Solving Process

**Problem**: "Find all pairs in an array that sum to a target value"

### Step 1: Understand

- **Input**: Array of numbers, target number
- **Output**: Array of pairs (or indices?)
- **Constraints**: Can numbers be negative? Duplicates? Can use same element twice?
- **Edge cases**: Empty array, no pairs found, multiple pairs

### Step 2: Break Down

1. For each number, check if complement (target - number) exists
2. Need fast lookup → use object/map
3. Store seen numbers as we iterate
4. When we find complement, record the pair

**Pattern**: Frequency counter / hash map for fast lookup

### Step 3: Simplify

**Version 1**: Just find if a pair exists (boolean)
```typescript
function hasPair(arr: number[], target: number): boolean {
  const seen = new Set<number>();
  for (const num of arr) {
    const complement = target - num;
    if (seen.has(complement)) return true;
    seen.add(num);
  }
  return false;
}
```

**Version 2**: Find all pairs
```typescript
function findPairs(arr: number[], target: number): [number, number][] {
  const seen = new Map<number, number>(); // value -> index
  const pairs: [number, number][] = [];
  
  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (seen.has(complement)) {
      pairs.push([complement, arr[i]]);
    }
    seen.set(arr[i], i);
  }
  
  return pairs;
}
```

### Step 4: Look Back and Refactor

**Issues to consider**:
- What if we want indices instead of values?
- What if we want unique pairs only?
- What if array has duplicates?

**Refactored version**:
```typescript
function findPairs(
  arr: number[], 
  target: number,
  returnIndices: boolean = false
): [number, number][] | [number, number][] {
  const seen = new Map<number, number>();
  const pairs: [number, number][] = [];
  
  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (seen.has(complement)) {
      if (returnIndices) {
        pairs.push([seen.get(complement)!, i]);
      } else {
        pairs.push([complement, arr[i]]);
      }
    }
    if (!seen.has(arr[i])) { // Only store first occurrence
      seen.set(arr[i], i);
    }
  }
  
  return pairs;
}
```

## Common strategies

### 1. Start with brute force
Get something working first, then optimize. A working O(n²) solution is better than a broken O(n) attempt.

### 2. Use examples
Work through examples manually to understand the pattern:
- Small example: `[1, 2, 3]`, target `4`
- Edge case: `[]`, target `5`
- Duplicates: `[1, 1, 2]`, target `2`

### 3. Draw it out
Visualize the problem:
- Arrays: Draw elements and pointers
- Trees: Draw the tree structure
- Graphs: Draw nodes and edges

### 4. Talk through it
Explain the problem and solution out loud (or write comments). This helps clarify your thinking.

### 5. Pattern recognition
Learn to recognize common patterns:
- Need fast lookup? → Hash map/Set
- Sorted array? → Two pointers or binary search
- Subarrays? → Sliding window
- Recursive structure? → Divide and conquer

## When to use this strategy

- ✅ **Coding interviews** - Shows systematic thinking
- ✅ **Complex problems** - Prevents getting overwhelmed
- ✅ **Learning new problems** - Builds problem-solving skills
- ✅ **Code reviews** - Helps identify issues before coding
- ✅ **Debugging** - Understanding the problem helps find bugs

## Practice tips

1. **Don't skip steps** - Even for easy problems, practice the full process
2. **Time yourself** - But don't rush understanding
3. **Review solutions** - After solving, look at optimal solutions
4. **Solve variations** - Once solved, try similar problems
5. **Explain solutions** - Teaching helps solidify understanding
