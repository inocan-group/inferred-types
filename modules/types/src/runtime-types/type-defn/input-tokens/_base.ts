import {
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

type BaseSuggest =
| `${IT_AtomicToken}`
| `string | undefined`
| `number | undefined`
| `boolean | undefined`
| `string | number`
| `string | boolean`
| `string | undefined`
| `string | number | undefined`;

type LiteralSuggest =
| `String(foo)` | `String(bar)`
| `Number(1)` | `Number(42)`
| `Boolean(true)` | `Boolean(false)`;

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
 * A dictionary object which is converted to an object literal definition.
 */
export type IT_ObjectLiteralDefinition = Record<string, InputTokenSuggestions>;

/**
 * An input token is usually a _string_ which represents a _type_ but it
 * can also be:
 *
 * - A dictionary where the values are _string_ tokens
 * - A tuple who's elements are all _string_ tokens
 */
export type InputTokenLike = InputTokenSuggestions
| IT_ObjectLiteralDefinition
| readonly InputTokenSuggestions[];

/**
 * A branded type of `InputToken` which indicates that the _value_ has
 * been validated to be an `InputToken`.
 */
export type InputToken = InputTokenSuggestions & {
    brand: "InputToken";
};
