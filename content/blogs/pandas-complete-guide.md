---
title: "Pandas — A Complete Reference Guide"
slug: pandas-complete-guide
date: 2023-10-10
tags: [Data Science, Python, Pandas]
excerpt: "A living reference for Pandas — data structures, DataFrame operations, cleaning, and every command I use day-to-day."
readingTime: 7
featured: false
---

> This is a work under progress. I will be updating this blog as I learn more about Pandas.

# Pandas - Python Data Analysis Library

## What is Pandas?

Pandas is a Python library used for working with data sets. It has functions for analyzing, cleaning, exploring, and manipulating data. The name "Pandas" has a reference to both "Panel Data", and "Python Data Analysis" and was created by Wes McKinney in 2008.

## Why Use Pandas?

Pandas allows us to analyze big data and make conclusions based on statistical theories. Pandas can clean messy data sets, and make them readable and relevant. Relevant data is very important in data science.

## What Can Pandas Do?

Pandas gives you answers about the data. Like:

-   Is there a correlation between two or more columns?
-   What is average value?
-   Max value?
-   Min value?

Pandas are also able to delete rows that are not relevant, or contains wrong values, like empty or NULL values. This is called cleaning the data.

## Where is the Pandas Codebase?

The source code for Pandas is located at this github repository.

## How to install Pandas?

Pandas is a third party library and can be installed using pip.

```python
pip install pandas
```

## How to import Pandas?

Once Pandas is installed, it can be imported using the following command.

```python
import pandas as pd
```

## Pandas Data Structures

Pandas deals with the following three data structures −

-   Series
-   DataFrame
-   Panel

These data structures are built on top of Numpy array, which means they are fast.

### Series

Series is a one-dimensional array like structure with homogeneous data.

### DataFrame

DataFrame is a two-dimensional array with heterogeneous data.

### Panel

Panel is a three-dimensional data structure with heterogeneous data.

## Pandas - Series

A Pandas Series is like a column in a table. It is a one-dimensional array holding data of any type.

### Create a Series

A Pandas Series can be created using the following constructor −

```python
pandas.Series( data, index, dtype, copy)
```

Here, data can be many different things:

-   a Python dict
-   an ndarray
-   a scalar value (like 5)

The passed index is a list of axis labels. Thus, this separates into a few cases depending on what data is:

#### Create an Empty Series

A basic series, which can be created is an Empty Series.

```python
import pandas as pd
s = pd.Series()
print (s)
```

#### Create a Series from ndarray

If data is an ndarray, then index passed must be of the same length. If no index is passed, then by default index will be range(n) where n is array length, i.e., [0,1,2,3…. range(len(array))-1].

```python
import pandas as pd
import numpy as np
```

#### Create a Series from dict

A dict can be passed as input and if no index is specified, then the dictionary keys are taken in a sorted order to construct index. If index is passed, the values in data corresponding to the labels in the index will be pulled out.

```python
import pandas as pd
import numpy as np
```

#### Create a Series from Scalar

If data is a scalar value, an index must be provided. The value will be repeated to match the length of index.

```python
import pandas as pd
import numpy as np
```

### Accessing Data from Series with Position

Data in the series can be accessed similar to that in an ndarray.

```python
import pandas as pd
import numpy as np
```
