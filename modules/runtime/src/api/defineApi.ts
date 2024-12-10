import type {
  Api,
  AsApi,
  AsEscapeFunction,
  AsOptionalParamFn,
  Dictionary,
  Narrowable,
  OnPass,
  TypedFunction,
} from "inferred-types/types";
import {
  createErrorCondition,
  createFnWithProps,
  isApi,
  isApiSurface,
} from "inferred-types/runtime";

/**
 * **asEscapeFunction**`(fn)`
 *
 * Accepts a zero-parameter function as an escape function.
 */
export function asEscapeFunction<
  TFn extends () => Narrowable,
>(fn: TFn) {
  return createFnWithProps(fn, { escape: true }) as unknown as AsEscapeFunction<TFn>;
}

/**
 * **asOptionalParamFunction**`(fn)`
 *
 * Marks a function as being optionally callable with _no parameters_.
 */
export function asOptionalParamFunction<
  TFn extends (() => any) | ((p1?: any, p2?: any, p3?: any, p4?: any) => any),
>(fn: TFn) {
  return createFnWithProps(fn, { optionalParams: true }) as unknown as AsOptionalParamFn<TFn>;
}

/**
 * **asApi**`(surface)`
 *
 * Validates an API surface as a stateless API and returns it as `Api<Surface>` if
 * it qualifies, otherwise results in an ErrorCondition.
 */
export function asApi<T extends Dictionary | TypedFunction>(api: T): OnPass<AsApi<T>, Api<T>> {
  return (
    isApi(api)
      ? api
      : isApiSurface(api)
        ? { _kind: "api", surface: api }
        : createErrorCondition("invalid-api")
  ) as unknown as OnPass<AsApi<T>, Api<T>>;
}
