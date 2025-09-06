import type { IT_AtomicToken, Suggest } from "inferred-types/types";

type BaseSuggest
    = | `${IT_AtomicToken}`
| `string | undefined`
| `number | undefined`
| `boolean | undefined`
| `string | number`
| `string | boolean`
| `string | undefined`
| `string | number | undefined`;

type LiteralSuggest
    = | `String(foo)` | `String(bar)`
| `Number(1)` | `Number(42)`
| `Boolean(true)` | `Boolean(false)`
| `"foo" | "bar"`;

/**
 * A set of fairly simple `InputTokens` which can be used as a type
 * or a suggested type.
 */
export type InputToken__SimpleTokens
    = | BaseSuggest
| `Array<string>` | `Array<number>` | `Array<boolean>` | `Array<unknown>`
| `Array<string | number>`
| `Array<string | undefined>` | `Array<number | undefined>` | `Array<boolean | undefined>`
| `Array<boolean | function => boolean>`
| `string[]` | `string[][]` | `number[]` | `boolean[]` | `(string | number)[]`;

/**
 * The actual variants for a string based input token are _unbounded_ but
 * in order to help people understand acceptable syntax and patterns this
 * list of suggestions will provide autocomplete for
 */
export type InputTokenSuggestions = Suggest<
    | BaseSuggest
    | LiteralSuggest
    | `Array<${BaseSuggest}>`
    | `Map<${BaseSuggest}, ${BaseSuggest}>`
    | `WeakMap<Object, ${BaseSuggest}>`
    | `Set<${BaseSuggest}>`
    | `Record<string, ${BaseSuggest}>`
    | `Record<string|symbol, ${BaseSuggest}>`
>;
