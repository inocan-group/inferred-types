import type { Narrowable, VueRef } from "inferred-types/types";

/**
 * **asVueRef**(value)
 *
 * Receives a _value_ and makes it look like a `VueRef<T>` which will make
 * it pass the `IsRef<T>` type check. It also provides a hidden `_value` property
 * to the runtime which makes it pass the `isRef()` runtime check.
 *
 * Note:
 *
 * - this is a convenience function for building test cases in a library where you're
 * not actually exporting VueJS symbols (like inferred-types).
 */
export function asVueRef<T extends Narrowable>(value: T) {
    return ({
        value,
        _value: null,
    }) as unknown as VueRef<T>;
}
