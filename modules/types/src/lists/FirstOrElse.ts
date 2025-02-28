import type { First, Tuple } from "inferred-types/types";

/**
 * **FirstOrElse**`<T,E>`
 *
 * Returns the _first_ type in a list but if there are no elements then
 * it will return `E` (which defaults to _undefined_).
 */
export type FirstOrElse<
    T extends Tuple,
    E = undefined,
> = T extends Tuple<unknown, "1+">
    ? First<T>
    : E;
