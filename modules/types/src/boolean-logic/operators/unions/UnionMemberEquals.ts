import { IsAny, IsNever, IsUnion, IsUnknown, Some, UnionToTuple } from "inferred-types/types";



/**
 * **UnionMembersEqual**`<T,U>`
 *
 * Boolean operator which tests whether any of the union elements in `T` equal
 * the type `U`.
 *
 * - always returns `false` if `T` is _not_ a union type
 * - if `U` is a tuple of types then a match is made when _any_ of the items in `U` equal
 * an element of the tuple.
 *
 * **Related:** `UnionMemberExtends`, `UnionFilter`, `IsUnion`, `IsUnionArray`
 */
export type UnionMembersEqual<T,U> = [IsAny<T>] extends [true]
    ? false
: [IsAny<U>] extends [true]
    ? true
: any[] extends U
    ? true
: [IsNever<T>] extends [true]
    ? false
: [IsNever<U>] extends [true]
    ? false
: [IsUnknown<T>] extends [true]
    ? boolean
: [IsUnknown<U>] extends [true]
    ? boolean


: IsUnion<T> extends true
    ? U extends readonly unknown[]
        ? Some<
            UnionToTuple<T>, "equalsSome", U
        >
        : Some<
            UnionToTuple<T>, "equalsSome", [U]
        >
: false;

