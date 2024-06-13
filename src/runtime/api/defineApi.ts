import {
  Api,
  ApiCallback,
  ApiEscape,
  ApiSurface,
  AsApi,
  AsEscapeFunction,
  AsOptionalParamFn,
  Dictionary,
  Narrowable,
  OnPass,
  TypedFunction
} from "src/types/index";
import {
  isApiSurface,
  isEscapeFunction,
  isFunction,
  isObject,
} from "src/runtime/index";
import {
  isApi,
  createErrorCondition,
  createFnWithProps
} from "src/runtime/index";
import { Never } from "src/constants/Never";

/**
 * **asEscapeFunction**`(fn)`
 *
 * Accepts a zero-parameter function as an escape function.
 */
export const asEscapeFunction = <
  TFn extends () => Narrowable
>(fn: TFn) => createFnWithProps(fn, {escape: true}) as unknown as AsEscapeFunction<TFn>;


/**
 * **asOptionalParamFunction**`(fn)`
 *
 * Marks a function as being optionally callable with _no parameters_.
 */
export const asOptionalParamFunction = <
  TFn extends (() => any) | ((p1?: any, p2?: any, p3?: any, p4?:any) => any)
>(fn: TFn) => createFnWithProps(fn, {optionalParams: true}) as unknown as AsOptionalParamFn<TFn>;

/**
 * **asApi**`(surface)`
 *
 * Validates an API surface as a stateless API and returns it as `Api<Surface>` if
 * it qualifies, otherwise results in an ErrorCondition.
 */
export const asApi = <T extends Dictionary | TypedFunction>(api: T): OnPass<AsApi<T>,Api<T>> => (
    isApi(api)
      ? api
      : isApiSurface(api)
        ? { _kind: "api", surface: api }
      : createErrorCondition("invalid-api")
  ) as unknown as OnPass<AsApi<T>,Api<T>>;



// TODO: not implemented
/**
 * **asCallbackProp**`(cb)`
 *
 * Defines a callback _type_ for a property in a function.
 *
 * **Note:** you will often _extend_ this type to understand the return type
 */
export const asCallbackProp = <
  TParams extends readonly Narrowable[]
>(...args: TParams) => args as unknown;

/**
 * **getEscapeFunction**`(api)`
 *
 * Get's the escape function from a properly validated `Api<S>` (which
 * is known to have an escape function).
 */
export const getEscapeFunction = <
  TApi extends Api
>(
  api: TApi
)=> {
  const surface: ApiSurface<TApi> = api.surface;

  return (
    isFunction(surface) && "escape" in surface && surface.escape === true
      ? surface
      : isObject(surface)
        ? surface[Object.keys(surface).find(
            k => isEscapeFunction(surface[k as keyof ApiSurface<TApi>])
          ) as keyof ApiSurface<TApi>]
        : Never
  ) as unknown as ApiEscape<TApi> & (() => unknown)
};

/**
 * **defaultApiHandler**
 *
 * A handler which will automatically call:
 *
 * - a **optional parameter function** when the function is returned by user without a call to it
 * - the **escape function** when an Api Surface is returned instead of value from the API
 *
 * All other user values are returned "as is" including a function which is not an
 * _optional parameter function_ or an _escape function_.
 */
const defaultApiHandler = <A extends Api>(_api: A) => {
  // const esc = getEscapeFunction(api);

  return <R>(_result: R) => {

  }
}

/** API callback */
const cb = <TApi extends Api>(
  api: TApi
): ApiCallback<TApi> => <TCall extends (api: ApiSurface<TApi>) => unknown>(cb: TCall) => {
  try {
    return cb(api.surface) as ReturnType<TCall>;
  } catch (e) {
    throw new Error("oops")
  }
};

/**
 * **asApiCallback**`(api)`
 *
 * Converts a defined `Api` into a callback function which receives the API as an
 * input to be used for a response.
 */
export const asApiCallback = <
  TApi extends Api
>(api: TApi) => cb(api);


/**
 * **asHandledApiCallback**`(api)`
 *
 * Takes an `Api` definition and converts it into a callback with a ApiHandler used.
 *
 * - if no handler is explicitly provided then the _default handler_ will be used
 * - the default handler is responsible for:
 *    - ensuring that if an uncalled part of the API is returned using the **escape function**
 * to provide a more meaningful response
 *    - if a function which is marked as being an `OptionalParamFn` is returned then it will
 * be _called_ rather than leaving it as a function
 */
export const asHandledApiCallback = <
  T extends Api
>(
  api: T,
  handler?: TypedFunction
) => {
  let _h = handler ? handler : defaultApiHandler;
  let _cb = asApiCallback(api);

}
