---
title: "SQL Recap"
slug: sql-recap
date: 2024-09-23
tags: [SQL, Data Engineering, Databases]
excerpt: "30 SQL problems from basic SELECT to window functions and CTEs — with sample data you can actually run to practice every query."
readingTime: 15
featured: false
---

## SQL Recap

### Basic SQL Queries

1. **Retrieve All Data**:
   Write a query to retrieve all records from a table `employees`.

    ```sql
    SELECT * FROM employees;
    ```

2. **Filter Rows Based on Condition**:
   Write a query to get all employees who have a salary greater than 5000.

    ```sql
    SELECT * FROM employees WHERE salary > 5000;
    ```

3. **Sort Data**:
   Write a query to get all employees sorted by their hire date in descending order.

    ```sql
    SELECT *
    FROM employees
    ORDER BY hire_date DESC;
    ```

4. **Aggregate Function**:
   Write a query to get the average salary of all employees.

    ```sql
    SELECT AVG(salary)
    FROM employees;
    ```

5. **GROUP BY**:
   Write a query to get the total salary paid by each department.

    ```sql
    SELECT department_id, SUM(salary)
    FROM employees
    GROUP BY department_id;
    ```

6. **HAVING Clause**:
   Write a query to get departments where the total salary exceeds 100,000.

    ```sql
    SELECT department_id, SUM(salary)
    FROM employees
    GROUP BY department_id
    HAVING SUM(salary) > 100000;
    ```

7. **INNER JOIN**:
   Write a query to get employee names along with their department names (use tables `employees` and `departments`).

    ```sql
    SELECT e.name, d.department_name
    FROM employees e
    JOIN departments d ON e.department_id = d.department_id;
    ```

8. **LEFT JOIN**:
   Write a query to get all departments along with the names of employees working in those departments (if any).

    ```sql
    SELECT d.department_name, e.name
    FROM departments d
    LEFT JOIN employees e ON d.department_id = e.department_id;
    ```

9. **COUNT Function**:
   Write a query to count the number of employees in each department.

    ```sql
    SELECT department_id, COUNT(*)
    FROM employees
    GROUP BY department_id;
    ```

10. **DISTINCT Values**:
    Write a query to find all unique job titles from the employees' table.

    ```sql
    SELECT DISTINCT job_title
    FROM employees;
    ```

### Intermediate SQL Queries

11. **Subqueries**:
    Write a query to get the names of employees who earn more than the average salary in the company.

    ```sql
    SELECT name
    FROM employees
    WHERE salary > (SELECT AVG(salary) FROM employees);
    ```

12. **Self JOIN**:
    Write a query to find the employees who work under the same manager.

    ```sql
    SELECT e1.name AS employee, e2.name AS manager
    FROM employees e1
    JOIN employees e2 ON e1.manager_id = e2.employee_id;
    ```

13. **CASE Statement**:
    Write a query to categorize employees' salaries as 'Low', 'Medium', or 'High' based on the following:

    -   Salary < 3000: Low
    -   3000 ≤ Salary ≤ 7000: Medium
    -   Salary > 7000: High

    ```sql
    SELECT name,
           CASE
               WHEN salary < 3000 THEN 'Low'
               WHEN salary BETWEEN 3000 AND 7000 THEN 'Medium'
               ELSE 'High'
           END AS salary_category
    FROM employees;
    ```

14. **DATE Functions**:
    Write a query to get the employees who were hired in the last 5 years.

    ```sql
    SELECT *
    FROM employees
    WHERE hire_date >= DATEADD(YEAR, -5, GETDATE());
    ```

15. **UPDATE Query**:
    Write a query to increase the salary of all employees in the 'Sales' department by 10%.

    ```sql
    UPDATE employees
    SET salary = salary * 1.1
    WHERE department_id = (SELECT department_id FROM departments WHERE department_name = 'Sales');
    ```

16. **DELETE Query**:
    Write a query to delete all employees whose performance rating is below 3.

    ```sql
    DELETE FROM employees
    WHERE performance_rating < 3;
    ```

