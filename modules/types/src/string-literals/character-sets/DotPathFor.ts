import type { Container, IsArray } from "inferred-types/types";

/**
 * Depth tracking using array-based counter for compile-time safety
 * Each level adds an element to the array
 */
type IncrementDepth<TDepth extends readonly unknown[]> = readonly [...TDepth, unknown];

/**
 * Check if the current depth has exceeded the maximum allowed depth
 */
type IsDepthExceeded<
    TDepth extends readonly unknown[],
    TMaxDepth extends readonly unknown[]
> = TDepth["length"] extends TMaxDepth["length"]
    ? true
    : TMaxDepth["length"] extends TDepth["length"]
        ? false
        : TDepth["length"] extends number
            ? TMaxDepth["length"] extends number
                ? TDepth["length"] extends 0
                    ? false
                    : TMaxDepth extends readonly [...TDepth, ...infer _]
                        ? false
                        : true
                : false
            : false;

type GenNode<
    K extends string | number,
    IsRoot extends boolean,
    IsArray extends boolean,
> = IsArray extends true
    ? K extends `${number}`
        ? IsRoot extends true
            ? `${K}`
            : `.${K}`
        : never
    : IsRoot extends true
        ? `${K}`
        : `.${K}`;

type GenList<
    TContainer,
    IsRoot extends boolean = true,
    TDepth extends readonly unknown[] = readonly [],
    TMaxDepth extends readonly unknown[] = readonly [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    K extends keyof TContainer = keyof TContainer,
> = IsDepthExceeded<TDepth, TMaxDepth> extends true
    ? never // Gracefully stop recursion when depth is exceeded
    : K extends string | number
        ? GenNode<K, IsRoot, IsArray<TContainer>> | (
            TContainer[K] extends object
                ? `${GenNode<K, IsRoot, IsArray<TContainer>>}${GenList<
                    TContainer[K],
                    false,
                    IncrementDepth<TDepth>,
                    TMaxDepth
                >}`
                : never
          )
        : never;

/**
 * **DotPathFor**`<T, TMaxDepth>`
 *
 * Provides a union of all valid _dot paths_ for the container
 * `T` with depth limiting to prevent infinite recursion.
 *
 * - If `T` is _not_ a container then it will resolve to
 * `""` because `T` can not be dereferenced.
 * - If `T` is a _wide_ container than it will resolve to `""` as
 * nothing can be determined at design time
 * - Recursion is limited to a maximum depth (default: 10 levels) to prevent
 *   TypeScript errors with deeply nested or circular structures
 *
 * @template TContainer - The container type to generate dot paths for
 * @template TMaxDepth - Optional maximum recursion depth (array-based counter, default: 10)
 */
export type DotPathFor<
    TContainer,
    TMaxDepth extends readonly unknown[] = readonly [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
> = TContainer extends Container
    ? "" | GenList<TContainer, true, readonly [], TMaxDepth>
    : "";
