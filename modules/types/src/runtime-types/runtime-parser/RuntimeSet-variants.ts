import type { Join, Narrowable } from "inferred-types/types";
import type { RuntimeType } from "src/runtime-types/runtime-parser/RuntimeType-variants";

import type { TupleToIntersection, TupleToUnion } from "src/type-conversion";

/**
 * a _union_ set variant for `RuntimeType<T,U>`
 */
export type RuntimeSetType__Union<
    T extends readonly string[],
    U extends readonly RuntimeType<string, Narrowable>[]
> = {
    readonly kind: "union";
    /** the various underlying string tokens which made up the union */
    readonly tokens: T;
    /** a string representation of the union type */
    readonly token: Join<T, " | ">;
    /** the union type which these tokens make (in union) */
    readonly type: TupleToUnion<U>;
};

/**
 * a _union_ set variant for `RuntimeType<T,U>`
 */
export type RuntimeSetType__Intersection<
    T extends readonly string[],
    U extends readonly RuntimeType<string, Narrowable>[]
> = {
    readonly kind: "intersection";
    /** the various underlying string tokens which made up the union */
    readonly tokens: T;
    /** a string representation of the union type */
    readonly token: Join<T, " | ">;
    /** the intersection type from the underlying token types */
    readonly type: TupleToIntersection<U>;
};

/**
 * **RuntimeSetType**`<T,U>`
 *
 * A union between the `UnionSetType` and `IntersectionSetType`.
 *
 * - in both cases, `T` is a tuple of string tokens
 * - `U` is a tuple of resolved types
 */
export type RuntimeSetType<
    T extends readonly string[],
    U extends readonly RuntimeType<string, Narrowable>[]
> = RuntimeSetType__Intersection<T, U> | RuntimeSetType__Union<T, U>;
