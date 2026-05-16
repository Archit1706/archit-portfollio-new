---
title: "ReactJS Crash Course"
slug: reactjs-crash-course
date: 2022-10-20
tags: [React, JavaScript, Web Development]
excerpt: "A comprehensive guide to get started with React development — hooks, state, components, and the mental model that makes React click."
readingTime: 60
featured: false
---

# React.js Crash Course

### **Module 1: Introduction to React:**

#### **What is React.js?**

React.js, commonly known as React, is an open-source JavaScript library for building user interfaces or UI components. It was developed by Facebook and is maintained by Facebook and a community of individual developers and companies. React is widely used for creating single-page applications where data can change over time without reloading the page. It allows developers to build reusable UI components and manage the state of an application efficiently.

#### **Why use React.js?**

-   **Declarative Syntax:** React uses a declarative syntax, making it easier to understand and debug.
-   **Component-Based Architecture:** React follows a component-based architecture, enabling the creation of reusable and modular UI components.
-   **Virtual DOM:** React employs a virtual DOM, which enhances performance by minimizing direct manipulation of the actual DOM.
-   **One-Way Data Binding:** React follows a unidirectional data flow, simplifying the tracking of data changes.
-   **Large Ecosystem:** React has a vast ecosystem, including tools and libraries, contributing to its popularity.

#### **Virtual DOM Concept:**

The Virtual DOM is a programming concept where an ideal, or "virtual," representation of the user interface is kept in memory. It acts as a lightweight copy of the real DOM and is used for efficient updates. When the state of an object changes, React first updates the Virtual DOM, then compares it to the current state, and finally updates only the parts of the actual DOM that have changed. This minimizes the number of manipulations needed, improving performance.

#### **JSX Syntax:**

JSX (JavaScript XML) is a syntax extension for JavaScript recommended by React. It looks similar to XML/HTML but ultimately gets transpiled to JavaScript. JSX allows developers to write UI components in a syntax that closely resembles HTML, making the code more readable.

Example of JSX:

```jsx
const element = <h1>Hello, React!</h1>;
```

In the above code, `<h1>Hello, React!</h1>` is JSX, representing a React element. This JSX will be transformed into a `React.createElement` function call during the compilation process.

**Output:**

```html
<h1>Hello, React!</h1>
```

Understanding these foundational concepts is crucial for diving into React development and building efficient and scalable applications.

### **Module 2: Setting Up Your Development Environment:**

#### **Node.js and npm Installation:**

