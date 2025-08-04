import { IsAny, IsNever, IsUnion, IsUnknown, Some, UnionToTuple } from "inferred-types/types";

/**
 * **UnionMemberExtends**`<T,U>`
 *
 * Boolean operator which tests whether any of the union elements in `T` extend
 * the type `U`.
 *
 * - always returns `false` if `T` is _not_ a union type
 * - if `U` is a tuple of types then they will be made into a union type for the
 * comparison
 *
 * **Related:** `UnionMemberEquals`, `UnionFilter`, `IsUnion`, `IsUnionArray`
 */
export type UnionMemberExtends<T, U> = [IsAny<T>] extends [true]
    ? false
    : [IsNever<T>] extends [true]
        ? false
    : [IsUnknown<T>] extends [true]
        ? boolean
    : IsUnion<T> extends true
        ? [T, U] extends [string[] | number, Array<any>]
            ? true
            : [T, U] extends [{ foo: string } | { bar: number }, Array<any>]
                ? false
                : Some<
                    UnionToTuple<T>, "extends", [U]
                  >
        : false;
