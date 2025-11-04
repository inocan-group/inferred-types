import type {
    Contains,
    IsAny,
    IsNever,
    IsUnion,
    UnionToTuple__PreserveBoolean
} from "inferred-types/types";

/**
 * **UnionIncludes**`<T, U>`
 *
 * Boolean operator which tests whether `T` is a union type which
 * _includes_ `U` as a member of the union.
 *
 * - the comparison uses a _strict equality_ match
 *     - use `UnionExtends` instead if you prefer a looser matching
 *       criteria
 * - if `T` is **any** or **never** this will always return `false`
 * - if `T` isn't a union type then this will always return `false`
 *
 * **Related:** `UnionExtends`,  `HasUnionType`
 */
export type UnionIncludes<T, U>
    = [IsNever<T>] extends [true]
        ? false
        : [IsAny<T>] extends [true]
            ? false
            : [IsUnion<T>] extends [true]
                ? UnionToTuple__PreserveBoolean<T> extends infer Tuple extends readonly unknown[]
                    ? Contains<Tuple, U, "equals">
                    : never
                : false;