-   **Node.js:** Node.js is a JavaScript runtime that allows you to run JavaScript on the server side. React development often relies on Node.js for package management and running scripts.
-   **npm (Node Package Manager):** npm is the default package manager for Node.js. It is used to install, share, and manage dependencies. React projects typically leverage npm to manage libraries and tools.

    **Installation:**

    -   Download and install Node.js from [nodejs.org](https://nodejs.org/).
    -   npm is included with Node.js, so there is no need to install it separately.

#### **Create React App:**

-   **Create React App (CRA):** CRA is a command-line tool that sets up a new React project with a sensible default configuration. It allows developers to quickly start building React applications without dealing with complex configurations.

    **Create a New React App:**

    ```bash
    npx create-react-app my-react-app
    cd my-react-app
    ```

    This command creates a new React app named `my-react-app` and navigates into its directory.

    **Start the Development Server:**

    ```bash
    npm start
    ```

    This command starts the development server, and you can view your React app at `http://localhost:3000` in your web browser.

#### **Understanding the Project Structure:**

A typical Create React App project structure looks like this:

```
my-react-app/
│
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── index.js
│   ├── App.js
│   ├── App.css
│   ├── index.css
│   └── logo.svg
│
├── package.json
├── README.md
└── ...
```

-   **`public/`:** Contains static assets such as HTML files, images, and the favicon.

-   **`src/`:** Houses the source code for the React application.

    -   **`index.js`:** Entry point of the application where React is rendered into the DOM.
    -   **`App.js`:** The main component that gets rendered in `index.js`.
    -   **`App.css` and `index.css`:** Style files for the components.
    -   **`logo.svg`:** An example image.

-   **`package.json`:** Configuration file that includes project metadata and dependencies.

-   **`README.md`:** Documentation for the project.

Understanding the project structure is essential for organizing code and assets effectively during React development.

### **Module 3: Components and Props:**

#### **Functional Components:**

-   **Functional Component Definition:**
    A functional component is a JavaScript function that takes `props` (short for properties) as an argument and returns React elements. It is a simple way to define stateless or presentational components.

    **Example:**

    ```jsx
    const Greeting = (props) => {
        return <h1>Hello, {props.name}!</h1>;
    };
    ```

    **Usage:**

    ```jsx
    <Greeting name="John" />
    ```

#### **Class Components:**

-   **Class Component Definition:**
    Class components are ES6 classes that extend `React.Component`. They have a `render` method and can have state and lifecycle methods.

    **Example:**

    ```jsx
    class Welcome extends React.Component {
        render() {
            return <h1>Welcome, {this.props.user}!</h1>;
        }
    }
    ```

    **Usage:**

    ```jsx
    <Welcome user="Alice" />
    ```

#### **Props and PropTypes:**

-   **Props in Functional Components:**
    Props are passed as arguments to functional components and accessed as properties of the `props` object.

    **Example:**

    ```jsx
    const Person = (props) => {
        return (
            <p>
                Name: {props.name}, Age: {props.age}
            </p>
        );
    };
    ```

    **Usage:**

    ```jsx
    <Person name="Bob" age={30} />
    ```

-   **PropTypes for Type Checking:**
    PropTypes is a library for type-checking props during development. It helps catch bugs related to incorrect prop types.

    **Example:**

    ```jsx
    import PropTypes from "prop-types";

    const Book = (props) => {
        return <h2>Title: {props.title}</h2>;
    };

    Book.propTypes = {
        title: PropTypes.string.isRequired,
    };
    ```

#### **State and setState:**

-   **State in Class Components:**
    State is used for managing component-specific data that may change over time. Class components can have state.

    **Example:**

    ```jsx
    class Counter extends React.Component {
        constructor(props) {
            super(props);
            this.state = { count: 0 };
        }

        render() {
            return (
                <div>
                    <p>Count: {this.state.count}</p>
                </div>
            );
        }
    }
    ```

-   **setState for Updating State:**
    `setState` is used to update the state of a component.

    **Example:**

    ```jsx
    class Counter extends React.Component {
        constructor(props) {
            super(props);
            this.state = { count: 0 };
        }

        handleClick = () => {
            this.setState({ count: this.state.count + 1 });
        };

        render() {
            return (
                <div>
                    <p>Count: {this.state.count}</p>
                    <button onClick={this.handleClick}>Increment</button>
                </div>
            );
        }
    }
    ```

### **Module 4: JSX (JavaScript XML):**

#### **Understanding JSX Syntax:**

JSX, or JavaScript XML, is a syntax extension for JavaScript. It allows you to write HTML-like code in your JavaScript files, making it easier to describe what the UI should look like.

```jsx
const element = <h1>Hello, JSX!</h1>;
```

In this example, the JSX `<h1>Hello, JSX!</h1>` gets transpiled into a `React.createElement` function call during the compilation process.

#### **JSX Expressions:**

You can embed JavaScript expressions within curly braces `{}` in JSX. This allows you to dynamically include values or execute functions.

```jsx
const name = "John";
const element = <p>Hello, {name}!</p>;
```

#### **Conditional Rendering in JSX:**

-   **Using Ternary Operator:**

    ```jsx
    const isLoggedIn = true;
    const greeting = isLoggedIn ? <p>Welcome back!</p> : <p>Please log in</p>;
    ```

-   **Using Logical && Operator:**

    ```jsx
    const hasMessages = true;
    const messages = hasMessages && <p>You have new messages</p>;
    ```

-   **Using Conditional Statements:**

    ```jsx
    function Greeting({ isLoggedIn }) {
        if (isLoggedIn) {
            return <p>Welcome back!</p>;
        } else {
            return <p>Please log in</p>;
        }
    }
    ```

### **Module 5: Handling Events:**

#### **Event Handling in React:**

```jsx
function handleClick() {
    console.log("Button Clicked");
}

const buttonElement = <button onClick={handleClick}>Click me</button>;
```

#### **Binding Event Handlers:**

-   **Binding in Class Components:**

    ```jsx
    class ButtonClick extends React.Component {
        constructor(props) {
            super(props);
            this.handleClick = this.handleClick.bind(this);
        }

        handleClick() {
            console.log("Button Clicked");
        }

        render() {
            return <button onClick={this.handleClick}>Click me</button>;
        }
    }
    ```

-   **Binding with Arrow Function:**

    ```jsx
    class ButtonClick extends React.Component {
        handleClick = () => {
            console.log("Button Clicked");
        };

        render() {
            return <button onClick={this.handleClick}>Click me</button>;
        }
    }
    ```

#### **Passing Parameters to Event Handlers:**

```jsx
class ParameterExample extends React.Component {
    handleClick = (param) => {
        console.log("Button Clicked with parameter:", param);
    };

    render() {
        const paramValue = "Hello, React!";
        return (
            <button onClick={() => this.handleClick(paramValue)}>
                Click me with parameter
            </button>
        );
    }
}
```

### **Module 6: Lists and Keys:**

#### **Rendering Lists in React:**

```jsx
const numbers = [1, 2, 3, 4, 5];

const ListComponent = () => {
    return (
        <ul>
            {numbers.map((number) => (
                <li key={number}>{number}</li>
            ))}
        </ul>
    );
};
```

#### **Keys and Their Importance:**

In React, the `key` attribute is a special attribute used to uniquely identify elements in a list. It helps React identify which items have changed, are added, or are removed.

```jsx
const ListComponent = () => {
    const users = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
    ];

    return (
        <ul>
            {users.map((user) => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
};
```

### **Module 7: Forms in React:**

#### **Controlled Components:**

```jsx
class ControlledForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: "",
        };
    }

    handleChange = (event) => {
        this.setState({ inputValue: event.target.value });
    };

    render() {
        return (
            <form>
                <label>
                    Name:
                    <input
                        type="text"
                        value={this.state.inputValue}
                        onChange={this.handleChange}
                    />
                </label>
            </form>
        );
    }
}
```

#### **Handling Form Submission:**

```jsx
class FormSubmission extends React.Component {
    handleSubmit = (event) => {
        event.preventDefault();
        // Process form data here
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <button type="submit">Submit</button>
            </form>
        );
    }
}
```

### **Module 8: Component Lifecycle:**

#### **Mounting, Updating, and Unmounting Phases:**

React components go through three main phases: mounting, updating, and unmounting.

#### **Lifecycle Methods:**

-   **Mounting:** `constructor()`, `render()`, `componentDidMount()`
-   **Updating:** `shouldComponentUpdate()`, `render()`, `componentDidUpdate()`
-   **Unmounting:** `componentWillUnmount()`

**Example:**

```jsx
class LifecycleExample extends React.Component {
    constructor(props) {
        super(props);
        console.log("Constructor");
    }

    componentDidMount() {
        console.log("Component did mount");
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("Component did update");
    }

    componentWillUnmount() {
        console.log("Component will unmount");
    }

    render() {
        console.log("Render");
        return <p>Component Lifecycle Example</p>;
    }
}
```

#### **`useEffect` Hook:**

In functional components, the `useEffect` hook is used to perform side effects.

```jsx
import React, { useEffect } from "react";

const EffectExample = () => {
    useEffect(() => {
        console.log("Component did mount (equivalent)");
        return () => {
            console.log("Component will unmount (equivalent)");
        };
    }, []);

    return <p>Effect Example</p>;
};
```

### **Module 9: State Management:**

#### **Context API:**

```jsx
const ThemeContext = React.createContext();

const App = () => {
    const theme = "light";

    return (
        <ThemeContext.Provider value={theme}>
            <Toolbar />
        </ThemeContext.Provider>
    );
};

const ThemedButton = () => {
    const theme = useContext(ThemeContext);
    return <button style={{ background: theme }}>Themed Button</button>;
};
```

#### **State Lifting:**

```jsx
const ParentComponent = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <ChildComponent count={count} increment={increment} />
        </div>
    );
};

const ChildComponent = ({ count, increment }) => {
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    );
};
```

#### **Redux (Introduction):**

```bash
npm install redux react-redux
```

```jsx
const increment = () => {
    return { type: "INCREMENT" };
};

const counterReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case "INCREMENT":
            return { count: state.count + 1 };
        default:
            return state;
    }
};

const store = createStore(counterReducer);

const CounterComponent = () => {
    const count = useSelector((state) => state.count);
    const dispatch = useDispatch();

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => dispatch(increment())}>Increment</button>
        </div>
    );
};
```

### **Module 10: Routing in React:**

#### **React Router:**

```bash
npm install react-router-dom
```

```jsx
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Home = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                    </ul>
                </nav>

                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
            </div>
        </Router>
    );
};
```

#### **Navigation with `useHistory` Hook:**

```jsx
import { useHistory } from "react-router-dom";

const NavigationComponent = () => {
    const history = useHistory();

    const handleClick = () => {
        history.push("/about");
    };

    return (
        <div>
            <button onClick={handleClick}>Go to About</button>
        </div>
    );
};
```

### **Module 11: Hooks:**

#### **useState:**

```jsx
import React, { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    );
};
```

#### **useEffect:**

```jsx
import React, { useState, useEffect } from "react";

const DataFetchingComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://api.example.com/data")
            .then((response) => response.json())
            .then((result) => setData(result));
    }, []);

    return (
        <div>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};
```

#### **useContext:**

```jsx
import React, { useContext } from "react";

const ThemeContext = React.createContext("light");

const ThemedComponent = () => {
    const theme = useContext(ThemeContext);

    return <p>Current theme: {theme}</p>;
};
```

#### **Custom Hooks:**

```jsx
import { useState, useEffect } from "react";

const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return windowWidth;
};

const WindowWidthComponent = () => {
    const width = useWindowWidth();

    return <p>Window Width: {width}</p>;
};
```

### **Module 12: Higher-Order Components (HOC):**

```jsx
import React from "react";

const withLogger = (WrappedComponent) => {
    class WithLogger extends React.Component {
        componentDidMount() {
            console.log(`Component ${WrappedComponent.name} mounted`);
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    return WithLogger;
};

const MyComponent = () => <p>My Component</p>;

const MyComponentWithLogger = withLogger(MyComponent);
```

### **Module 13: Render Props:**

```jsx
import React from "react";

class MouseTracker extends React.Component {
    state = { x: 0, y: 0 };

    handleMouseMove = (event) => {
        this.setState({ x: event.clientX, y: event.clientY });
    };

    render() {
        return (
            <div
                style={{ height: "100vh" }}
                onMouseMove={this.handleMouseMove}
            >
                {this.props.render(this.state)}
            </div>
        );
    }
}

const App = () => {
    return (
        <MouseTracker
            render={({ x, y }) => (
                <p>
                    Mouse position: {x}, {y}
                </p>
            )}
        />
    );
};
```

### **Module 14: Testing in React:**

```bash
npm install --save-dev jest enzyme enzyme-to-json enzyme-adapter-react-16
```

```jsx
import { shallow } from "enzyme";
import MyComponent from "./MyComponent";

describe("MyComponent", () => {
    it("renders correctly", () => {
        const wrapper = shallow(<MyComponent />);
        expect(wrapper).toMatchSnapshot();
    });

    it("handles click event", () => {
        const mockClick = jest.fn();
        const wrapper = shallow(<MyComponent onClick={mockClick} />);
        wrapper.find("button").simulate("click");
        expect(mockClick).toHaveBeenCalled();
    });
});
```

### **Module 15: Styling in React:**

#### **CSS-in-JS Libraries (styled-components):**

```bash
npm install styled-components
```

```jsx
import styled from "styled-components";

const Button = styled.button`
    background-color: ${(props) => (props.primary ? "blue" : "white")};
    color: ${(props) => (props.primary ? "white" : "black")};
    padding: 10px 20px;
    border: 2px solid blue;
`;

const App = () => {
    return (
        <div>
            <Button primary>Primary Button</Button>
            <Button>Secondary Button</Button>
        </div>
    );
};
```

#### **CSS Modules:**

```jsx
import React from 'react';
import styles from './styles.module.css';

const Button = () => {
  return (
    <button className={styles.button}>
      Click me
    </button>
  );
};
```

### **Module 16: Server Communication:**

#### **Fetch API:**

```jsx
import React, { useEffect, useState } from "react";

const DataFetchingComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://api.example.com/data");
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};
```

#### **Axios:**

```bash
npm install axios
```

```jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const DataFetchingComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://api.example.com/data");
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};
```

### **Module 17: Optimizing Performance:**

#### **Memoization:**

```jsx
import React, { useMemo } from "react";

const ExpensiveComponent = ({ data }) => {
    const processedData = useMemo(() => {
        return data.map((item) => item * 2);
    }, [data]);

    return (
        <div>
            {processedData.map((item) => (
                <p key={item}>{item}</p>
            ))}
        </div>
    );
};
```

#### **PureComponent and React.memo:**

```jsx
import React, { memo } from "react";

const MemoizedComponent = memo(({ data }) => {
    console.log("Rendered!");
    return <p>Memoized Component</p>;
});
```

#### **Performance Tools:**

-   **React DevTools Profiler:** Inspect and identify performance bottlenecks.

-   **React.StrictMode:**

    ```jsx
    const App = () => {
        return <React.StrictMode>{/* Your app components */}</React.StrictMode>;
    };
    ```

### **Module 18: Progressive Web Apps (PWA):**

#### **Registering a Service Worker:**

```jsx
if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
            console.log(
                "Service Worker registered with scope:",
                registration.scope
            );
        })
        .catch((error) => {
            console.error("Error registering Service Worker:", error);
        });
}
```

```js
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("my-cache").then((cache) => {
            return cache.addAll(["/", "/index.html", "/app.js"]);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
```

### **Module 19: Advanced React Patterns:**

#### **Hooks Patterns (useReducer, useContext):**

```jsx
import React, { useReducer } from "react";

const initialState = { count: 0 };

const reducer = (state, action) => {
    switch (action.type) {
        case "increment":
            return { count: state.count + 1 };
        case "decrement":
            return { count: state.count - 1 };
        default:
            return state;
    }
};

const Counter = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: "increment" })}>
                Increment
            </button>
            <button onClick={() => dispatch({ type: "decrement" })}>
                Decrement
            </button>
        </div>
    );
};
```

#### **Compound Components:**

```jsx
import React, { useState } from "react";

const Accordion = ({ children }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
            isOpen: index === openIndex,
            onToggle: () => handleToggle(index),
        })
    );
};

const AccordionItem = ({ isOpen, onToggle, title, children }) => {
    return (
        <div>
            <div onClick={onToggle} style={{ cursor: "pointer" }}>
                <h3>{title}</h3>
            </div>
            {isOpen && <div>{children}</div>}
        </div>
    );
};
```

### **Module 20: React Best Practices:**

#### **Code Splitting:**

```jsx
import React, { lazy, Suspense } from "react";

const LazyComponent = lazy(() => import("./LazyComponent"));

const App = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <LazyComponent />
            </Suspense>
        </div>
    );
};
```

#### **Error Boundaries:**

```jsx
import React, { Component } from "react";

class ErrorBoundary extends Component {
    state = { hasError: false, error: null };

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        logErrorToService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <p>Something went wrong.</p>;
        }

        return this.props.children;
    }
}
```

#### **Accessibility in React:**

```jsx
import React from "react";

const AccessibleButton = ({ onClick, label }) => {
    return (
        <button onClick={onClick} aria-label={label}>
            {label}
        </button>
    );
};
```

### **Module 21: Real-world Project:**

#### **Building a Complete React Application:**

```jsx
// App.js
import React, { useState } from "react";
import TaskList from "./TaskList";
import AddTaskForm from "./AddTaskForm";

const App = () => {
    const [tasks, setTasks] = useState([]);

    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

    return (
        <div>
            <h1>Task Manager</h1>
            <AddTaskForm onAddTask={addTask} />
            <TaskList tasks={tasks} />
        </div>
    );
};

export default App;
```

#### **Integrating with Backend Services:**

```jsx
import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import AddTaskForm from "./AddTaskForm";

const App = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch("https://api.example.com/tasks")
            .then((response) => response.json())
            .then((data) => setTasks(data))
            .catch((error) =>
                console.error("Error fetching tasks:", error)
            );
    }, []);

    const addTask = (task) => {
        fetch("https://api.example.com/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        })
            .then((response) => response.json())
            .then((newTask) => setTasks([...tasks, newTask]))
            .catch((error) => console.error("Error adding task:", error));
    };

    return (
        <div>
            <h1>Task Manager</h1>
            <AddTaskForm onAddTask={addTask} />
            <TaskList tasks={tasks} />
        </div>
    );
};

export default App;
```

### **Module 22: Interview Preparation:**

#### **Common React Interview Questions:**

1. **Explain the difference between functional components and class components in React.**
2. **What is JSX, and how does it differ from HTML?**
3. **How does state differ from props in React?**
4. **What are controlled and uncontrolled components in React forms?**
5. **Explain the React component lifecycle methods.**

#### **Problem-Solving with React:**

**Problem Statement:**
Implement a simple counter component in React that increments or decrements a value based on user actions.

```jsx
import React, { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
};

export default Counter;
```

## Summary

### **1. Introduction to React:**

-   What is React.js?
-   Why use React.js?
-   Virtual DOM concept
-   JSX syntax

### **2. Setting Up Your Development Environment:**

-   Node.js and npm installation
-   Create React App
-   Understanding the project structure

### **3. Components and Props:**

-   Functional components
-   Class components
-   Props and PropTypes
-   State and setState

### **4. JSX (JavaScript XML):**

-   Understanding JSX syntax
-   JSX expressions
-   Conditional rendering in JSX

### **5. Handling Events:**

-   Event handling in React
-   Binding event handlers
-   Using arrow functions for event handlers

### **6. Lists and Keys:**

-   Rendering lists in React
-   Keys and their importance
-   Dynamic lists

### **7-22. Advanced Topics:**

-   Forms, Component Lifecycle, State Management (Context API, Redux)
-   Routing, Hooks, Higher-Order Components, Render Props
-   Testing, Styling, Server Communication, Performance Optimization
-   PWAs, Advanced Patterns, Best Practices, Real-world Projects

## Comparison Tables

### **Real DOM vs Virtual DOM**

| Real DOM                             | Virtual DOM                        |
| ------------------------------------ | ---------------------------------- |
| It updates slow                      | It updates faster                  |
| Can directly update HTML             | Can't directly update HTML         |
| Creates a new DOM if element updates | Updates the JSX if element updates |
| DOM manipulation is very expensive   | DOM manipulation is very easy      |
| Too much of memory wastage           | No memory wastage                  |

### **State vs Props**

| State                                          | Props                                                           |
| ---------------------------------------------- | --------------------------------------------------------------- |
| State is mutable.                              | Props are immutable.                                            |
| State is local to the component.               | Props can be accessed by child components.                      |
| State can be changed by the component itself.  | Props can't be changed by the component itself.                 |
| State affects only the component it's in.      | Props can affect several components, but only in one direction. |

### **Controlled vs Uncontrolled Components**

| Controlled Components                                       | Uncontrolled Components                                       |
| ----------------------------------------------------------- | ------------------------------------------------------------- |
| Form data is handled by a React component.                  | Form data is handled by the DOM itself.                       |
| State is initialized and updated by the component.          | State is handled by the DOM.                                  |
| `setState()` is used to update state.                       | A ref is used to update state.                                |
| Controlled components provide better performance.           | Uncontrolled components use less code.                        |
