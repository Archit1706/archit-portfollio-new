---
title: "JavaScript by Practice"
slug: javascript-by-practice
date: 2024-09-23
tags: [JavaScript, Web Development, Coding]
excerpt: "30 JavaScript practice problems from basic to advanced — real-life problem solving covering closures, async, design patterns, and interview prep."
readingTime: 35
featured: false
---

# JavaScript by Practice

Here are 30 JavaScript practice questions, progressing from basic to advanced, and aimed at real-life problem solving while covering core JavaScript concepts often asked in interviews:

### Basic Level (1-10)

1. **Reverse a String**
   Write a function to reverse a given string. (Hint: use string methods and loops).

```javascript
// Inbuilt Functions
function reverseString(s) {
    return s.split("").reverse().join("");
}

// Loop
function reverseString(s) {
    let reversed = "";
    for (let i = s.length - 1; i >= 0; i--) {
        reversed += s[i];
    }
    return reversed;
}

// Two pointers inplace
function reverseString(s) {
    s = s.split("");
    let start = 0;
    let end = s.length - 1;

    while (start < end) {
        [s[start], s[end]] = [s[end], s[start]];
        start++;
        end--;
    }
    return s.join("");
}
```

2. **Palindrome Checker**
   Create a function that checks if a string is a palindrome (reads the same forwards and backwards).

```javascript
// loop
function isPalindrome(str) {
    for (let i = 0; i <= str.length / 2; i++) {
        if (str[i] != str[str.length - i - 1]) {
            return false;
        }
    }
    return true;
}

// Two Pointers
function isPalindrome(str) {
    let start = 0;
    let end = str.length - 1;

    while (start < end) {
        if (str[start] != str[end]) return false;

        start++;
        end--;
    }
    return true;
}

// Built-in Functions
function isPalindrome(str) {
    str = str.toLowerCase();
    return str === str.split("").reverse().join("");
}
```

3. **FizzBuzz Problem**
   Write a function that prints numbers from 1 to 100. But for multiples of 3, print "Fizz" instead of the number, and for multiples of 5, print "Buzz". For numbers which are multiples of both 3 and 5, print "FizzBuzz".

```javascript
// Loop
function FizzBuzz(n = 100) {
    for (let i = 1; i <= n; i++) {
        if (i % 3 == 0 && i % 5 == 0) {
            console.log("FizzBuzz");
        } else if (i % 3 == 0) {
            console.log("Fizz");
        } else if (i % 5 == 0) {
            console.log("Buzz");
        } else {
            console.log(i);
        }
    }
}

// Ternary Operator
function FizzBuzz(n = 100) {
    for (let i = 1; i <= n; i++) {
        console.log(
            i % 3 == 0 && i % 5 == 0
                ? "FizzBuzz"
                : i % 3 == 0
                ? "Fizz"
                : i % 5 == 0
                ? "Buzz"
                : i
        );
    }
}
```

4. **Find Maximum in Array**
   Write a function that takes an array of numbers and returns the largest number. Avoid using `Math.max()`.

```javascript
function findMax(arr) {
    let maxEle = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= maxEle) {
            maxEle = arr[i];
        }
    }
    return maxEle;
}

function findMax(arr) {
    let max = arr[0];
    for (const ele of arr) {
        if (ele > max) {
            max = ele;
        }
    }
    return max;
}
```

5. **Sum of Array**
   Create a function that returns the sum of all elements in a given array.

```javascript
// Loop
function sumArr(arr) {
    let sum = 0;
    for (const ele of arr) {
        sum += ele;
    }
    return sum;
}

// Recursive
function sumArr(arr, n) {
    if (n === 0) return 0;
    return arr[n - 1] + sumArr(arr, n - 1);
}
```

6. **Remove Duplicates from Array**
   Write a function that removes duplicates from an array of integers without using `Set`.

