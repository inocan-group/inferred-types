import type { InputTokenSuggestions } from "inferred-types/types";

/**
 * **InputToken**
 *
 * The set of valid inputs which can be converted from a "token" to an inferred _type_
 * at runtime with utilities like `GetInputToken`, `FromInputToken`, etc.
 *
 * **Note:**
 * - the possible set of variants of input tokens is _unbounded_ so this type will
 * allow in some _false positives_ but you can explicitly check whether a given value is
 * an `InputToken` with the `IsInputToken<T>` boolean operator.
 *
 * - the `InputTokenSuggestions` type represents a suggested set of _string_ tokens that
 * are known to be valid and are helpful to developers by giving some guidance on valid
 * shape patterns without limiting the choice of strings not on the suggested list.
 *
 * - beyond the "pure" string based input tokens, however, this type allows -- _for convenience_
 * -- using dictionary or tuple structures to define a type too:
 *
 *     ```ts
 *     { foo: "number"; bar: "string" } // Dictionary example
 *     [ "string", "string", "boolean" ] // Tuple example
 *     ```
 *
 *     - the dictionary based variant of an `InputToken` is the defined by the type `DefineObject`
 *     - the tuple based variant of an `InputToken` is the defined by the type `DefineTuple`
 *     - both of these types have corresponding _runtime_ builders: `defineObject()`, `defineTuple()`
 *
 * ### Related Utilities
 *
 * - `FromToken<T>` / `FromInputToken<T>` / `FromInputToken__String<T>`
 *
 *     - converts a "token" to the _tokens_ **type** it represents
 *     - if `T` is not a valid type then an Error of the type `invalid-token` will
 *     be returned
 *
 * - `AsType<T>`
 *
 *     - same as the `FromXXX` utilities except that if `T` isn't a token then
 *     it will _proxy_ through **T**'s existing type "as is"
 *
 * - `AsString<T>` / `ToStringInputToken<T>`
 *     - `AsString<T>` is a general purpose utility for ensuring that types passed in are
 *      converted to an "appropriate" string type
 *         - for _string-based_ input tokens this utility will simply proxy the type through
 *         "as is"
 *         - for dictionary or tuples which are valid input tokens, it will convert this to the
 *         string-based equivalent `InputToken`
 *         - any dictionaries or tuples which are not valid input tokens, their types will be taken
 *         at face value and converted to a string representation:
 *
 *            ```ts
 *            // "{ foo: number; bar: string }"
 *            type Token = AsString<{ foo: "number", bar: "string" }>;
 *            // "{ foo: number; bar: string }"
 *            type NotToken = AsString<{ foo: number, bar: string }>;
 *            ```
 *     - `ToStringInputToken<T>` is a targeted utility for ensuring that `T`, if a valid input token,
 *     is a _string_ representation of an input token.
 *
 * - `IT_Token<T>`
 *     - typically used in the token parsing process
 *     - this type represents a token's meta characteristics including:
 *        - the string `token`
 *        - the `type` the token represents
 *        - any remaining text still left to be parsed after this token (`rest`)
 *        - depending the type, there may be other characteristics too
 *
 * - `GetInputToken<T>`
 *     - this is the core _lookup_ utility which other utilities use to convert a "token" to
 *       meta information (aka, a derivative of `IT_Token`)
 *     - this utility, unlike most others, only takes _string-based_ input tokens
 *     - if you need to convert a dictionary or tuple based token to string you can do so
 *     with the `AsStringInputToken` utility
 */
export type InputToken
    = | InputTokenSuggestions
    | Record<
        InputTokenSuggestions,
        InputTokenSuggestions | Record<InputTokenSuggestions, InputTokenSuggestions>
    >
    | readonly (
        InputTokenSuggestions
        | Record<InputTokenSuggestions, InputTokenSuggestions>
        | readonly InputTokenSuggestions[]
    )[];