17. **CREATE TABLE**:
    Write a SQL statement to create a table `projects` with the following columns:

    -   project_id (INT, primary key)
    -   project_name (VARCHAR, not null)
    -   start_date (DATE)
    -   end_date (DATE)

    ```sql
    CREATE TABLE projects (
        project_id INT PRIMARY KEY,
        project_name VARCHAR(255) NOT NULL,
        start_date DATE,
        end_date DATE
    );
    ```

18. **ALTER TABLE**:
    Write a SQL query to add a new column `budget` (DECIMAL) to the `projects` table.

    ```sql
    ALTER TABLE projects
    ADD budget DECIMAL(10, 2);
    ```

19. **INSERT INTO**:
    Write a SQL query to insert a new employee into the `employees` table.

    ```sql
    INSERT INTO employees (employee_id, name, salary, hire_date, department_id)
    VALUES (101, 'John Doe', 6000, '2020-05-15', 2);
    ```

20. **UNION Operator**:
    Write a SQL query to combine the list of employee names from the `employees` table and the list of customer names from a `customers` table.

    ```sql
    SELECT name FROM employees
    UNION
    SELECT name FROM customers;
    ```

### Advanced SQL Queries

21. **WITH Clause (CTE)**:
    Write a SQL query using CTE to find the average salary by department and rank them in descending order.

    ```sql
    WITH dept_avg AS (
        SELECT department_id, AVG(salary) AS avg_salary
        FROM employees
        GROUP BY department_id
    )
    SELECT * FROM dept_avg ORDER BY avg_salary DESC;
    ```

22. **Recursive Query**:
    Write a recursive query to find the hierarchy of employees and their managers.

    ```sql
    WITH RECURSIVE EmployeeHierarchy AS (
        SELECT employee_id, name, manager_id
        FROM employees
        WHERE manager_id IS NULL
        UNION ALL
        SELECT e.employee_id, e.name, eh.manager_id
        FROM employees e
        JOIN EmployeeHierarchy eh ON e.manager_id = eh.employee_id
    )
    SELECT * FROM EmployeeHierarchy;
    ```

23. **Window Functions**:
    Write a query to calculate the running total of salaries ordered by hire date.

    ```sql
    SELECT name, salary,
           SUM(salary) OVER (ORDER BY hire_date) AS running_total
    FROM employees;
    ```

24. **RANK() Function**:
    Write a query to rank employees based on their salaries within each department.

    ```sql
    SELECT name, department_id, salary,
           RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS salary_rank
    FROM employees;
    ```

25. **DELETE with Subquery**:
    Write a query to delete employees who have never worked on any project (assume a `projects_employees` table exists).

    ```sql
    DELETE FROM employees
    WHERE employee_id NOT IN (SELECT employee_id FROM projects_employees);
    ```

26. **EXISTS Clause**:
    Write a query to find all employees who are working on at least one project.

    ```sql
    SELECT *
    FROM employees e
    WHERE EXISTS (SELECT 1 FROM projects_employees pe WHERE e.employee_id = pe.employee_id);
    ```

27. **Correlated Subquery**:
    Write a query to get all employees whose salary is greater than the average salary of their department.

    ```sql
    SELECT name, salary
    FROM employees e1
    WHERE salary > (SELECT AVG(salary) FROM employees e2 WHERE e1.department_id = e2.department_id);
    ```

28. **UPDATE with JOIN**:
    Write a query to increase the salary of employees who work on a 'Critical' project by 15%.

    ```sql
    UPDATE e
    SET salary = salary * 1.15
    FROM employees e
    JOIN projects_employees pe ON e.employee_id = pe.employee_id
    JOIN projects p ON pe.project_id = p.project_id
    WHERE p.project_name = 'Critical';
    ```

29. **Partitioning Data**:
    Write a query to get the top 3 highest-paid employees in each department.

    ```sql
    SELECT name, department_id, salary
    FROM (
        SELECT name, department_id, salary,
               RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rank
        FROM employees
    ) ranked_employees
    WHERE rank <= 3;
    ```

