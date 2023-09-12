# Type Comparison and Conversion

## Overview

These types are intended to provide higher order combinations of common type transforms. The building blocks are:

- **Type Comparisons**, validate that a type `T` meets some type criteria:
  
  A _comparison_ is made up of:
  
  - an operation (which extends `TypeComparisonOp`),
  - and a set of parameters where parameters must _extend_ `readonly unknown[]`
  
    > Note: each operation in `TypeComparisonOp` also has a _specific type_ for the parameters it expects and this can be derived by using the `ParamsForComparisonOp<T>` utility.
  
  A configured comparison is typically bundled as a `Matcher`. This expression can not yet be evaluated to a true/false value yet because an _input_ type has not yet been applied but in this state it can serve as a useful part of a `Transform`, a `MapType` operation, and more.

  The `ComparisonExpression` is structured as a tuple which looks like:

  ```ts
  [op: TypeComparisonOp, params: readonly unknown[], handler: TypeComparisonHandler | never]
  ```

  While the first two parts of this structure have been discussed, the `handler` aspect of the type has not. This part is meant to instruct surrounding run-time and design-time utilities to manage how to handle a failure in the comparison when it is applied:

  - `skip` - tells utilities that if the comparison fails, to move forward as if nothing had happened (aka, in most case this just means proxying through the input value "as is")
  - `exclude` - acts similarly to `skip` but narrows the _type_ of the input to exclude

- **Type Conversions**, to create a ...
- **Transformation Pipeline**

Key design goals include:

- Working with Runtime

  All types represented here work closely with the runtime components to create a solution that is intended to allow fluid movement between the type and runtime systems.

- Allowing comparisons and conversions to be used atomically or in _combination_ with others to create a **composable** framework of types and values.

## Data Types

### Available Operations

- `TypeComparison`
  - a union of all comparison operations
  - sub categories are also available as `TypeComparison_String`, `TypeComparison_Number`, etc. where the ending part of the name indicates the required _type_ for this comparison to be made.
- `TypeConversion`
  - a union of all conversion operations
  - sub categories are also available here too (e.g., `TypeConversion_String`)

### Rules

A rule type encapsulates both conditional logic on when it should be executed as well as what transformation it will perform.

> Note: the `Always` and `Never` conditions are available and can be used to explicitly include or exclude a rule from being executed.

- `UnboundedTypeRule`
  
  Represents the combination of a _comparator_ and _transformer_ together but without a _value_ to compare against. Specifically the structure is:
  - a _comparator_ which specifies the comparison operator to use when determining whether to execute the rule or not
  - a _transformer_ which describes the operation or operations to run when the comparator return true
  - optionally a _descriptor_ provides type documentation on the rule
- `BoundedTypeRule`
  - the same as a `TypeTransformRule` but where _one_ of the two types used by the _comparator_ is already known.
  - the tuple structure is:

    ```ts
    const example = readonly [
        comparator: "Extends",
        value: string,
        transformer: ["StartsWith", "- "]
        desc: "..."
    ];
    ```

- `TypeRule` is a union of the two above rule types

This folder contains type utils which are used by:

- `ConvertType`
- `MapType`
- and `TypeMapRule`

the symbols for these types are not exported as part of the default export of this repo.

### Examples

Here's an example of how you can combine more than one rule into a _pipeline_ of transforms:

```ts
// define a pipeline
type EnsureString = UnboundedTypeRule<>;
type Camelize = UnboundedTypeRule<>;
type Pipeline = [EnsureString, Camelize];
// then use it to convert one type to another
type MyVar = 
```
