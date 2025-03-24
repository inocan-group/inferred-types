# Global Symbols

The types defined here are meant to override the global namespace to provide better type inferrence on certain built-in types like `Object` and `fetch`.

- because this is an override, it produces _side-effects_ and therefore we only want consumers of this repo to "opt-in" to these changes
- This directory's `index.ts` file is NOT included in the main export graph
- Instead it is built as a separate type file: `globals.d.ts` and a consumer would opt-in by importing like so:

```ts
import "inferred-types/globals";

// now the upgraded types are available
```
