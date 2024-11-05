import { SHAPE_PREFIXES } from "inferred-types/dist/constants/index";
import {
  Shape,
  ShapeTupleOrUnion,
  ShapeApi as TShapeApi,
  ShapeCallback,
  HandleDoneFn,
} from "inferred-types/dist/types/index";
import { isString, hasKeys, isObject, handleDoneFn,  } from "src/runtime/index";
import { boolean, nullType, undefinedType, unknown } from "./shape-helpers/atomics";
import { number, string } from "./shape-helpers/singletons";
import { fn } from "./shape-helpers/functions";
import { dictionary, tuple } from "./shape-helpers/literal-containers";
import { array, map, record, set, weakMap } from "./shape-helpers/wide-containers";
import { union } from "./shape-helpers/union";

const isAddOrDone = <T>(val: T): val is ShapeTupleOrUnion & T => {
  return isObject(val) && hasKeys("add", "done") && typeof val.done === "function" && typeof val.add === "function"
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
  string,
  number,
  boolean,
  unknown,
  undefined: undefinedType,
  null: nullType,
  union,
  fn,
  record,
  array,
  set,
  map,
  weakMap,
  dictionary,
  tuple
} as unknown as TShapeApi

/**
 * **shape**(s => s.[API])
 *
 * Provides a callback API to allow for defining a type (_which
 * retains a runtime value which will map back to the type_)
 *
 * **Related:** `isShape(val)`
 */
export const shape = <
  T extends ShapeCallback
>(cb: T): HandleDoneFn<ReturnType<T>> => {
  const rtn = cb(ShapeApiImplementation);
  return handleDoneFn(
    isAddOrDone(rtn) ? rtn.done() : rtn
  ) as unknown as HandleDoneFn<ReturnType<T>>;
}

/**
 * **isShape**(val)
 *
 * Type guard which tests whether a value is a _type_ defined by a `Shape`.
 */
export const isShape = (v: unknown): v is Shape => {
  return isString(v) &&
    v.startsWith("<<") &&
    v.endsWith(">>") &&
    SHAPE_PREFIXES.some(i => v.startsWith(`<<${i}`))
    ? true : false
}



