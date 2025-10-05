import type {
    As,
    Flatten,
    Length,
    Mutable,
    Narrowable,
} from "inferred-types/types";

/**
 * **narrow**(value)
 *
 * An identity function which provides the input in as narrow a form
 * as possible.
 * ```ts
 * const s = narrow("foo"); // "foo"
 * const n = narrow(42); // 42
 * // ["foo", "bar"]
 * const t1 = narrow(["foo", "bar"] as const);
 * const t2 = narrow("foo", "bar");
 * // string`[]
 * const t3 = narrow(["foo", "bar"]);
 * ```
 */
export function narrow<
    const N extends Narrowable,
    const K extends PropertyKey,
    const T extends readonly (Record<K, N> | N)[],
>(...values: T) {
    return (
        values.length === 1
            ? values[0]
            : values
    ) as unknown as Length<T> extends 1
        ? T[0] extends readonly unknown[]
            ? [...As<Flatten<T[0]>, readonly unknown[]>]
            : Mutable<T[0]>
        : [...T];
}
