import type { FromDefn, Narrowable, ShapeCallback } from "inferred-types/types";
import { handleDoneFn } from "runtime/api";
import { ShapeApiImplementation } from "runtime/runtime-types";
import { isFunction } from "runtime/type-guards";

/**
 * **createTuple**(...values) -> (...values) -> Tuple
 *
 * Runtime utility to define a strongly typed tuple.
 *
 * - if you want to _widen_ certain elements in the Tuple you can use
 * the `widen()` type utility for those elements.
 *
 * ### Example
 * ```ts
 * // [ "foo", "bar", 42 ]
 * const foobar = defineTuple("foo", "bar", 42)
 * // [ string, "bar", 42]
 * const foey = defineTuple(s => s.string(), "bar", 42)
 * ```
 */
export function defineTuple<
    T extends readonly (Narrowable | ShapeCallback)[],
>(...values: T) {
    return values.map(
        i => isFunction(i)
            ? handleDoneFn((i as ShapeCallback)(ShapeApiImplementation))
            : i,
    ) as unknown as FromDefn<T>;
}
