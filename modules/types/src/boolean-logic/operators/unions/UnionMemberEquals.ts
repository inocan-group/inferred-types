/* eslint-disable style/indent */
import type {
    AsArray,
    IsAny,
    IsEqual,
    IsNever,
    IsUndefined,
    IsUnion,
    IsUnknown,
    Some,
    UnionToTuple
} from "inferred-types/types";

type Process<
    T extends readonly unknown[],
    U extends readonly unknown[]
> = T extends [infer First, ...infer Rest]
    ? Some<U, "equals", First> extends true
        ? true
        : Process<Rest, U>
    : false;

/**
 * **UnionMemberEquals**`<T,U>`
 *
 * Boolean operator which tests whether any of the union elements in `T` equal
 * the type `U`.
 *
 * - always returns `false` if `T` is _not_ a union type
 *
 * **Related:**
 * - `UnionMemberExtends`, `UnionFilter`, `IsUnion`, `IsUnionArray`
 * - `UnionIncludes`, `UnionExtends`
 */

export type UnionMemberEquals<
    T,
    U
> = [IsAny<T>] extends [true]
    ? false
: [IsAny<U>] extends [true]
    ? true
: [IsEqual<any[], U>] extends [true]
    ? false
: [IsNever<T>] extends [true]
    ? false
: [IsNever<U>] extends [true]
    ? false
: [IsUnknown<T>] extends [true]
    ? boolean
: [IsUnknown<U>] extends [true]
    ? boolean
    : [IsUnion<T>] extends [true]
        ? UnionToTuple<T> extends readonly unknown[]
            ? Process<UnionToTuple<T>, IsUndefined<U> extends true ? [undefined] : AsArray<U>>
            : false
        : false;
