import type {
    IT_ATOMIC_TOKENS,
    IT_LITERAL_TOKENS
} from "inferred-types/constants";
import type {
    StringLiteralTemplate,
    Suggest
} from "inferred-types/types";

type LiteralRaw = typeof IT_LITERAL_TOKENS;

export type IT_AtomicToken = typeof IT_ATOMIC_TOKENS[number];
export type IT_MapToken = `Map<${string},${string}>`;
export type IT_SetToken = `Set<${string}>`;
export type IT_ArrToken<T extends string = string> = `Array<${T}>`;
export type IT_WeakMapToken = `WeakMap<${string},${string}>`;
export type IT_RecordToken = `Record<${string},${string}>`;
export type IT_UnionToken = `${string}|${string}`;

/**
 * Containers are types which contain other types as part of their definition
 */
export type IT_ContainerType = "Union" | "Object" | "Tuple" | "Array" | "Set" | "Map" | "WeakMap" | "Record";

/**
 * a string literal (aka, `foo`, `bar`, etc.)
 */
export type IT_StringLiteralToken = `String(${string})`;
/**
 * a numeric literal (aka, `1`, `42`, `99`, etc.)
 */
export type IT_NumericLiteralToken = `Number(${number})`;
/**
 * a literal value of `true` or `false`
 */
export type IT_BooleanLiteralToken = `Boolean(${"true" | "false"})`;

/**
 * **IT_LiteralToken**
 *
 * The literal type tokens which can express a type literal or a
 * union of type literals
 */
export type IT_LiteralToken = {
    [K in keyof LiteralRaw]: LiteralRaw[K] extends string
        ? StringLiteralTemplate<LiteralRaw[K]>
        : never
}[number];

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
| `Boolean(true)` | `Boolean(false)`;

/**
 * A set of fairly simple `InputTokens` which can be used as a type
 * or a suggested type.
 */
export type InputToken__SimpleTokens
= | BaseSuggest
| `Array<string>` | `Array<number>` | `Array<boolean>` | `Array<unknown>`
| `Array<string | number>`
| `Array<string | undefined>` | `Array<number | undefined>` | `Array<boolean | undefined>`
| `Array<boolean | function => boolean>`;

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

/**
 * **IT_ObjectLiteralDefinition**
 *
 * A dictionary which is treated as an InputToken in the
 * `FromInputToken` and `fromInputToken()` utilities.
 *
 * **Note:** unlike string tokens, this input must be
 * converted to it's string-based equivalent as a runtime
 * value.
 */
export type InputToken__Object = Record<string, InputTokenSuggestions>;

/**
 * **InputToken__Tuple**
 *
 * A tuple who's elements are all `InputTokenLike` tokens
 */
export type InputToken__Tuple = readonly InputTokenLike[];

/**
 * **InputTokenLike**
 *
 * An `InputToken` is a _string-based_ token
 * which represents a _type_ but it is useful to allow
 * non-string inputs to be used sometimes for brevity:
 *
 * - A dictionary where the values are _string_ tokens
 * (`InputToken__Object`)
 * - A tuple who's elements are all _string_ tokens
 * (`InputToken__Tuple`)
 *
 * When an `InputTokenLike` token is passed into the
 * runtime utility `fromInputToken()` this utility will
 * allow the broader `InputTokenLike` type as an input
 * but it will convert all runtime values to a string
 * based token.
 */
export type InputTokenLike = InputTokenSuggestions
| InputToken__Object
| readonly InputTokenSuggestions[];

/**
 * A branded type of `InputTokenLike` which indicates that the _value_ has
 * been validated to be a valid string-based **InputToken**.
 *
 * **Note:**
 * - use `isInputToken()` in runtime to validate a string-based
 * token that is `InputTokenLike`
 * - to convert a non-string token use `fromInputToken()` as it
 * will first convert non-string tokens to a string and then validate.
 */
export type InputToken = string & {
    brand: "InputToken";
};
