import type { IsAllCaps } from "inferred-types/types";

/**
 * **LowerAllCaps**`<T>
 *
 * Type utility which will convert an "all caps" string to a string where all characters are lowercase; in
 * all other cases it will do nothing and simply return `T` as `T`.
 *
 * **Related:** `RaiseAllLowercase`
 */
export type LowerAllCaps<
    T extends string,
> = IsAllCaps<T> extends true
    ? Lowercase<T>
    : T;