```javascript
// Inplace
function removeDuplicates(arr) {
    let hashmap = {};
    for (let i = 0; i < arr.length; i++) {
        if (hashmap[arr[i]]) {
            arr.splice(i, 1);
            i--;
        } else {
            hashmap[arr[i]] = true;
        }
    }
    return arr;
}

// Inbuilt Functions
function removeDuplicates(arr) {
    return [...new Set(arr)];
}

// Two Pointers
function removeDuplicates(arr) {
    let i = 0;
    for (let j = 1; j < arr.length; j++) {
        if (arr[j] != arr[i]) {
            arr[i + 1] = arr[j];
            i++;
        }
    }
    return arr.slice(0, i + 1);
}
```

7. **Factorial Calculation**
   Write a function that calculates the factorial of a number recursively.

```javascript
function factorial(n) {
    if (n === 0) return 1;
    return n * factorial(n - 1);
}
```

8. **Check if Number is Prime**
   Write a function that checks whether a given number is prime or not.

```javascript
// Loop
function checkPrime(n) {
    if (n <= 1) return false;
    if (n <= 3) return true;

    if (n % 2 === 0 || n % 3 === 0) return false;

    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
}
```

9. **Anagram Checker**
   Create a function that checks if two given strings are anagrams (i.e., same letters but in different order).

```javascript
// Loop
function checkAnagram(s1, s2) {
    if (s1.length != s2.length) return false;

    let hashmap = {};
    for (const char of s1) {
        hashmap[char] = (hashmap[char] || 0) + 1;
    }

    for (const char of s2) {
        if (!hashmap[char]) return false;
        hashmap[char]--;
    }
    return true;
}

// Sorting and Built-in Functions
function checkAnagram(s1, s2) {
    s1 = s1.split("").sort().join("");
    s2 = s2.split("").sort().join("");
    return s1 === s2;
}
```

10. **Flatten a Multidimensional Array**
    Write a function that flattens a nested array into a single array (e.g., `[[1, 2], [3, 4]]` → `[1, 2, 3, 4]`).

```javascript
function nested_to_single_arr(arr) {
    let res = [];
    for (const subarr of arr) {
        for (let i = 0; i < subarr.length; i++) {
            res.push(subarr[i]);
        }
    }
    return res;
}
```

### Intermediate Level (11-20)

11. **Debounce Function Implementation**
    Implement a debounce function that delays the processing of a function until after a specified time has elapsed since it was last called.

```javascript
function debounce(main_function, delay) {
    let timer;

    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            main_function(...args);
        }, delay);
    };
}

function main_func() {
    console.log("Function is executed, but at what cost!");
}

debounce(main_func, 5000)();
```

12. **Throttling Function**
    Write a function that limits the number of times a function can be executed over time (throttling).

```javascript
function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall >= delay) {
            lastCall = now;
            func.apply(this, args);
        }
    };
}

const log = throttle(() => console.log("Throttled!"), 1000);
window.addEventListener("scroll", log);
```

13. **Deep Clone an Object**
    Write a function that performs a deep clone of a given object (i.e., copies all nested objects/arrays).

```javascript
// Brute Force Solution (Using Recursion)
function deepClone(obj) {
    if (obj === null || typeof obj !== "object") return obj;
    let clone = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = deepClone(obj[key]);
        }
    }
    return clone;
}
console.log(deepClone({ a: 1, b: { c: 2 } })); // Output: { a: 1, b: { c: 2 } }

// Using JSON.parse and JSON.stringify
function deepCloneOptimized(obj) {
    return JSON.parse(JSON.stringify(obj));
}
console.log(deepCloneOptimized({ a: 1, b: { c: 2 } })); // Output: { a: 1, b: { c: 2 } }
```

14. **Sum of Nested Array**
    Write a function that sums all numbers in a deeply nested array (e.g., `[1, [2, [3, 4]]]` → `10`).

```javascript
function sumNestedArray(arr) {
    return arr.reduce(
        (acc, curr) =>
            acc + (Array.isArray(curr) ? sumNestedArray(curr) : curr),
        0
    );
}
console.log(sumNestedArray([1, [2, [3, 4]], 5])); // Output: 15
```

