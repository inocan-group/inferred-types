# Builder

Aim is to pass in an API and a _target_ state and let the `Builder()` function manage the process. This includes:

1. Allowing the API to indicate which API endpoints can only be called once
2. Indicate when the configuration has reached a "completed" state (aka, there may be _more_ config you **can** do but no more that is **required**)


## Key Builder States

A builder's primary responsibility is about building up a _target state_ **`TS`** from an _initial state_ **`IS`**. 

- The consumer of the builder must explicitly state **`TS`** as part of initialization

    ```ts
    type TS = { foo: number, bar: number, baz?: string };
    const config = Builder<TS>(api, { foo:0, bar: 0 });
    ```

- The _initial state_ **`IS`** will automatically be assigned to `Partial<TS>`
- The consumer's API should not mutate state directly but instead return a `Partial<TS>` representing the updated state.

    ```ts
    const api = ApiBuilder<TS>({
        incFoo: (s) => () => {
            return { ...s, foo: foo++};
        },
        setBar: (s) => (bar: number) => {
            return { ...s, bar };
        }
    });
    ```

- If the API wants to exclude _itself_ or other parts of the API to the caller after being called then a rather than returning `T` it would instead return a tuple: `[ [T], "col", "col2" ]`:

    ```ts
    const api = ApiBuilder<TS>({
        name: (s) => (name: string) => {
            return [ { ...s, name }, "name" ];
        }
    });
    ```

- The Builder will proxy requests to the API definition and when it gets the updated state, it will:
  - validate whether this new state represents a _completed_ state **`CS`**
    - If completed, the builder returns `Completed<Api<TS, E>>`
    - If _not_ completed the builder returns `Api<TS, E>`
  - in both cases:
    - the API that the consumer gets back is the same fluent API surface
    - the API is pruned from the column names in `E`
  - the `Completed<Api<T>>` typing is used to act as a hint to the `Unwrap()` function
- The `Unwrap()` function is designed to unwrap the state contained by the builder:

    - if the API has been completed then **`TS`** will be returned
    - if not then **`Partial<TS>`** will be returned


## Interaction Diagram
The below diagram is meant to represent the Key States flow described above:

   ```mermaid
   sequenceDiagram
       participant App;
       participant Builder;
       participant API;

       App->>App: create TS target STATE

       
       App->>Builder: configure Builder w/ API and initial STATE
       activate Builder
       Builder->>API: store API
       activate API
       API-->>Builder: 
       deactivate API

       Builder->>App: returns <TApi> proxy interface
       deactivate Builder;


       App->>Builder: call API
       activate Builder
       
       Builder->>API: proxy through API req
       activate API
       API-->>API: mutate state
       API->>Builder: response
       deactivate API
       Builder-->>Builder: validate whether completed
       Builder->>App: return either <TApi> or Completed<TApi>
       deactivate Builder
   ```


