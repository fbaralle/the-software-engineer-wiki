# Arrays Performance in TypeScript

Arrays in TypeScript are dynamic arrays that can grow and shrink. Understanding their performance characteristics helps you write efficient code.

## Why this matters

Arrays are the most common data structure, but their performance varies dramatically depending on which operation you're performing. Using the wrong operation can turn a fast algorithm into a slow one.

## Core concepts

- **Arrays are stored contiguously in memory** - this enables O(1) index access
- **Dynamic arrays resize** - when full, they allocate a larger chunk and copy elements
- **Operations at the end are fast** - O(1) amortized
- **Operations at the beginning are slow** - O(n) because elements must shift
- **Searching requires iteration** - O(n) worst case

## Big O Complexity

### Access Operations

**Access by index: O(1)**
Arrays provide direct access to any element by its index. The computer knows exactly where the element is in memory.

```typescript
const arr = [10, 20, 30, 40, 50];
const value = arr[2]; // O(1) - instant access
```

**Search by value: O(n)**
To find an element by value, you must check each element until you find it (worst case).

```typescript
function findIndex(arr: number[], target: number): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i; // O(n) - may need to check all elements
  }
  return -1;
}
```

### Insert Operations

**Insert at end (push): O(1) amortized**
Adding to the end is usually O(1), but occasionally O(n) when the array needs to resize. On average, it's O(1).

```typescript
const arr = [1, 2, 3];
arr.push(4); // O(1) amortized - usually fast, occasionally needs resize
```

**Insert at beginning (unshift): O(n)**
Adding to the beginning requires shifting all existing elements one position to the right.

```typescript
const arr = [2, 3, 4];
arr.unshift(1); // O(n) - must shift all 3 elements
// Result: [1, 2, 3, 4]
```

**Insert at specific index (splice): O(n)**
Inserting at any position requires shifting elements. The closer to the beginning, the more elements need to shift.

```typescript
const arr = [1, 2, 4, 5];
arr.splice(2, 0, 3); // O(n) - inserts 3 at index 2, shifts elements after
// Result: [1, 2, 3, 4, 5]
```

### Delete Operations

**Delete at end (pop): O(1)**
Removing from the end is fast - no shifting needed.

```typescript
const arr = [1, 2, 3, 4];
arr.pop(); // O(1) - removes last element, no shifting
// Result: [1, 2, 3]
```

**Delete at beginning (shift): O(n)**
Removing from the beginning requires shifting all remaining elements one position to the left.

```typescript
const arr = [1, 2, 3, 4];
arr.shift(); // O(n) - must shift all 3 remaining elements
// Result: [2, 3, 4]
```

**Delete at specific index (splice): O(n)**
Deleting at any position requires shifting elements. The closer to the beginning, the more elements need to shift.

```typescript
const arr = [1, 2, 3, 4, 5];
arr.splice(2, 1); // O(n) - removes element at index 2, shifts remaining
// Result: [1, 2, 4, 5]
```

### Other Operations

**Slice: O(n)**
Creates a new array containing a portion of the original. Must copy all elements in the slice.

```typescript
const arr = [1, 2, 3, 4, 5];
const slice = arr.slice(1, 4); // O(n) - creates new array [2, 3, 4]
```

**Concat: O(n + m)**
Creates a new array by combining two arrays. Must copy all elements from both.

```typescript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = arr1.concat(arr2); // O(n + m) - copies all elements
```

**Includes/IndexOf: O(n)**
Must check each element until found or end of array.

```typescript
const arr = [1, 2, 3, 4, 5];
arr.includes(3); // O(n) - checks elements until found
arr.indexOf(3); // O(n) - checks elements until found
```

## When arrays are fast

✅ **Accessing elements by index** - O(1) direct access
```typescript
const users = ['Alice', 'Bob', 'Charlie'];
const firstUser = users[0]; // O(1) - instant
```

✅ **Adding/removing at the end** - O(1) amortized
```typescript
const stack: number[] = [];
stack.push(1); // O(1) - fast
stack.push(2); // O(1) - fast
stack.pop();   // O(1) - fast
```

✅ **Iterating through elements** - O(n) but efficient
```typescript
const numbers = [1, 2, 3, 4, 5];
for (const num of numbers) {
  console.log(num); // O(n) - one pass through
}
```

## When arrays are slow

❌ **Searching for a value** - O(n) worst case
```typescript
// Slow: O(n) search
function hasValue(arr: number[], target: number): boolean {
  return arr.includes(target); // O(n) - checks every element
}

// Better: Use Set or Map for O(1) lookup
const numSet = new Set([1, 2, 3, 4, 5]);
numSet.has(3); // O(1) - instant lookup
```

❌ **Inserting/deleting at the beginning** - O(n) due to shifting
```typescript
// Slow: O(n) per operation
const queue: number[] = [];
queue.unshift(1); // O(n) - shifts all elements
queue.unshift(2); // O(n) - shifts all elements again
queue.shift();    // O(n) - shifts all elements

// Better: Use a proper Queue data structure or reverse array
```

❌ **Frequent insertions/deletions in the middle** - O(n) per operation
```typescript
// Slow: O(n) per insertion
const arr = [1, 2, 4, 5];
arr.splice(2, 0, 3); // O(n) - shifts elements

// Consider: Linked list if frequent middle insertions needed
```

## Common pitfalls

1. **Using includes() in a loop**: Creates O(n²) complexity
```typescript
// ❌ Bad: O(n²)
function removeDuplicates(arr: number[]): number[] {
  const result: number[] = [];
  for (const num of arr) {
    if (!result.includes(num)) { // O(n) inside O(n) loop
      result.push(num);
    }
  }
  return result;
}

// ✅ Good: O(n)
function removeDuplicates(arr: number[]): number[] {
  const seen = new Set<number>();
  const result: number[] = [];
  for (const num of arr) {
    if (!seen.has(num)) { // O(1) lookup
      seen.add(num);
      result.push(num);
    }
  }
  return result;
}
```

2. **Using shift()/unshift() for queue operations**: O(n) per operation
```typescript
// ❌ Bad: O(n) per operation
const queue: number[] = [];
queue.unshift(1); // O(n)
queue.unshift(2); // O(n)
queue.shift();    // O(n)

// ✅ Good: Use array as stack (push/pop) or implement proper queue
const queue: number[] = [];
queue.push(1);  // O(1)
queue.push(2);  // O(1)
queue.shift();  // Still O(n), but less common operation
```

3. **Creating new arrays unnecessarily**: O(n) space and time
```typescript
// ❌ Bad: Creates new array every iteration
function doubleValues(arr: number[]): number[] {
  let result: number[] = [];
  for (const num of arr) {
    result = result.concat([num * 2]); // O(n) per concat
  }
  return result;
}

// ✅ Good: Pre-allocate or use map
function doubleValues(arr: number[]): number[] {
  return arr.map(num => num * 2); // O(n) single pass
}
```

## When to use arrays

- ✅ You need ordered elements
- ✅ You access elements by index frequently
- ✅ You add/remove primarily at the end (stack operations)
- ✅ You iterate through all elements
- ✅ You need a simple, built-in data structure

## When NOT to use arrays

- ❌ You need fast value lookups → Use `Set` or `Map`
- ❌ You frequently insert/delete at the beginning → Use `Queue` or `Deque`
- ❌ You need fast insertions in the middle → Consider `Linked List`
- ❌ You're checking membership frequently → Use `Set`
