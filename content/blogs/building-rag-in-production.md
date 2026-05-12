---
title: "Six Months of Production RAG: What the Tutorials Don't Tell You"
slug: building-rag-in-production
date: 2025-08-14
tags: [Machine Learning, LLM, Engineering, RAG]
excerpt: "The demo always works. The retrieval pipeline that handles 1,000 ZIP codes, multilingual queries, and users who type 'house in good school district' is a different problem."
readingTime: 8
featured: false
---

The RAG tutorial pipeline is elegant. You chunk your documents, embed them, store them in a vector database, and at query time you retrieve the top-k chunks and pass them to an LLM. Ten lines of LangChain. Works great on the example dataset.

Building [Keya AI](/project/keya-ai) — an agentic real estate assistant covering 1,000+ ZIP codes — broke most of my assumptions about what production RAG actually requires.

## The retrieval problem is not the embedding problem

The standard tutorial treats retrieval as "find semantically similar chunks." That works when your queries and documents live in the same conceptual space. In real estate, they often don't.

A user asking for "a house near good schools" is not asking for documents about school districts. They're asking for a *filtered search* that requires:
1. Understanding "good schools" as a structured query (GreatSchools rating ≥ 8, or API score ≥ 800)
2. Geospatial reasoning (define "near" relative to the property location)
3. Real-time data (school ratings change; transit data changes)

Embedding similarity gets you none of this. You need a hybrid retrieval system where the LLM generates a structured query, not just a semantic search vector.

This is what the agent tools in Keya are actually doing. The eight tools aren't wrappers around vector search — they're structured API calls to transit data providers, school rating databases, and mortgage calculators. The LLM's job is to decide which tools to call and in what order, not to retrieve text.

## Chunking strategy is domain-specific

Most tutorials recommend fixed-size chunking (512 tokens is popular) or sentence-based chunking. For property listings, neither works well.

A listing description like "updated kitchen, hardwood floors throughout, finished basement with wet bar, quiet cul-de-sac, walking distance to train" is a semantic unit. Splitting it at 512 tokens in the middle of a sentence loses the coherent picture. But keeping the entire listing as one chunk means your embedding is averaging over 40 different features, diluting retrieval precision.

We ended up with a structured chunking strategy: each listing generates multiple chunks for different semantic aspects (location, amenities, price history, nearby points of interest), each embedded and stored separately, with the listing ID as a join key. Retrieval becomes a multi-vector lookup followed by a join, not a single nearest-neighbor search.

This is overkill for a Q&A bot over internal docs. It's necessary for a system where "3-bedroom in Lincoln Park under $600k with parking" needs to simultaneously match on bedroom count (structured), neighborhood (geospatial), price (structured range), and parking (feature extraction from description).

## Multilingual retrieval without multilingual embeddings

The system needed to handle queries in four languages (English, Spanish, Hindi, Mandarin) while the underlying property data was entirely in English.

The naive solution — translate everything and embed in English — works but loses nuance in translation. The better solution was a query-side translation layer: translate the user query to English, perform retrieval in English, and then translate the retrieved context and the response back. This keeps the embedding space homogeneous while supporting multilingual interaction.

The tricky part is that translation isn't lossless. "Cerca del metro" (near the metro) translates cleanly. Colloquial descriptions of neighborhoods don't. We ended up keeping the original query alongside the translation and using both in a re-ranking step.

## The context window is a budget, not a limit

Early in the project, I was trying to maximize the amount of retrieved context — more listings, more data. The responses were verbose and unfocused.

The better framing: **the context window is a budget**. Every token in the context costs latency and money, and competes with every other token for the model's attention. More retrieved context doesn't mean better answers; it often means the model averages over conflicting signals instead of synthesizing a coherent recommendation.

We settled on a re-ranking step after retrieval: retrieve the top 20 candidates, run a smaller scoring model to rank them by relevance to the specific query, and pass only the top 5 to the LLM with full detail. This cut context size by 75% and improved answer quality.

## What I'd do differently

The biggest mistake was building the vector retrieval pipeline before understanding the query patterns. I spent two weeks tuning embedding models and chunking strategies before realizing that most high-value queries required structured lookups, not semantic search. Starting with a query log analysis (even synthetic) would have saved most of that time.

The second mistake was treating the LLM as the bottleneck. It's not — it's the fastest part of the system. The slow parts are the external API calls, the vector database lookups, and the re-ranking step. Parallelizing the tool calls was the single biggest latency improvement.

RAG systems fail in boring ways: slow retrieval, irrelevant context, hallucinated structured data that wasn't in any retrieved chunk. The tutorials show you how to build the happy path. Production requires you to instrument, monitor, and debug every step of the pipeline like you'd debug any other distributed system.

---

*The full system is described on the [Keya AI project page](/project/keya-ai). LangChain, Azure OpenAI, and Azure Cognitive Search were the main stack.*
