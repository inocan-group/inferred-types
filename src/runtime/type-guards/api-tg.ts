import {  Dictionary,  Narrowable, OptionalParamFn, TypedFunction } from "src/types/index";
import { isFunction } from "./isFunction";
import { isObject } from "./isObject"


export const isEscapeFunction = <T>(val: T): val is T & (() => unknown) => {
  return isFunction(val) && "escape" in val && val.escape === true
}


/**
 * **isOptionalParamFunction**`(val)`
 *
 * A type guard which ensures that the value passed in is not only a _function_
 * but also has the `optionalParam` value set to **true** indicating that it
 * is safe to be called _without_ parameters.
 *
 * **Note:** this is similar to an "escape function" but whereas an API can
 * only have one escape function, an API may have as many ze
 */
export const isOptionalParamFunction = <T>(val: T): val is T & OptionalParamFn => {
  return isFunction(val) && "optionalParams" in val && val.optionalParams === true
}

/**
 * **isApi**`(val)`
 *
 * Type guard which validates that the value passed in is an `Api` type
 * with "surface" and "_kind" property.
 *
 * **Related:** `isFluentApi()`
 */
export const isApi = <T extends Narrowable>(api: T): api is T & { __kind: "api"; surface: Dictionary | TypedFunction} => {
  return isObject(api) && "surface" in api && "_kind" in api && api._kind === "api";
}

/**
 * **isApiSurface**`(val)`
 *
 * A type guard which tests whether the value passed in is the SurfaceArea
 * of an API (or could be).
 */
export const isApiSurface = <T>(val: T): val is T & (Dictionary | TypedFunction) => {
  return isObject(val) && Object.keys(val).some(k => isEscapeFunction(val[k]));
}
