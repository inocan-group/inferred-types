import { And, IsEqual, IsUnion, StartsWith } from "types/boolean-logic";
import { UnionToTuple } from "types/type-conversion";


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
export type StartsWithTemplateLiteral<T> = T extends string

? [IsUnion<T>] extends [true]
    ? [UnionToTuple<T>] extends [readonly string[]]
        ? UnionStartsBoolean<UnionToTuple<T>>
        : never
    : T extends `${infer First}${infer _Rest}`
        ? IsEqual<`${string}`, First> extends true
            ? true
            : IsEqual<`${number}`, First> extends true
                ? true
                : false
        : false
: false;
