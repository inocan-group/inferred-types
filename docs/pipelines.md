# Pipelines

The runtime utility `pipeline()` provides a variety of ways to run your code more "functionally" while preserving strong types.

## Overview

The `pipeline` symbol in this repo is both a function and a Key/Value of alternative variants of how a pipeline should be processed:

- **Fail Fast**
    - a call directly to `pipeline(a,b,c)` will process the results in a "fail fast" manner
    - each item in the pipeline is evaluated in order
    - each item -- aka, "the payload" -- must be of the type:

    ```ts
    | string | number | boolean
    | symbol | Dictionary | Tuple |
    | undefined | void | null
    | ((input?: Payload) => Payload)
    ```

    - those items in the payload which are a function will be provided the value from the prior item
    - at any point, if an item in the payload is equal to  `Error` or evaluates to `Error` the pipeline is stopped the error is returned.
- **Accumulate**
    - calls to `pipeline.acc(a,b,c)` act the same as the baseline in that an `Error` will terminate the processing, however ...
    - the optional callback function is:

        ```ts
        (input?: Payload[]) => Payload
        ```

    - a successful conclusion of the pipeline is a tuple of all steps outputs
    - if an `Error` is introduced during the pipeline, the error will have a property `pipeline` in it which will have any successful steps in it to aid in handling the error.

- **Results**
    - a call to `pipeline.result(a,b,c)(e1,e2)` will process results similar to how **Rust**'s `Result` type works.

## But Wait ... that's not all

> Yes, the heading was a desperate attempt to mimic Steve Jobs

In addition to the `pipeline` symbol there is an identically shaped `asyncPipeline()` except that the callbacks are asynchronous functions.

## Strong Types

The goal with everything in this repo is to preserve strong and narrow types where ever possible. The `pipeline()` and `asyncPipeline()` functions are no different.

Let's demonstrate this with an example:

```ts

```
