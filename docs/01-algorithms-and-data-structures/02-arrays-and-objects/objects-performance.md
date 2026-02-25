# Objects Performance in TypeScript

Objects in TypeScript (and JavaScript) are implemented as hash maps, providing fast key-value lookups. Understanding their performance characteristics helps you choose the right data structure.

## Why this matters

Objects provide O(1) average-case lookups, making them ideal for fast value retrieval. However, they're not always the best choice - understanding when they're fast vs slow helps you write efficient code.

## Core concepts

- **Objects are hash maps** - keys are hashed to find values quickly
- **Average case is O(1)** - hash collisions are rare in practice
- **Worst case is O(n)** - if all keys hash to the same bucket (rare)
- **No guaranteed order** - insertion order is preserved in modern JS, but don't rely on it for algorithms
- **Searching values is O(n)** - must check each value
- **Memory overhead** - objects use more memory than arrays due to hash table structure

## Big O Complexity

### Access Operations

**Access by key: O(1) average**
Hash map lookups are extremely fast. The key is hashed to find the value's location directly.

```typescript
const user = { name: 'Alice', age: 30, city: 'NYC' };
const name = user.name; // O(1) - instant hash lookup
const age = user['age']; // O(1) - bracket notation also O(1)
```

**Search by value: O(n)**
To find a key by its value, you must check each key-value pair.

```typescript
function findKeyByValue(obj: Record<string, number>, target: number): string | undefined {
  for (const [key, value] of Object.entries(obj)) {
    if (value === target) return key; // O(n) - must check all entries
  }
  return undefined;
}
```

### Insert Operations

**Insert/Update: O(1) average**
Adding or updating a key-value pair is fast - just hash the key and store the value.

```typescript
const user: Record<string, any> = {};
user.name = 'Alice';     // O(1) - fast insert
user.age = 30;           // O(1) - fast insert
user.name = 'Bob';       // O(1) - fast update
```

### Delete Operations

**Delete by key: O(1) average**
Removing a key-value pair is fast - hash the key and remove it.

```typescript
const user = { name: 'Alice', age: 30, city: 'NYC' };
delete user.city; // O(1) - fast delete
```

### Other Operations

**Iterate keys/values/entries: O(n)**
Must visit all key-value pairs in the object.

```typescript
const user = { name: 'Alice', age: 30, city: 'NYC' };
Object.keys(user);    // O(n) - returns ['name', 'age', 'city']
Object.values(user);  // O(n) - returns ['Alice', 30, 'NYC']
Object.entries(user); // O(n) - returns [['name', 'Alice'], ...]
```

**Check if key exists: O(1) average**
Using `in` operator or `hasOwnProperty` is fast.

```typescript
const user = { name: 'Alice', age: 30 };
'name' in user;              // O(1) - fast check
user.hasOwnProperty('name'); // O(1) - fast check
```

## When objects are fast

✅ **Key-value lookups** - O(1) average case
```typescript
const cache: Record<string, string> = {};
cache['user-123'] = 'Alice';        // O(1) - fast insert
const user = cache['user-123'];     // O(1) - fast lookup
```

✅ **Frequency counting** - O(1) insert, O(n) total
```typescript
function countFrequencies(arr: number[]): Record<number, number> {
  const freq: Record<number, number> = {};
  for (const num of arr) {
    freq[num] = (freq[num] || 0) + 1; // O(1) per insert
  }
  return freq; // O(n) total
}
```

✅ **Removing duplicates** - O(n) using object as Set
```typescript
function removeDuplicates(arr: number[]): number[] {
  const seen: Record<number, boolean> = {};
  const result: number[] = [];
  for (const num of arr) {
    if (!seen[num]) {        // O(1) lookup
      seen[num] = true;
      result.push(num);
    }
  }
  return result; // O(n) total
}
```

