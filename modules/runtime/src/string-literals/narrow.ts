import type {
    Mutable,
    Narrowable,
} from "inferred-types/types";
import { isArray, isDictionary } from "inferred-types/runtime";


type Returns<
    T extends (readonly N[]) | [Record<K,N>] | [readonly N[]],
    K extends PropertyKey,
    N extends Narrowable
> = T["length"] extends 1
? Mutable<T[0]>
: Mutable<T>;

/**
 * **narrow**(value)
 *
 * An identity function which provides the input in as narrow a form
 * as possible.
 *
 * - if only a single item is provided we will isolate it and treat
 * as it's own entity.
 *      - so a scalar value such as `narrow(42)` results in the numeric literal `42`
 *      not `[42]`
 *
 * ```ts
 * const s = narrow("foo"); // "foo"
 * const n = narrow(42); // 42
 * // ["foo", "bar"]
 * const t1 = narrow(["foo", "bar"] as const);
 * const t2 = narrow(["foo","bar"]);
 * const t3 = narrow("foo", "bar");
 * // { foo: 1 }
 * const o1 = narrow({foo: 1});
 * // [ { foo: 1 } ]
 * const o2 = narrow([foo:1]);
 * ```
 *
 * **Related:** `defineObj`
 */
export function narrow<
    const N extends Narrowable,
    const K extends PropertyKey,
    const T extends (readonly N[]) | [Record<K,N>] | [readonly N[]],
>(...values: T): Returns<T,K,N> {
    // we evaluate lengths of 1 differently
    if (values.length === 1) {
        return values[0] as Returns<T,K,N>
    }

    return values as Returns<T,K,N>;
}
