# Runtime Types

> in `inferred-types`

[&lt;- back](../README.md)

## Goals

There are two primary objectives for this library's definition of "runtime types":

1. Variance in types between design time and runtime
2. Serialization and modeling capabilities of "runtime types"

Let's explore what we mean by both:

### Variance in Types

In Typescript the _types_ live in a sort of unholy alliance with the runtime system. Don't get me wrong, I'm a big fan of Typescript but it can be awkward -- particular for library authors -- when the type understanding deviates between the runtime system and the type system.

A few examples of this are:
 
1. Functions

    In the type system we can be very explicit about both the parameters and the return types of a function yet at runtime all we can tell is that some **x** _is_ a function but nothing about it's characteristics.

2. Literal Types

    There is also a loss in definition with the **literal** types of _string_, _number_, and _boolean_. These types don't just express their identity to the wide type group but rather express a much more fine grained subset of values which the type system helps us preserve _at_ design time but there times where this distinction at _run time_ can also be useful.

### Serialization and Modelling

When our program has to serialize data -- via a service request, file transfer, or any other IO scenario -- we no longer have TypeScript's type system protecting us. This is where many popular modelling tools like [fp-ts](https://github.com/gcanti/fp-ts) and [zod](https://github.com/colinhacks/zod) have come in to provide validation of IO so that external data can move back into our type aware Typescript code in a safe manner.

The goal in this library is not provide this functionality itself but rather to expose useful utilities which would make creating these tools much easier.

## Type Utilities

### `Type<T>`

Given any type `T`, this utility will create a _tokenized_ definition of the type:

```ts
// <<string>>
type Str = Type<string>;
// <<string-literal::foobar>>
type FooBar = Type<"foobar">;
// <<union::<<string>>,<<numeric-literal::42>>,<<numeric-literal::56>> >>
type Union = Type<string | 42 | 56>
// etc.
```

You can also add in a _description_ to these types if you want:

```ts
// "<<number -> the height of a person in cm>>"
type Height = Type<number, "the height of a person in cm">
```

### `TypedValue`

This utility builds off of the `Type` utilities parser but adds a runtime value.

```ts
// [ Type<"foo" | "bar">, "foo" ]
type TypedValue<"foo" | "bar", "foo">
```

### `AsType<T>`

Given any _real type_ `T` or a type token derived from the `Type<T>` utility, **AsType** will ensure that the real type is returned.

```ts
// string
type Real = AsType<string>;
// string
type Fake = AsType<"<<string>>">;
type Identity = AsType<Type<string>>;
```

### `Describe<T>`

This utility is primarily meant for documentation purposes. Whether you're creating _error types_ or you're wanting to leverage this via static analysis. This type tries to _describe_ a type as best it can in human readable form.

## Runtime Utilities

### type()

Defining a strongly typed type for the runtime system is as easy as:

```ts
// string
const Height = type(t => t.number(), "the height of a person in cm")
```

> Note: the type system just sees the type of `number` but the runtime system sees this as a string type token `Type<string, "the height of a person in cm">`

### isTypeToken(val)

This is a type guard which will correctly identify a `Type` variable as such even when the type system has been pointed to the type's proxy type.

```ts
const Height = type(t => t.number(), "the height of a person in cm")
if(isTypeToken(Height)) {
    // correctly identifies and type of **Height** now just the string literal
    // representing the type token
}
```