30. **PIVOT Query**:
    Write a query to pivot the total salary paid by each department for each job title.

    ```sql
    SELECT *
    FROM (
        SELECT department_id, job_title, SUM(salary) AS total_salary
        FROM employees
        GROUP BY department_id, job_title
    ) AS pivot_data
    ```

---

Here is some sample data that you can use to create tables and practice the SQL queries listed earlier. The data includes records for `employees`, `departments`, `projects`, and `projects_employees` tables.

### Sample SQL Data Creation and Insertion

#### 1. Create Tables

```sql
-- Table for Employees
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    salary DECIMAL(10, 2),
    hire_date DATE,
    department_id INT,
    job_title VARCHAR(100),
    manager_id INT,
    performance_rating INT
);

-- Table for Departments
CREATE TABLE departments (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(100)
);

-- Table for Projects
CREATE TABLE projects (
    project_id INT PRIMARY KEY,
    project_name VARCHAR(100),
    start_date DATE,
    end_date DATE,
    budget DECIMAL(15, 2)
);

-- Table for Project-Employee Relationships
CREATE TABLE projects_employees (
    project_id INT,
    employee_id INT,
    PRIMARY KEY (project_id, employee_id),
    FOREIGN KEY (project_id) REFERENCES projects(project_id),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);
```

#### 2. Insert Sample Data

##### Departments Table

```sql
INSERT INTO departments (department_id, department_name) VALUES
(1, 'Sales'),
(2, 'Engineering'),
(3, 'HR'),
(4, 'Marketing');
```

##### Employees Table

```sql
INSERT INTO employees (employee_id, name, salary, hire_date, department_id, job_title, manager_id, performance_rating) VALUES
(101, 'Alice Johnson', 7500.00, '2018-02-15', 2, 'Senior Engineer', 110, 5),
(102, 'Bob Smith', 5000.00, '2019-06-25', 2, 'Engineer', 101, 4),
(103, 'Charlie Green', 3000.00, '2021-09-17', 1, 'Sales Associate', 0, 3),
(104, 'David White', 4200.00, '2020-05-11', 3, 'HR Specialist', 0, 3),
(105, 'Emma Davis', 6200.00, '2017-03-12', 4, 'Marketing Manager', 0, 5),
(106, 'Frank Wright', 7000.00, '2019-11-08', 1, 'Sales Manager', 0, 4),
(107, 'Grace Lee', 5500.00, '2022-01-30', 2, 'Engineer', 101, 5),
(108, 'Henry Wilson', 4800.00, '2021-06-14', 3, 'HR Specialist', 104, 3),
(109, 'Ivy Clark', 7200.00, '2020-10-23', 4, 'Marketing Specialist', 105, 4),
(110, 'Jack Brown', 9000.00, '2015-07-21', 2, 'Engineering Manager', 0, 5);
```

##### Projects Table

```sql
INSERT INTO projects (project_id, project_name, start_date, end_date, budget) VALUES
(201, 'Website Redesign', '2022-01-01', '2022-06-30', 50000.00),
(202, 'Mobile App Launch', '2022-03-01', '2022-08-31', 75000.00),
(203, 'Critical', '2023-01-01', '2023-12-31', 120000.00),
(204, 'Employee Onboarding', '2021-04-01', '2021-12-31', 30000.00);
```

##### Projects-Employees Table

```sql
INSERT INTO projects_employees (project_id, employee_id) VALUES
(201, 101),
(201, 102),
(202, 105),
(202, 109),
(203, 101),
(203, 107),
(203, 110),
(204, 104),
(204, 108);
```

### Summary of Data

1. **Departments**:

    - Sales, Engineering, HR, Marketing

2. **Employees**:

    - Alice, Bob, Charlie, David, Emma, Frank, Grace, Henry, Ivy, Jack
    - Varying salaries, departments, job titles, performance ratings, and managers

3. **Projects**:

    - Website Redesign, Mobile App Launch, Critical, Employee Onboarding
    - Various start and end dates, with budgets assigned to each project

4. **Projects-Employees**:
    - Lists which employees are working on which projects

---
