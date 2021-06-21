## Builder API States

### Mutation Identity Functions

Initially the user defines the API, to do this they need a reference to _state_ prior to it actually being set. This is achieved with a higher order function called a `MutationIdentity`:

// f(a) => a
// a === a + 0
// a === a * 1

```ts
type State = { foo: number, bar: number };
const f1 = (s: State) => (addToFoo: number) => { ...s, foo: s.foo + addToFoo };
```

### Identity API

Ultimately functions like the one above are brought together into a dictionary to form a `MutationIdentityApi`. This is passed into the **Builder** along type a _type-guard_ which validates when configuration can be considered "done".

```ts
const api = { ...f1, ...f2 };
const validation = (state: unknown): state is State {...};
const b = Builder(api, validation, {});
```

### Mutation API

The builder converts the dictionary mutation identity function into mutation functions. So, the `f1` function we defined earlier exposes a function that looks like this:

```ts
f1: (addToFoo: number) => { ...s, foo: s.foo + addToFoo };
```

this is a first step but can't be exposed as a builder as it returns _state_ rather than the same fluent API.

### Fluent API Proxy

The builder instead, wraps this function into a proxy which allows calls that the user makes to this into Fluent API:

```ts
const fluentApi: FluentApi<MutationApi> = {
  f1: (addToFoo: number) => FluentApi<MutationApi>,
  f2: () => FleuntApi<MutationApi>
}
```