15. **Currying Function**
    Implement a curried function that accepts one argument at a time, until all arguments are provided, and then returns the result.

```javascript
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function (...nextArgs) {
                return curried.apply(this, args.concat(nextArgs));
            };
        }
    };
}

function add(a, b, c) {
    return a + b + c;
}
const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // Output: 6
```

16. **Event Delegation Example**
    Write a code snippet that implements event delegation for handling clicks on dynamically created elements in a list.

```javascript
document.querySelector("#parent").addEventListener("click", function (event) {
    if (event.target && event.target.nodeName == "BUTTON") {
        console.log("Button clicked:", event.target.innerText);
    }
});
```

17. **Two Sum Problem**
    Write a function that, given an array of numbers and a target number, finds two numbers in the array that sum to the target.

```javascript
// Brute Force
function twoSum(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}
console.log(twoSum([2, 7, 11, 15], 9)); // Output: [0, 1]

// Using hash map
function twoSumOptimized(arr, target) {
    const map = {};
    for (let i = 0; i < arr.length; i++) {
        const complement = target - arr[i];
        if (map[complement] !== undefined) {
            return [map[complement], i];
        }
        map[arr[i]] = i;
    }
    return [];
}
console.log(twoSumOptimized([2, 7, 11, 15], 9)); // Output: [0, 1]
```

18. **Binary Search Algorithm**
    Write a binary search function that searches for a value in a sorted array.

```javascript
// Iterative
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7], 4)); // Output: 3
```

19. **Promise.all Polyfill**
    Implement a custom version of `Promise.all` that accepts an array of promises and returns a promise that resolves when all promises resolve, or rejects if any promise rejects.

20. **Merge Two Sorted Arrays**
    Write a function that merges two sorted arrays into a single sorted array without using array methods like `sort()`.

```javascript
// Brute Force
function mergeSortedArrays(arr1, arr2) {
    return arr1.concat(arr2).sort((a, b) => a - b);
}
console.log(mergeSortedArrays([1, 3, 5], [2, 4, 6])); // Output: [1, 2, 3, 4, 5, 6]

// Two Pointers
function mergeSortedArraysOptimized(arr1, arr2) {
    let merged = [];
    let i = 0,
        j = 0;

    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            merged.push(arr1[i]);
            i++;
        } else {
            merged.push(arr2[j]);
            j++;
        }
    }

    while (i < arr1.length) merged.push(arr1[i++]);
    while (j < arr2.length) merged.push(arr2[j++]);

    return merged;
}
console.log(mergeSortedArraysOptimized([1, 3, 5], [2, 4, 6])); // Output: [1, 2, 3, 4, 5, 6]
```

### Advanced Level (21-30)

21. **LRU Cache Implementation**
    Implement an LRU (Least Recently Used) cache using JavaScript objects or classes.

22. **Memoization**
    Create a function that memoizes the results of another function, storing results for previously computed inputs.

23. **Generate Permutations**
    Write a function to generate all possible permutations of an array of numbers.

24. **Debouncing in Real-time Search Input**
    Implement a debounce function to optimize a search input field in a web application (e.g., triggering search only after the user has stopped typing).

25. **Custom Event Emitter**
    Write a simple event emitter class that allows registering event listeners and emitting events.

26. **Implement `call`, `apply`, and `bind` Methods**
    Create your own versions of JavaScript's `call`, `apply`, and `bind` methods.

27. **Function Composition**
    Write a function that composes multiple functions into one, where the result of each function is passed to the next.

28. **Asynchronous JavaScript**
    Write a function that fetches data from an API using `fetch`, handles errors, and returns the result as a resolved promise.

29. **Implement a Queue using Two Stacks**
    Use two stacks to implement a queue. Provide enqueue and dequeue operations.

30. **Scheduler using `setTimeout`**
    Implement a function that schedules tasks to run at specific intervals using `setTimeout` and allows for cancellation.

### Additional Topics Covered:

