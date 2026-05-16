---
title: "Neetcode 150"
slug: neetcode-150
date: 2024-09-13
tags: [Coding, Algorithms, Interview Prep]
excerpt: "Working through Neetcode 150 — carefully selected problems covering arrays, hashmaps, sliding window, stacks, and more, with multiple solution approaches."
readingTime: 20
featured: false
---

# Neetcode 150

Neetcode 150 is a collection of 150 coding problems for software engineers and developers to practice their coding skills. The problems are carefully selected to cover a wide range of topics and difficulty levels, making it an ideal resource for interview preparation and skill development.

### 1. Problem 1: Duplicate Integer

#### Description

-   Given an integer array `nums`, return `true` if any value appears more than once in the array, otherwise return `false`.

#### Examples

Example 1:

-   Input: nums = [1, 2, 3, 3]
-   Output: true

Example 2:

-   Input: nums = [1, 2, 3, 4]
-   Output: false

#### Hints / Notes:

1. Brute Force

-   The problem can be solved using two for loops (brute force) to compare each element with every other element in the array.
-   This approach has a time complexity of O(n^2) and a space complexity of O(1).

2. Hash Set

-   At the expense of space complexity, we can use a hash set to store the elements as we iterate through the array.
-   If we encounter an element that is already present in the hash set, we return `true`.
-   This approach has a time complexity of O(n) and a space complexity of O(n).

3. Sorting

-   We can sort the array and then iterate through it to check if any adjacent elements are the same.
-   This approach has a time complexity of O(n log n) and a space complexity of O(1).

4. Pythonic Solution

-   In Python, we can use the `set` data structure to store the elements and then compare the lengths of the original array and the set.
-   If the lengths are different, it means that there are duplicate elements in the array.
-   This approach has a time complexity of O(n) and a space complexity of O(n).

#### Solution

```python
# Pythonic Solution
def containsDuplicate(nums):
    return len(nums) != len(set(nums))

# Sorting
def containsDuplicate(nums):
    nums.sort()
    for i in range(1, len(nums)):
        if nums[i] == nums[i - 1]:
            return True
    return False

# Hash Set
def containsDuplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False

# Brute Force
def containsDuplicate(nums):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] == nums[j]:
                return True
    return False
```

#### Complexity Analysis

-   Time Complexity: O(n)
-   Space Complexity: O(n)

2. Is Anagram

#### Description

Given two strings `s` and `t`, return `true` if the two strings are anagrams of each other, otherwise return `false`.
An anagram is a string that contains the exact same characters as another string, but the order of the characters can be different.

#### Examples

Example 1:

-   Input: s = "anagram", t = "nagaram"
-   Output: true

Example 2:

-   Input: s = "rat", t = "car"
-   Output: false

#### Solution

```python
# Pythonic Solution
from collections import Counter

def isAnagram(s, t):
    return Counter(s) == Counter(t)

# Hash Map
def isAnagram(s, t):
    if len(s) != len(t):
        return False
    freq_s = {}
    freq_t = {}
    for char in s:
        freq_s[char] = freq_s.get(char, 0) + 1
    for char in t:
        freq_t[char] = freq_t.get(char, 0) + 1
    return freq_s == freq_t

# Sorting
def isAnagram(s, t):
    return sorted(s) == sorted(t)
```

#### Complexity Analysis

-   Time Complexity: O(n)
-   Space Complexity: O(n)

3. Two Integer Sum

#### Description

Given an array of integers `nums` and an integer `target`, return the indices `i` and `j` such that `nums[i] + nums[j] == target` and `i != j`.

You may assume that every input has exactly one pair of indices `i` and `j` that satisfy the condition.

Return the answer with the smaller index first.

#### Examples

Example 1:

-   Input: nums = [2, 7, 11, 15], target = 9
-   Output: [0, 1]

Example 2:

-   Input: nums = [3, 2, 4], target = 6
-   Output: [1, 2]

#### Solution

```python
# Hash Map
def twoSum(nums, target):
    num_to_index = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_to_index:
            return [num_to_index[complement], i]
        num_to_index[num] = i

# Brute Force
def twoSum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
```

