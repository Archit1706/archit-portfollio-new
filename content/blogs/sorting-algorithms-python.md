---
title: "Complete Guide to Sorting Algorithms in Python"
slug: sorting-algorithms-python
date: 2025-06-15
tags: [Algorithms, Python, Computer Science]
excerpt: "A comprehensive guide to every major sorting algorithm in Python — bubble, merge, quick, heap, radix — with time complexity analysis and when each shines."
readingTime: 35
featured: false
---

# Complete Guide to Sorting Algorithms in Python

## Table of Contents

1. [Bubble Sort](#bubble-sort)
2. [Selection Sort](#selection-sort)
3. [Insertion Sort](#insertion-sort)
4. [Merge Sort](#merge-sort)
5. [Quick Sort](#quick-sort)
6. [Comparison Summary](#comparison-summary)

---

## 1. Bubble Sort

### How it Works

Bubble Sort is the simplest sorting algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they're in the wrong order. The process is repeated until the list is sorted.

**Why it's called "Bubble" Sort:** Large elements "bubble" to the end of the array, just like air bubbles rise to the surface of water.

### Algorithm Steps

1. Compare the first two elements
2. If the first is greater than the second, swap them
3. Move to the next pair and repeat
4. After each complete pass, the largest element is in its correct position
5. Repeat until no swaps are needed

### Python Implementation

#### Basic Version (Brute Force)

```python
def bubble_sort_basic(arr):
    """
    Basic bubble sort - always does n-1 passes
    Time Complexity: O(n²) - always
    Space Complexity: O(1)
    """
    n = len(arr)

    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

    return arr

arr = [64, 34, 25, 12, 22, 11, 90]
print("Original array:", arr)
sorted_arr = bubble_sort_basic(arr.copy())
print("Sorted array:", sorted_arr)
```

#### Optimized Version

```python
def bubble_sort_optimized(arr):
    """
    Optimized bubble sort - stops early if array becomes sorted
    Best case: O(n) when array is already sorted
    Worst case: O(n²)
    """
    n = len(arr)

    for i in range(n - 1):
        swapped = False

        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True

        if not swapped:
            break

    return arr
```

### Complexity Analysis

-   **Time Complexity:**
    -   Best case: O(n) - when array is already sorted (optimized version)
    -   Average case: O(n²)
    -   Worst case: O(n²) - when array is reverse sorted
-   **Space Complexity:** O(1) - only uses a constant amount of additional space
-   **Stable:** Yes - equal elements maintain their relative order

---

## 2. Selection Sort

### How it Works

Selection Sort divides the array into two parts: sorted (initially empty) and unsorted. It repeatedly finds the minimum element from the unsorted part and places it at the beginning of the sorted part.

### Algorithm Steps

1. Find the minimum element in the unsorted portion
2. Swap it with the first element of the unsorted portion
3. Move the boundary of the sorted portion one element to the right
4. Repeat until the entire array is sorted

### Python Implementation

#### Basic Version

```python
def selection_sort(arr):
    """
    Selection sort implementation
    Time Complexity: O(n²) - always
    Space Complexity: O(1)
    """
    n = len(arr)

    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j

        arr[i], arr[min_idx] = arr[min_idx], arr[i]

    return arr

arr = [64, 25, 12, 22, 11]
print("Original array:", arr)
sorted_arr = selection_sort(arr.copy())
print("Sorted array:", sorted_arr)
```

#### With Step-by-Step Visualization

```python
def selection_sort_verbose(arr):
    """Selection sort with detailed output"""
    n = len(arr)
    print(f"Starting array: {arr}")

    for i in range(n - 1):
        min_idx = i
        print(f"\nPass {i + 1}: Finding minimum from index {i}")

        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
                print(f"  New minimum found: {arr[min_idx]} at index {min_idx}")

        if min_idx != i:
            print(f"  Swapping {arr[i]} and {arr[min_idx]}")
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
        else:
            print(f"  {arr[i]} is already in correct position")

        print(f"  Array after pass {i + 1}: {arr}")

    return arr
```

### Complexity Analysis

-   **Time Complexity:** O(n²) - always, regardless of input
-   **Space Complexity:** O(1)
-   **Stable:** No - equal elements may change their relative order

---

## 3. Insertion Sort

### How it Works

Insertion Sort builds the sorted array one element at a time. It takes each element from the unsorted portion and inserts it into its correct position in the sorted portion.

**Analogy:** Like sorting playing cards in your hand - you pick up cards one by one and insert each into its proper place.

### Algorithm Steps

1. Start with the second element (assume first is sorted)
2. Compare it with elements in the sorted portion
3. Shift larger elements to the right
4. Insert the current element in its correct position
5. Repeat for all elements

### Python Implementation

#### Basic Version

```python
def insertion_sort(arr):
    """
    Insertion sort implementation
    Time Complexity: Best O(n), Average/Worst O(n²)
    Space Complexity: O(1)
    """
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1

        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1

        arr[j + 1] = key

    return arr

arr = [12, 11, 13, 5, 6]
print("Original array:", arr)
sorted_arr = insertion_sort(arr.copy())
print("Sorted array:", sorted_arr)
```

#### With Binary Search Optimization

```python
def binary_search_insertion_sort(arr):
    """
    Insertion sort with binary search to find insertion position
    Reduces comparisons but shifting still takes O(n) time
    """
    def binary_search(arr, val, start, end):
        if start == end:
            return start if arr[start] > val else start + 1

        if start > end:
            return start

        mid = (start + end) // 2

        if arr[mid] < val:
            return binary_search(arr, val, mid + 1, end)
        elif arr[mid] > val:
            return binary_search(arr, val, start, mid - 1)
        else:
            return mid

    for i in range(1, len(arr)):
        key = arr[i]
        j = binary_search(arr, key, 0, i - 1)

        arr[j + 1:i + 1] = arr[j:i]
        arr[j] = key

    return arr
```

### Complexity Analysis

-   **Time Complexity:**
    -   Best case: O(n) - when array is already sorted
    -   Average case: O(n²)
    -   Worst case: O(n²) - when array is reverse sorted
-   **Space Complexity:** O(1)
-   **Stable:** Yes

---

## 4. Merge Sort

### How it Works

Merge Sort follows the **Divide and Conquer** paradigm. It divides the array into two halves, sorts them separately, and then merges them back together.

**Key Insight:** If you can merge two sorted arrays efficiently, you can sort any array by dividing it until you have arrays of size 1 (which are inherently sorted).

### Algorithm Steps

1. **Divide:** Split the array into two halves
2. **Conquer:** Recursively sort both halves
3. **Combine:** Merge the two sorted halves

### Python Implementation

#### Recursive Version

```python
def merge_sort(arr):
    """
    Merge sort implementation using recursion
    Time Complexity: O(n log n) - always
    Space Complexity: O(n)
    """
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left_half = arr[:mid]
    right_half = arr[mid:]

    left_sorted = merge_sort(left_half)
    right_sorted = merge_sort(right_half)

    return merge(left_sorted, right_sorted)

def merge(left, right):
    """
    Merge two sorted arrays into one sorted array
    """
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])

    return result

arr = [38, 27, 43, 3, 9, 82, 10]
print("Original array:", arr)
sorted_arr = merge_sort(arr)
print("Sorted array:", sorted_arr)
```

#### In-Place Version (More Memory Efficient)

```python
def merge_sort_inplace(arr, left=0, right=None):
    """
    In-place merge sort (modifies original array)
    Slightly more memory efficient
    """
    if right is None:
        right = len(arr) - 1

    if left < right:
        mid = (left + right) // 2

        merge_sort_inplace(arr, left, mid)
        merge_sort_inplace(arr, mid + 1, right)

        merge_inplace(arr, left, mid, right)

def merge_inplace(arr, left, mid, right):
    """Merge function for in-place merge sort"""
    left_arr = arr[left:mid + 1]
    right_arr = arr[mid + 1:right + 1]

    i = j = 0
    k = left

    while i < len(left_arr) and j < len(right_arr):
        if left_arr[i] <= right_arr[j]:
            arr[k] = left_arr[i]
            i += 1
        else:
            arr[k] = right_arr[j]
            j += 1
        k += 1

    while i < len(left_arr):
        arr[k] = left_arr[i]
        i += 1
        k += 1

    while j < len(right_arr):
        arr[k] = right_arr[j]
        j += 1
        k += 1
```

#### Iterative Version (Bottom-Up Approach)

```python
def merge_sort_iterative(arr):
    """
    Iterative merge sort implementation (bottom-up)
    Avoids recursion overhead
    """
    if len(arr) <= 1:
        return arr

    arr = arr.copy()
    n = len(arr)

    size = 1
    while size < n:
        left = 0
        while left < n - 1:
            mid = min(left + size - 1, n - 1)
            right = min(left + size * 2 - 1, n - 1)

            if mid < right:
                merge_iterative(arr, left, mid, right)

            left = left + size * 2

        size *= 2

    return arr
```

### Complexity Analysis

-   **Time Complexity:** O(n log n) - always, regardless of input
-   **Space Complexity:** O(n) - requires additional space for temporary arrays
-   **Stable:** Yes - equal elements maintain their relative order

---

## 5. Quick Sort

### How it Works

Quick Sort also uses **Divide and Conquer**. It picks a 'pivot' element and partitions the array around the pivot such that:

-   Elements smaller than pivot go to the left
-   Elements greater than pivot go to the right
-   The pivot is in its final sorted position

Then it recursively sorts the left and right subarrays.

### Algorithm Steps

1. **Choose a pivot** (various strategies)
2. **Partition:** Rearrange array so elements < pivot are on left, elements > pivot are on right
3. **Recursively sort** the left and right subarrays

### Python Implementation

#### Basic Version (Last Element as Pivot)

```python
def quick_sort(arr, low=0, high=None):
    """
    Quick sort implementation with last element as pivot
    Time Complexity: Best/Average O(n log n), Worst O(n²)
    Space Complexity: O(log n) average, O(n) worst case
    """
    if high is None:
        high = len(arr) - 1

    if low < high:
        pivot_index = partition(arr, low, high)

        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)

def partition(arr, low, high):
    """
    Lomuto partition scheme
    Takes last element as pivot
    """
    pivot = arr[high]
    i = low - 1

    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

arr = [10, 7, 8, 9, 1, 5]
print("Original array:", arr)
quick_sort(arr)
print("Sorted array:", arr)
```

#### Hoare Partition Scheme

```python
def quick_sort_hoare(arr, low=0, high=None):
    """Quick sort with Hoare partition scheme"""
    if high is None:
        high = len(arr) - 1

    if low < high:
        pivot_index = hoare_partition(arr, low, high)
        quick_sort_hoare(arr, low, pivot_index)
        quick_sort_hoare(arr, pivot_index + 1, high)

def hoare_partition(arr, low, high):
    """
    Hoare partition scheme
    More efficient than Lomuto as it does fewer swaps
    """
    pivot = arr[low]
    i = low - 1
    j = high + 1

    while True:
        i += 1
        while arr[i] < pivot:
            i += 1

        j -= 1
        while arr[j] > pivot:
            j -= 1

        if i >= j:
            return j

        arr[i], arr[j] = arr[j], arr[i]
```

#### Randomized Quick Sort

```python
import random

def randomized_quick_sort(arr, low=0, high=None):
    """
    Randomized quick sort - chooses random pivot
    Helps avoid worst-case O(n²) performance on sorted/reverse sorted arrays
    """
    if high is None:
        high = len(arr) - 1

    if low < high:
        random_index = random.randint(low, high)
        arr[random_index], arr[high] = arr[high], arr[random_index]

        pivot_index = partition(arr, low, high)
        randomized_quick_sort(arr, low, pivot_index - 1)
        randomized_quick_sort(arr, pivot_index + 1, high)
```

#### Iterative Quick Sort

```python
def quick_sort_iterative(arr):
    """
    Iterative implementation of quick sort
    Uses explicit stack instead of recursion
    """
    if len(arr) <= 1:
        return arr

    stack = [(0, len(arr) - 1)]

    while stack:
        low, high = stack.pop()

        if low < high:
            pivot_index = partition(arr, low, high)

            stack.append((low, pivot_index - 1))
            stack.append((pivot_index + 1, high))

    return arr
```

### Complexity Analysis

-   **Time Complexity:**
    -   Best case: O(n log n) - when pivot divides array into equal halves
    -   Average case: O(n log n)
    -   Worst case: O(n²) - when pivot is always smallest or largest element
-   **Space Complexity:**
    -   Best/Average: O(log n) - recursion depth
    -   Worst case: O(n) - when recursion depth equals array size
-   **Stable:** No - equal elements may change their relative order

---

## Comparison Summary

| Algorithm      | Best Case  | Average Case | Worst Case | Space Complexity | Stable | In-Place |
| -------------- | ---------- | ------------ | ---------- | ---------------- | ------ | -------- |
| Bubble Sort    | O(n)       | O(n²)        | O(n²)      | O(1)             | Yes    | Yes      |
| Selection Sort | O(n²)      | O(n²)        | O(n²)      | O(1)             | No     | Yes      |
| Insertion Sort | O(n)       | O(n²)        | O(n²)      | O(1)             | Yes    | Yes      |
| Merge Sort     | O(n log n) | O(n log n)   | O(n log n) | O(n)             | Yes    | No       |
| Quick Sort     | O(n log n) | O(n log n)   | O(n²)      | O(log n)         | No     | Yes      |

## When to Use Each Algorithm

### Bubble Sort

-   **Use when:** Learning purposes, very small datasets (< 10 elements)
-   **Avoid when:** Any practical application (too slow)

### Selection Sort

-   **Use when:** Memory is extremely limited, small datasets
-   **Characteristics:** Minimizes number of swaps

### Insertion Sort

-   **Use when:** Small datasets (< 50 elements), nearly sorted data, online algorithms
-   **Characteristics:** Efficient for small arrays, adaptive (fast on nearly sorted data)

### Merge Sort

-   **Use when:** Stability is required, consistent O(n log n) performance needed, external sorting
-   **Characteristics:** Guaranteed O(n log n), stable, works well with linked lists

### Quick Sort

-   **Use when:** Average-case performance is important, memory is limited
-   **Characteristics:** Fastest average-case performance, in-place, cache-friendly

## Advanced Techniques

### Hybrid Approaches

```python
def hybrid_sort(arr, threshold=10):
    """
    Hybrid sorting algorithm:
    - Use Quick Sort for large arrays
    - Use Insertion Sort for small arrays (more efficient due to lower overhead)
    """
    if len(arr) <= threshold:
        return insertion_sort(arr)
    else:
        quick_sort(arr)
        return arr
```

### Tail Recursion Optimization for Quick Sort

```python
def quick_sort_tail_optimized(arr, low=0, high=None):
    """
    Quick sort with tail recursion optimization
    Reduces space complexity in worst case
    """
    if high is None:
        high = len(arr) - 1

    while low < high:
        pivot_index = partition(arr, low, high)

        if pivot_index - low < high - pivot_index:
            quick_sort_tail_optimized(arr, low, pivot_index - 1)
            low = pivot_index + 1
        else:
            quick_sort_tail_optimized(arr, pivot_index + 1, high)
            high = pivot_index - 1
```

## Testing Your Implementations

```python
import random
import time

def test_sorting_algorithm(sort_func, arr_size=1000, num_tests=5):
    """Test sorting algorithm with random data"""
    print(f"\nTesting {sort_func.__name__}:")

    total_time = 0
    for i in range(num_tests):
        test_arr = [random.randint(1, 1000) for _ in range(arr_size)]
        original = test_arr.copy()

        start_time = time.time()
        if sort_func.__name__.startswith('quick_sort'):
            sort_func(test_arr)
        else:
            test_arr = sort_func(test_arr)
        end_time = time.time()

        assert test_arr == sorted(original), "Sorting failed!"

        total_time += (end_time - start_time)

    avg_time = total_time / num_tests
    print(f"Average time for {arr_size} elements: {avg_time:.4f} seconds")

if __name__ == "__main__":
    algorithms = [
        bubble_sort_optimized,
        selection_sort,
        insertion_sort,
        merge_sort,
    ]

    for algorithm in algorithms:
        test_sorting_algorithm(algorithm, arr_size=1000)
```

This comprehensive guide covers all major sorting algorithms with multiple implementation approaches. Practice implementing each one and experiment with the implementations to understand how they work!
