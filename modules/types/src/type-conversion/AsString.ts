import type {
    As,
    IsUnion,
    RemoveNever,
    UnionToTuple
} from "inferred-types/types";

type OnlyString<T extends readonly unknown[]> = As<RemoveNever<{
    [K in keyof T]: T[K] extends string
        ? T[K]
        : [T[K]] extends [number | boolean]
            ? `${T[K]}`
            : never
}>, readonly string[]>;

/**
 * **AsString**<T, [S]>
 *
 * Attempts to convert `T` to a string type where possible.
 *
 * - will convert any string, boolean, or numeric value
 * to a string value
 *     - `42` -> `"42"`
 *     - number -> `${number}`
 *     - true -> `"true"`
 * - union types who's elements include at least one element of
 * `string` | `number | `boolean` will be converted to an appropriate
 * string literal:
 *      - `"foo" | 42 | true` will be converted to `"foo" | "42" | "true"`
 * - wide `string[]` arrays will be converted to `string`
 * - a tuple of values will be made into a JS string representing that type:
 *     - `[string, number, "foo"]` -> `"[ string, number 'foo' ]""`
 *
 * **Related:** `ToString`
 */
export type AsString<
    T,
    S extends string = ", "
> = [string] extends [T]
    ? string
: [T] extends [string]
    ? T
: [IsUnion<T>] extends [true]
    ? OnlyString<UnionToTuple<T>>[number]
: [T] extends [number]
    ? `${T}`
: [T] extends [boolean]
    ? `${T}`
// : [T] extends [readonly (unknown)[]]
//     ? IsWideArray<T> extends true
//         ? T extends (infer Type extends string|number|boolean)[]
//             ? `${Type}`
//             : never
//         : ToJsonArray<T, {quote: "'"}>
// : [T] extends [object]
//     ? [T] extends [Dictionary]
//         ? ToJsonObject<T>
//         : never
: never;