✅ **Grouping data** - O(n) with O(1) inserts
```typescript
function groupByCategory(items: Array<{name: string, category: string}>): Record<string, string[]> {
  const grouped: Record<string, string[]> = {};
  for (const item of items) {
    if (!grouped[item.category]) {
      grouped[item.category] = [];
    }
    grouped[item.category].push(item.name); // O(1) lookup, O(1) push
  }
  return grouped; // O(n) total
}
```

## When objects are slow

❌ **Searching by value** - O(n) must check all values
```typescript
// Slow: O(n) to find key by value
function findKeyByValue(obj: Record<string, number>, target: number): string | undefined {
  for (const [key, value] of Object.entries(obj)) {
    if (value === target) return key; // O(n) - checks all entries
  }
  return undefined;
}

// Better: Maintain reverse mapping if needed frequently
const reverseMap: Record<number, string> = {};
```

❌ **Iterating all entries** - O(n) but necessary
```typescript
// O(n) - must visit all entries
function sumValues(obj: Record<string, number>): number {
  let sum = 0;
  for (const value of Object.values(obj)) {
    sum += value; // O(n) - no way around it
  }
  return sum;
}
```

❌ **Large number of keys with similar hashes** - Can degrade to O(n) worst case
```typescript
// Rare but possible: if many keys hash to same bucket
// In practice, JavaScript engines handle this well
```

## Common pitfalls

1. **Using objects instead of Sets for membership**: More memory overhead
```typescript
// ✅ Works but uses more memory
const seen: Record<number, boolean> = {};
seen[5] = true;
if (seen[5]) { /* ... */ }

// ✅ Better: Use Set for simple membership
const seen = new Set<number>();
seen.add(5);
if (seen.has(5)) { /* ... */ }
```

2. **Nested object access without checking**: Can cause errors
```typescript
// ❌ Bad: May throw error if key doesn't exist
function getNestedValue(obj: any, path: string[]): any {
  let current = obj;
  for (const key of path) {
    current = current[key]; // May be undefined
  }
  return current;
}

// ✅ Good: Check existence
function getNestedValue(obj: any, path: string[]): any {
  let current = obj;
  for (const key of path) {
    if (current == null || typeof current !== 'object') return undefined;
    current = current[key];
  }
  return current;
}
```

3. **Using objects for ordered data**: Order is not guaranteed in all cases
```typescript
// ❌ Don't rely on insertion order for algorithms
const obj: Record<number, string> = {};
obj[3] = 'third';
obj[1] = 'first';
obj[2] = 'second';
// Order may vary

// ✅ Use Map if you need insertion order guarantee
const map = new Map<number, string>();
map.set(3, 'third');
map.set(1, 'first');
map.set(2, 'second');
// Order is guaranteed
```

4. **String keys only**: Objects only support string/symbol keys
```typescript
// ❌ Numbers are converted to strings
const obj: Record<number, string> = {};
obj[1] = 'one';
obj['1'] = 'also one'; // Same key!

// ✅ Use Map for any key type
const map = new Map<number, string>();
map.set(1, 'one');
map.set('1', 'also one'); // Different keys
```

## When to use objects

- ✅ You need fast key-value lookups
- ✅ You're counting frequencies or grouping data
- ✅ You need a simple key-value store
- ✅ Keys are strings or can be converted to strings
- ✅ You don't need guaranteed insertion order

## When NOT to use objects

- ❌ You need ordered key-value pairs → Use `Map`
- ❌ Keys are not strings → Use `Map`
- ❌ You only need membership (no values) → Use `Set`
- ❌ You need to search by value frequently → Consider maintaining reverse mapping
- ❌ You need array-like operations → Use `Array`

## Objects vs Maps vs Sets

| Feature | Object | Map | Set |
|---------|--------|-----|-----|
| Key types | String/Symbol | Any | N/A (values only) |
| Size property | No | Yes | Yes |
| Iteration | Manual | Built-in | Built-in |
| Insertion order | Not guaranteed | Guaranteed | Guaranteed |
| Performance | O(1) average | O(1) average | O(1) average |
| Use case | Simple key-value | Key-value with any keys | Membership only |
