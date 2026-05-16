---
title: "System Design"
slug: system-design
date: 2024-12-16
tags: [System Design, Engineering, Architecture]
excerpt: "The core concepts of system design — scalability, caching, load balancing, database replication, and sharding — with diagrams and real-world examples."
readingTime: 15
featured: false
---

## System Design

## **1. Scalability**

Scalability is the ability of a system to handle increased load by adding resources (servers, CPUs, RAM, etc.). It's one of the most critical aspects of **system design** when dealing with growing users and data.

There are **two main approaches** to scalability:

1. **Vertical Scaling (Scale-Up)**
2. **Horizontal Scaling (Scale-Out)**

---

### **Vertical Scaling (Scale-Up)**

### **Theory**:

Vertical scaling refers to increasing the **capacity** of a single server (e.g., adding more CPU, RAM, or disk space). Think of it like upgrading a computer to make it faster and handle more load.

#### **Diagram**:

```
Single Server (Low capacity)
      │
      ▼
+---------------+
|    Server 1   |  ← Upgrade CPU/RAM/Storage
+---------------+
      │
      ▼
Improved Single Server (High capacity)
```

#### **Example**:

Suppose you have a small e-commerce website running on one server. To handle more traffic, you add:

-   A faster **CPU** to process more requests.
-   More **RAM** to handle larger applications in memory.
-   Larger **disks** to store more data.

The server now performs better but still has its limitations.

---

#### **Pros and Cons**:

| **Pros**                             | **Cons**                                       |
| ------------------------------------ | ---------------------------------------------- |
| Simple to implement and manage.      | Hardware has physical limits (CPU, RAM, etc.). |
| No changes in software architecture. | Single point of failure if the server crashes. |
| Good for low traffic systems.        | Expensive for very high-end hardware.          |

---

### **Horizontal Scaling (Scale-Out)**

#### **Theory**:

Horizontal scaling involves adding **more servers** to the system. Instead of upgrading a single server, you distribute the load across multiple servers.

This approach is much better for handling **large-scale traffic**.

#### **Diagram**:

```
         +---------------+         +---------------+
Clients  →|  Load Balancer |------->|    Server 1   |
         +---------------+         +---------------+
                 │                         │
                 ▼                         ▼
         +---------------+         +---------------+
         |    Server 2   |         |    Server 3   |
         +---------------+         +---------------+
```

#### **Example**:

Imagine an online streaming platform like **YouTube**. To serve millions of users:

-   Requests are **distributed** across multiple servers using a **load balancer**.
-   More servers can be added to scale with increasing traffic.

---

#### **Pros and Cons**:

| **Pros**                                 | **Cons**                                       |
| ---------------------------------------- | ---------------------------------------------- |
| No single point of failure (redundancy). | More complex to implement and manage.          |
| Can handle unlimited traffic.            | Requires load balancing and data replication.  |
| Flexible and cost-effective.             | Ensuring consistency across servers is harder. |

---

#### **Comparison Between Vertical and Horizontal Scaling**:

| **Feature**          | **Vertical Scaling**             | **Horizontal Scaling**                 |
| -------------------- | -------------------------------- | -------------------------------------- |
| Scaling approach     | Add resources to a single server | Add more servers.                      |
| Limitations          | Hardware limits                  | Nearly unlimited.                      |
| Cost                 | Expensive hardware upgrades      | Cost-effective with commodity servers. |
| Complexity           | Low                              | Higher (load balancing, etc.).         |
| Single point failure | Yes                              | No (redundant servers).                |

---

### **Caching**

#### **Theory**:

**Caching** involves storing frequently accessed data in a temporary, fast-access location (like memory). This reduces the load on databases and speeds up response times.

Caches can be:

-   **Client-side** (e.g., browser caching).
-   **Server-side** (e.g., Redis, Memcached).

---

#### **Diagram**:

```
          +------------------+
          |   Application    |
          +------------------+
                    │
   +----------------▼---------------+
   |             Cache              |
   | (e.g., Redis, Memcached)       |
   +----------------▲---------------+
                    │
          +------------------+
          |    Database      |
          +------------------+
```

#### **Example**:

