import type { Every,IsUnion,  Or } from "types/boolean-logic";
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
 * **isTemplateLiteral**`<T>`
 *
 * A boolean operator which evaluates if `T` has dynamic types
 * like `${string}`, `${number}`, or `${boolean}` included in
 * it.
 *
 * - Note a wide `string` and a `${string}` type will result in `false` as they
 * are both equivalent to a wide string in the type system.
 */
export type IsTemplateLiteral<T> = IsUnion<T> extends true
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


