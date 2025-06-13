import type { IsTuple } from "inferred-types/types";

/**
 * **TypeOfArray**`<T>`
 *
 * Determines the _type_ of a wide array type.
 *
 * ### Example
 * ```ts
 * // string
 * type T = TypeOfArray<string[]>;
 * // string | number
 * type U = TypeOfArray<(string | number)[]>;
 * ```
 *
 * **Note:**
 * - tuples passed into this utility will return `never`!
 * - however, types such as `["foo", ...string[]]`, are not
 * tuples and are allowed.
 *
 */
export type TypeOfArray<T extends unknown[]> =
IsTuple<T> extends true
    ? never
    : T extends (infer Type)[]
        ? Type
        : never;
