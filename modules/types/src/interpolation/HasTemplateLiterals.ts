import type { And, Contains, Every, IsEqual, IsUnion, IsWideString, Or, StartsWith } from "types/boolean-logic";
import {  Increment } from "types/numeric-literals";
import type { UnionToTuple } from "types/type-conversion";


type CountTemplates<
        T extends string,
        C extends number = 0
> = string extends T
? 1
: T extends `${infer First}${infer Rest}`
    ? Or<[
        string extends First ? true : false,
        `${number}` extends First ? true : false,
    ]> extends true
        ? CountTemplates<
            Rest,
            Increment<C>
        >
    : CountTemplates<Rest, C>
: C;


/**
 * **HasTemplateLiterals**`<T>`
 *
 * A boolean operator which evaluates if `T` has dynamic types
 * like `${string}`, `${number}`, or `${boolean}` included in
 * it.
 *
 * - Note a wide `string` and a `${string}` type will result in `false` as they
 * are both equivalent to a wide string in the type system.
 */
export type HasTemplateLiterals<T> = IsUnion<T> extends true
? Every<UnionToTuple<T>, "containsSome",  ["true","false"]>

: T extends string
    ? string extends T
        ? false
        : T extends ""
            ? false
            : [CountTemplates<`|${T}|`>] extends [0]
                ? false
                : true
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
export type HasLeadingTemplateLiteral<T> = T extends string

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
