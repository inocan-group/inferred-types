import {
    AfterFirst,
    First,
    Unset
} from "inferred-types/types";


/**
 * **FirstSet**`<T>`
 *
 * Iterates over a tuple `T` and returns the first item in the
 * tuple which has a type which is NOT `Unset`.
 *
 * **Related:** `FirstValue`, `FirstDefined`
 */
export type FirstSet<
    T extends any[],
    U = undefined
> = [] extends T
? U
: First<T> extends Unset
    ? FirstSet<AfterFirst<T>, U>
    : First<T>;