-   **Closures**
-   **Hoisting**
-   **Prototypes and Inheritance**
-   **Asynchronous JavaScript (Promises, async/await)**
-   **JavaScript Design Patterns (e.g., Singleton, Factory)**
-   **ES6+ Features (e.g., destructuring, arrow functions, template literals)**
-   **Error handling**

---

### 1. **Closures**

**Question:** Create a function that stores a counter and allows you to increment or retrieve its value using closures.

```javascript
function createCounter() {
    let count = 0;
    return {
        increment: function () {
            count++;
        },
        getValue: function () {
            return count;
        },
    };
}

const counter = createCounter();
counter.increment();
counter.increment();
console.log(counter.getValue()); // Output: 2
```

---

### 2. **Hoisting**

**Question:** Demonstrate the behavior of function and variable hoisting in JavaScript.

```javascript
console.log(x); // Output: undefined (variable hoisting)
var x = 5;

hoistedFunction(); // Output: "This function is hoisted!"

function hoistedFunction() {
    console.log("This function is hoisted!");
}
```

**Explanation:**

-   Variable `x` is hoisted but initialized with `undefined`.
-   `hoistedFunction` is hoisted and can be called before its declaration.

---

### 3. **Prototypes and Inheritance**

**Question:** Create a constructor function for a `Person` with properties `name` and `age`, and then use inheritance to create a `Student` that inherits from `Person`.

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.greet = function () {
    console.log(`Hello, my name is ${this.name}.`);
};

function Student(name, age, major) {
    Person.call(this, name, age);
    this.major = major;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.study = function () {
    console.log(`${this.name} is studying ${this.major}.`);
};

const student = new Student("Alice", 21, "Computer Science");
student.greet(); // Output: "Hello, my name is Alice."
student.study(); // Output: "Alice is studying Computer Science."
```

---

### 4. **Asynchronous JavaScript (Promises, async/await)**

**Question:** Write a function that fetches user data from a fake API using both Promises and `async/await`.

```javascript
function fetchUserData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ name: "John", age: 30 });
        }, 1000);
    });
}

fetchUserData()
    .then((data) => console.log(data))
    .catch((err) => console.error(err));

async function fetchUserDataAsync() {
    try {
        const data = await fetchUserData();
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

fetchUserDataAsync();
```

---

### 5. **JavaScript Design Patterns (Singleton, Factory)**

**Question:** Implement the Singleton design pattern in JavaScript.

```javascript
const Database = (function () {
    let instance;

    function createInstance() {
        return { connection: "Database connection established" };
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },
    };
})();

const db1 = Database.getInstance();
const db2 = Database.getInstance();

console.log(db1 === db2); // Output: true
```

**Factory Pattern:**

```javascript
function EmployeeFactory() {}

EmployeeFactory.prototype.createEmployee = function (role) {
    switch (role) {
        case "developer":
            return { role: "developer", code: () => console.log("Coding...") };
        case "designer":
            return {
                role: "designer",
                design: () => console.log("Designing..."),
            };
        default:
            return null;
    }
};

const factory = new EmployeeFactory();
const dev = factory.createEmployee("developer");
const designer = factory.createEmployee("designer");

dev.code(); // Output: "Coding..."
designer.design(); // Output: "Designing..."
```

---

### 6. **ES6+ Features (Destructuring, Arrow Functions, Template Literals)**

```javascript
const person = { name: "Alice", age: 25 };
const { name, age } = person;

const numbers = [1, 2, 3];
const [first, second] = numbers;

const greet = (name, age) =>
    `Hello, my name is ${name} and I am ${age} years old.`;

console.log(greet(name, age));
```

---

### 7. **Error Handling**

```javascript
function checkNumber(num) {
    if (num < 0) {
        throw new Error("Negative number not allowed");
    }
    return "Number is valid";
}

try {
    console.log(checkNumber(-5));
} catch (err) {
    console.error(err.message); // Output: "Negative number not allowed"
}

async function retryOperation(operation, retries) {
    for (let i = 0; i < retries; i++) {
        try {
            return await operation();
        } catch (err) {
            if (i === retries - 1)
                throw new Error("Operation failed after retries");
        }
    }
}
```
