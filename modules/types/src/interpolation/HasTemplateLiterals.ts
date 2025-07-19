import type { And, IsEqual, IsUnion, IsWideString, Or, StartsWith } from "types/boolean-logic";
import type { UnionToTuple } from "types/type-conversion";

/**
 * **HasTemplateLiterals**`<T>`
 *
 * A boolean operator which evaluates if `T` has dynamic types
 * like `${string}`, `${number}`, or `${boolean}` included in
 * it.
 */
export type HasTemplateLiterals<T extends string> = IsWideString<T> extends true
    ? false
    : [T] extends [`${infer First}${infer Rest}`]
        ? [Or<[
            IsEqual<First, string>,
            IsEqual<First, number>,
            IsEqual<First, boolean>
        ]>] extends [true]
            ? true
            : Rest extends ""
                ? false
                : HasTemplateLiterals<Rest>
        : [Or<[
            IsEqual<T, string>,
            IsEqual<T, number>,
            IsEqual<T, boolean>,
        ]>] extends [true]
            ? true
            : false;

type UnionStartsBoolean<T extends readonly string[]> = And<{
    [K in keyof T]: T[K] extends string
        ? StartsWith<T[K], "true" | "false">
        : never
}>;

/**
 * **HasLeadingTemplateLiteral**`<T>`
 *
 * tests whether `T` _starts with_ a leading template literal
 * such as `${string}`, `${number}`, or `${boolean}`
 */
export type HasLeadingTemplateLiteral<T extends string> = [IsUnion<T>] extends [true]
    ? [UnionToTuple<T>] extends [readonly string[]]
        ? UnionStartsBoolean<UnionToTuple<T>>
        : never
    : T extends `${infer First}${infer _Rest}`
        ? IsEqual<`${string}`, First> extends true
            ? true
            : IsEqual<`${number}`, First> extends true
                ? true
                : false
        : false;
