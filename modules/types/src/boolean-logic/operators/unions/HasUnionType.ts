import type { IsUnion } from "inferred-types/types";

type _HasUnion<
    TList extends readonly unknown[],
> = TList extends [
    infer Head,
    ...infer Rest
]
    ? IsUnion<Head> extends true
        ? true
        : _HasUnion<Rest>
    : false;

/**
 * **HasUnionType**`<TList>`
 *
 * Checks whether any item within a _list_ is a **union** type.
 *
 * **Related:**
 * - `UnionIncludes`, `UnionHasArray`,
 * - `IsLiteralUnion`, `IsMixedUnion`, `IsNonLiteralUnion`
 *
 * ```ts
 * // true
 * type T = HasUnionType<["foo" | "bar", 42]>;
 * // false
 * type F = HasUnionType<["foo", "bar"]>;
 * ```
 */
export type HasUnionType<TList extends readonly unknown[]> = _HasUnion<TList>;
