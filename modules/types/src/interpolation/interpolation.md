# Interpolation


## Using `StringLiteralTemplate<T>` to define Dynamic Segments

In Typescript we can define `${string}`, `${number}`, and `${boolean}` segments in our types. With the **`StringLiteralTemplate<T>`** utility we can express our intent to have a dynamic segments with static string:

```ts
// `${string}is ${number} years old`
type Dyn = StringLiteralTemplate<`{{string}} is {{number}} years old`>
```

This rather simple transformation, allows us to express dynamic type segments at runtime.

### Variant Literal Utilities

Beyond just being able to set a single string template we can do the same for Objects and Tuples:

```ts
// [ string, `${number}` ]
type Tup = EachAsStringLiteralTemplate<["{{string}}", "{{number}}"]>;
// { greet: `Hi ${string}` }
type Obj = ObjectValuesAsStringLiteralTemplate<{
    greet: "Hi {{string}}"
}>
```

## Using Templates

Beyond

## Utilities

### Type Utilities

