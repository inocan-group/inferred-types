# Substrings in Inferred Types

Being able to work with _sub-strings_ of a string literal can be useful and the **Inferred Types** library has both type utilities along with runtime functions which can help you with this.

## Trimming Content

In Javascript/Typescript you can trim both or either sides of a string of it's whitespace:

```ts
// string
const trim = ` Hello world\n\t\t`.trim();
// string
const trimStart = ` Hello world `.trimStart();
// string
const trimEnd = ` Hello world `.trimEnd();
```

This is helpful but if you want to preserve a literal type through this operation you can use this libraries:

- `strip()`
- `stripStart()`
- and `stripEnd()`

By comparison these functions will preserve the literal type:

```ts
// "Hello world"
const trim = trim(` Hello world\n\t\t`);
// "Hello world "
const trimStart = trimStart(` Hello world `);
// " Hello world"
const trimEnd = trimEnd(` Hello world `);
```

- all of these runtime functions are found in the directory:  `/modules/runtime/src/literals/sub-string/trim`
- maybe not surprisingly you'll find that there are a set of type utilities called:
  - `Strip<T>`
  - `StripStart<T>`
  - and `StripEnd<T>`
- the type utilities are the reason for the runtime functions ability to preserve these types and can be found in the directory `/modules/types/src/string-literals/sub-strings/trim`.

## Stripping and Retaining String Content

> runtime:
>
> - `/modules/runtime/src/literals/sub-string/strip`
> - `/modules/runtime/src/literals/sub-string/retain`
>
> types:
>
> - `/modules/types/src/string-literals/sub-strings/strip`
> - `/modules/types/src/string-literals/sub-strings/retain`

While trimming whitespace is very common there are other string operations where we might want to retain our string literal definitions and these fall into two broad classes: `stripping` and `retaining`.

### Base Utilities

The base runtime functions include:

- `retainAfter()`
- `retainUntil()`
- `retainWhile()`
- `stripAfter()`
- `stripAfterLast()`
- `stripBefore()`
- `stripSurround()`
- `stripUntil()`
- `stripWhile()`

The real documentation for these functions resides in the source code and hopefully shows up in your "intellisense" editor but let's look at a simple example anyway:

```ts
const str = `Hi Bob, have a great day`;
// "Hi Bob"
const retained = stripAfter(str, ", ");
// "have a great day"
const afterwards = retainAfter(str, ", ");
```

### Character Resolution

There are two handy functions which focus more on the _characters_ which make up a string more than the string itself:

- `retainChars()`
- `stripChars()`

Here's an usage example which might not be super practical in an app but hopefully does a good job of demonstrating what these utils do:

```ts
const str = `Hi Bob, have a great day`;
// "iobhaveagreatday"
const retained = retainChars(str, ...LOWER_ALPHA_CHARS);
// "H B,    "
const stripped = stripChars(str, ...LOWER_ALPHA_CHARS);
```

### Nesting Intelligence

There are even a few sub-string utilities which are "nesting aware":

- retainUntil__nested()
- retainBetween__nested()

> always check the source for a full list

These utilities will work in a similar manner to their non-nested counterparts but they are more suitable for complex parsing tasks where certain characters in the string can push or pop the string's context.

- see [nesting](./nesting.md) for more details on this topic

For now let's take a simple example:

```ts
const parseStr = `{ foo: { uno: 1, dos: 2 } } | false`;
// "{ foo: { uno: 1, dos: 2 }"
const naive = retainUntil(parseStr, "}");
// "{ foo: { uno: 1, dos: 2 } }"
const obj = retainUntil__Nested(parseStr, "}");
```

Imagine our _goal_ was to extract the _object definition_ from the string.

- the `naive` implementation simply retained the object definition until it hit the very first `}` character; the result is incomplete.
- with the `obj` using the _nesting-aware_ utility we see that it only stopped when the `}` was on the root level of the stack and therefore the string captured was a the full object definition.

Now in this example we left the _configuration_ of what constitutes a nesting character at the default:

- by default all bracket characters represent the _opening_ and _closing_ nesting characters. This is typed as `DefaultNesting` if you're interested.
- again, see [nesting](./nesting.md) for more details

---

## Other Docs

- [README](../README.md)
- [Filter and Compare](./filter-and-compare.md)
- [Input Tokens](./input-and-output-tokens.md)
- [Networking](./networking.md)
- **String Literals**
  - [mutations](./string-mutation.md)
  - **sub-strings** _(you are here)_
- [Type Guards](./type-guards.md)
- [Metrics](./metrics.md)
- [Nesting](./nesting.md)
