# Filter Operations



## Base Utilities

- the base utilities for reducing a tuple list to a smaller number of items are:
  - `RemoveNotExtends`, `RemoveEquals`, `RemoveNotEqual`
  - `RetainNotExtends`, `RetainEquals`, `RetainNotEqual`
- all of these utilities provide the signature of:
  
  ```ts
  RemoveNotExtends<TList, TCompareTo>;
  RetainNotExtends<TList, TCompareTo>;
  // ...
  ```

- the naming of the utility indicates the _operation_ which will be performed on each of the items in `TList`.

> while these base types are great, there are further abstractions which may make your
> types look clearer.

## Operation Aggregation

- the `RetainFromList` and `RemoveFromList` represent the same functional utility as the base utilities but offer the "operation" as a parameter
- the signatures are:

  ```ts
  RetainFromList<TList, TOp, TCompareTo>;
  RemoveFromList<TList, TOp, TCompareTo>;
  ```

  Where:
  - `TList` represents the starting list,
  - `TOp` is one of the following _operations_:
    - `extends`, `equals`
    - `extends(unionize)`
    - `does-not-extend`, `does-not-equal`,
    - `does-not-extends(unionize)`
  - and `TCompareTo` is the value each item in `TList` will be compared to

## `Filter` and `Retain`

The final abstraction is represented by the `Filter` and `Retain` utilities.
