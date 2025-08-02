import type {
    And,
    Contains,
    HasCharacters,
    IsAny,
    IsNever,
    IsUnknown,
    Split,
    Trim,
    Unset,
} from "inferred-types/types";

type Validate<
    T extends readonly string[],
    Kind extends string | Unset,
> = {
    [K in keyof T]: Trim<T[K]> extends ""
        ? false
        : Kind extends Unset
            ? true
            : Trim<T[K]> extends Kind
                ? true
                : false
};

/**
 * **IsCsv**`<T, [K]>`
 *
 * Tests that the string `T` is a valid CSV; which means:
 *
 * - must have at least one `,`
 * - once whitespace is trimmed away, each element must contain something other
 * than an empty string.
 * - if `K` is set then it will also ensure that trimmed values _extend_ `K`
 *
 * **Note:** _a trailing comma **is** allowed._
 */
export type IsCsv<
    T extends string,
    K extends string | Unset = Unset,
> =
[IsAny<T>] extends [true]
    ? false
: [IsNever<T>] extends [true]
    ? false
: [IsUnknown<T>] extends [true]
    ? boolean
: HasCharacters<T, ","> extends true
    ? Contains<T, ",,"> extends true
        ? false
        : And<Validate<Split<T, ",">, K>>
    : false;
