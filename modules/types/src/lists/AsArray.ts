import type { As, Expand, IsAny, IsNever, IsUndefined, IsUnion, IsUnknown, NotFilter, UnionToTuple, Widen } from "inferred-types/types";


type NonArrayMembers<T extends readonly unknown[]> =
NotFilter<T, "extends", [any[]]> extends infer Members extends readonly unknown[]
? Members[number]
: never;

type ArrayMembers<T extends readonly unknown[]> = {
    [K in keyof T]: T[K] extends readonly (infer Kind)[]
        ? As<Kind[], Widen<Kind>[]>
        : never
}[number]


/**
 * **AsArray**`<T>`
 *
 * Type utility which ensures that `T` is an array by:
 *
 * - encapsulating it as a single item array if it is a
 * non-array type (but not _undefined_).
 * - converting a union type into a tuple (unless it contains undefined)
 * - if `T` is undefined then it is converted to an empty array `[]`
 * - if `T` was already an array then it is just proxied through
 * - if `T` is a union then non array elements are converted to array types
 */
export type AsArray<T> = [IsAny<T>] extends [true]
? unknown[]
: [IsNever<T>] extends [true]
    ? []
: [IsUnknown<T>] extends [true]
    ? unknown[]
: [T] extends [readonly (infer Kind)[]]
    ? As<T, Widen<Kind>[]>
: [IsUndefined<T>] extends [true]
    ? []
: [IsUnion<T>] extends [true]
    ? [UnionToTuple<T>] extends [infer Tuple extends readonly unknown[]]
        ? Expand<
            Array<NonArrayMembers<Tuple>> | ArrayMembers<Tuple>
        >
        : never

: IsUndefined<T> extends true
    ? []
    : [T];
