import type {
    HandleDoneFn,
    Shape,
    ShapeCallback,
    ShapeTupleOrUnion,
    ShapeApi as TShapeApi,
} from "inferred-types/types";
import { SHAPE_PREFIXES } from "inferred-types/constants";
import { handleDoneFn } from "runtime/api";
import {
    array,
    boolean,
    fn,
    map,
    nullType,
    record,
    set,
    undefinedType,
    unknown,
    weakMap
} from "runtime/runtime-types";
import { hasKeys, isDictionary, isString } from "runtime/type-guards";

function isAddOrDone<T>(val: T): val is ShapeTupleOrUnion & T {
    return isDictionary(val) && hasKeys("add", "done") && typeof val.done === "function" && typeof val.add === "function";
}

/*
 * **Shape Api** _Implementation_
 *
 * This API surface is intended to be used to create a string-based
 * **token** which _represents_ a fully typed _type_.
 *
 * Even though the runtime system can interrogate this this token
 * at runtime -- via the `isShape()` type guard -- the
 * runtime will "see" the actual type that the token represents.
 *
 * ```ts
 * // number
 * const token = ShapeApi.number();
 * // <<number>>
 * console.log(token);
 * ```
 */
export const ShapeApiImplementation = {
    boolean,
    unknown,
    undefined: undefinedType,
    null: nullType,
    fn,
    record,
    array,
    set,
    map,
    weakMap,
} as unknown as TShapeApi;

/**
 * **shape**(s => s.[API])
 *
 * Provides a callback API to allow for defining a type (_which
 * retains a runtime value which will map back to the type_)
 *
 * **Related:** `isShape(val)`
 */
export function shape<
    T extends ShapeCallback,
>(cb: T): HandleDoneFn<ReturnType<T>> {
    const rtn = cb(ShapeApiImplementation);
    return handleDoneFn(
        isAddOrDone(rtn) ? rtn.done() : rtn,
    ) as unknown as HandleDoneFn<ReturnType<T>>;
}

/**
 * **isShape**(val)
 *
 * Type guard which tests whether a value is a _type_ defined by a `Shape`.
 */
export function isShape(v: unknown): v is Shape {
    return !!(isString(v)
        && v.startsWith("<<")
        && v.endsWith(">>")
        && SHAPE_PREFIXES.some(i => v.startsWith(`<<${i}`)));
}