#### Complexity Analysis

-   Time Complexity: O(n)
-   Space Complexity: O(n)

4. Anagram Groups

#### Description

Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

#### Solution

```python
# Hash Map and Sorting
def groupAnagrams(strs):
    anagrams = {}
    for s in strs:
        key = tuple(sorted(s))
        if key in anagrams:
            anagrams[key].append(s)
        else:
            anagrams[key] = [s]
    return list(anagrams.values())

# Pythonic Solution
from collections import defaultdict

def groupAnagrams(strs):
    anagrams = defaultdict(list)
    for s in strs:
        anagrams[tuple(sorted(s))].append(s)
    return list(anagrams.values())

# Hash Map and Character Count
def groupAnagrams(strs):
    anagrams = {}
    for s in strs:
        count = [0] * 26
        for char in s:
            count[ord(char) - ord('a')] += 1
        key = tuple(count)
        if key in anagrams:
            anagrams[key].append(s)
        else:
            anagrams[key] = [s]
    return list(anagrams.values())
```

#### Complexity Analysis

-   Time Complexity: O(n k)
-   Space Complexity: O(n k)

5. Top k Elements in list

#### Description

Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.

#### Solution

```python
# Hash Map and Sorting
def topKFrequent(nums, k):
    freq = {}
    for num in nums:
        freq[num] = freq.get(num, 0) + 1
    sorted_freq = sorted(freq.items(), key=lambda x: x[1], reverse=True)
    return [x[0] for x in sorted_freq[:k]]


# Min Heap
import heapq

def topKFrequent(nums, k):
    freq = {}
    for num in nums:
        freq[num] = freq.get(num, 0) + 1
    min_heap = []

    for num, count in freq.items():
        heapq.heappush(min_heap, (count, num))
        if len(min_heap) > k:
            heapq.heappop(min_heap)
    return [num for count, num in min_heap]

# Bucket Sort
from collections import Counter

def topKFrequent(nums, k):
    freq = Counter(nums)
    buckets = [[] for _ in range(len(nums) + 1)]
    for num, count in freq.items():
        buckets[count].append(num)
    result = []
    for i in range(len(buckets) - 1, -1, -1):
        result.extend(buckets[i])
        if len(result) >= k:
            return result[:k]
```

#### Complexity Analysis

-   Time Complexity: O(n)
-   Space Complexity: O(n)

6. String Encode and Decode

#### Description

Design an algorithm to encode a list of strings to a string and decode it back to the original list of strings.

#### Solution

```python
# Length Prefix
def encode(strs):
    encoded = ""
    for s in strs:
        encoded += str(len(s)) + "#" + s
    return encoded

def decode(s):
    decoded = []
    i = 0
    while i < len(s):
        j = i
        while s[j] != "#":
            j += 1
        length = int(s[i:j])
        decoded.append(s[j + 1:j + 1 + length])
        i = j + 1 + length
    return decoded
```

#### Complexity Analysis

-   Time Complexity: O(n)
-   Space Complexity: O(n)

7. Product of Array Except Self

#### Description

Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.

The product of any prefix or suffix of `nums` is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

#### Examples

Example 1:

-   Input: nums = [1, 2, 3, 4]
-   Output: [24, 12, 8, 6]

#### Solution

```python
# Prefix and Suffix Products
def productExceptSelf(nums):
    n = len(nums)
    prefix = [1] * n
    suffix = [1] * n

    for i in range(1, n):
        prefix[i] = prefix[i - 1] * nums[i - 1]
        suffix[n - i - 1] = suffix[n - i] * nums[n - i]

    return [prefix[i] * suffix[i] for i in range(n)]

# Single Array (O(1) space)
def productExceptSelf(nums):
    n = len(nums)
    result = [1] * n
    prefix = 1
    suffix = 1

    for i in range(n):
        result[i] *= prefix
        prefix *= nums[i]
        result[n - i - 1] *= suffix
        suffix *= nums[n - i - 1]

    return result
```

#### Complexity Analysis

-   Time Complexity: O(n)
-   Space Complexity: O(1)
