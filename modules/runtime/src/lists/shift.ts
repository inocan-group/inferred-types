import type {
    First,
    IsEqual,
    IsUndefined,
    Narrowable,
} from "inferred-types/types";
import { isDefined } from "inferred-types/runtime";

type Rtn<
    T extends readonly K[] | K[] | undefined,
    K extends Narrowable,
> = IsUndefined<T> extends true
    ? undefined
    : T extends readonly K[] | K[]
        ? IsEqual<T["length"], number> extends true
            ? undefined | string
            : T["length"] extends 0
                ? undefined
                : First<T>
        : never;

/**
 * **shift**(list)
 *
 * Takes a list of elements and:
 *
 * - if the list is empty returns _undefined_
 * - otherwise returns the first element in the list
 *
 * **Note:** unlike using the builtin `ARR.shift()` method:
 *
 * - the source array is _never_ mutated
 * - you can shift off the first element of the readonly array as well a mutable one
 * (because the underlying array is _not_ mutated)
 * - in **many** cases, you should be using a queue of some sort with utils like
 * `createLifoQueue()` or `createFifoQueue()`
 *
 */
export function shift<
    T extends readonly K[] | K[] | undefined,
    K extends Narrowable,
>(list: T): Rtn<T, K> {
    let rtn;
    if (isDefined(list)) {
        rtn = (
            list.length === 0
                ? undefined
                : list[0]
        ) as First<T>;

        try {
            // remove item from source array where possible
            // note: not possible when array is frozen by being
            // made readonly
            list = list.slice(1) as any;
        }
        catch {
            // ignore
        }
    }
    else {
        rtn = undefined;
    }

    return rtn as Rtn<T, K>;
}
