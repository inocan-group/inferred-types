import type { Join } from "inferred-types/types";

/**
 * **Joiner**`<TJoin>`
 *
 * Represents a partial application of the runtime `joinWith()` utility.
 */
export type Joiner<
    TJoin extends string,
> = <
    const TContent extends readonly string[]
>(...tuple: TContent
) => Join<TContent, TJoin>;

/**
 * **join**(joinWith)(tuple) -> joined
 *
 * A higher order runtime utility which provides the ability to create
 * type-strong join's with an array of string and a joining string.
 *
 * ```ts
 * // "hello world"
 * const helloWorld = join("")("hello", " ", "world");
 * // "foo, bar, baz"
 * const list = join(", ")("foo", "bar", "baz");
 * ```
 */
export function joinWith<const TJoin extends string>(
    joinWith: TJoin,
) {
    /**
     * add elements of the tuple you want to join
     */
    const fn = ((...tuple: readonly string[]) => {
        const tup: readonly string[] = tuple;
        return tup.join(joinWith);
    }) as unknown as Joiner<TJoin>;

    return fn;
}