A user frequently views their profile on a social media app. To avoid repeatedly querying the database:

1. User's profile data is cached in **Redis**.
2. On subsequent requests, the server retrieves data from the **cache**.

---

#### **Types of Caching**:

1. **Read-through Cache**: Data is fetched from the database and stored in the cache when requested.
2. **Write-through Cache**: Updates are written to the cache and database simultaneously.
3. **Cache-aside**: Application decides what to cache.
4. **CDN (Content Delivery Network)**: Caches static content (e.g., images, videos).

---

#### **Eviction Policies**:

When cache is full, **old data** must be evicted:

-   **LRU (Least Recently Used)**.
-   **LFU (Least Frequently Used)**.
-   **FIFO (First In, First Out)**.

---

### **Load Balancing**

#### **Theory**:

**Load balancing** distributes incoming requests across multiple servers to:

1. Prevent overloading any single server.
2. Ensure high availability and fault tolerance.

---

#### **Diagram**:

```
       Clients
          │
          ▼
 +------------------+
 |  Load Balancer   |
 +------------------+
    │      │      │
    ▼      ▼      ▼
+-------+ +-------+ +-------+
|Server 1| |Server 2| |Server 3|
+-------+ +-------+ +-------+
```

#### **Types of Load Balancers**:

1. **DNS-based**: DNS resolves requests to different servers.
2. **Layer 4 (Transport)**: Balances traffic based on IP and port.
3. **Layer 7 (Application)**: Balances traffic based on application data (e.g., URL, cookies).

---

#### **Example**:

Imagine **Google Search**. Millions of requests are handled simultaneously by:

1. A **load balancer** that routes user requests to healthy servers.
2. Servers handle the requests and send responses back.

---

#### **Benefits**:

-   Improves reliability and fault tolerance.
-   Enables scaling by adding more servers.
-   Prevents a single server from being overwhelmed.

---

### **Database Replication**

#### **Theory**:

Database replication involves **copying data** from a master database to one or more replica databases. This improves:

-   **Read performance**.
-   **Availability**.

---

#### **Diagram**:

```
     +------------------+
     |   Master DB      |
     +--------▲---------+
              │
   +----------▼-----------+
   |       Replica DBs    |
   +-----------+----------+
        │             │
        ▼             ▼
+-------------+ +-------------+
| Read Query  | | Read Query  |
+-------------+ +-------------+
```

#### **Types**:

1. **Master-Slave Replication**:

    - Writes go to the **master**.
    - Reads go to **replicas**.

2. **Master-Master Replication**:
    - Both nodes handle reads and writes.

---

#### **Example**:

In a global app like **Instagram**:

-   A **master database** handles all write operations.
-   Multiple **replica databases** handle read operations.

---

### **Database Partitioning (Sharding)**

#### **Theory**:

Partitioning (sharding) splits large databases into **smaller, manageable parts** (shards). Each shard contains a subset of the data.

---

#### **Diagram**:

```
          +--------------------+
          |    Load Balancer   |
          +---------▲----------+
                    │
  +---------+-------+-------+---------+
  | Shard 1 | Shard 2 | Shard 3 | Shard 4 |
  +---------+---------+---------+---------+
```

#### **Example**:

In a large user database:

-   Data is partitioned by **User ID**.
    -   Shard 1: User IDs 0-999.
    -   Shard 2: User IDs 1000-1999.
    -   Shard 3: User IDs 2000-2999.

#### **Benefits**:

-   Improves performance for large-scale data.
-   Each shard can be managed independently.

---

#### **Challenges**:

-   Selecting the right **shard key** (e.g., User ID).
-   Data redistribution when shards grow unevenly.

---

## **Summary**

| **Concept**           | **Purpose**                                 |
| --------------------- | ------------------------------------------- |
| Vertical Scaling      | Add resources to a single server.           |
| Horizontal Scaling    | Add more servers to handle the load.        |
| Caching               | Speed up responses using temporary storage. |
| Load Balancing        | Distribute traffic across servers.          |
| Database Replication  | Copy data to improve read performance.      |
| Database Partitioning | Split data into smaller, manageable parts.  |

---
