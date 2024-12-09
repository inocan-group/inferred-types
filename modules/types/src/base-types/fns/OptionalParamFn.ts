import type {
  If,
  Some,
  Throw,
  TypedFunction,
} from "inferred-types/types";

/**
 * **OptionalParamFn**
 *
 * A function which either has _no_ parameters or any parameters it
 * does have are _optional_ in a way that it is safe to call it without
 * any parameters.
 *
 * To make the runtime aware of this flexibility, a property `optionalParams`
 * must be set to **true**. To convert a regular function to be this kind of
 * function you can use the `AsOptionalParamFn` utility.
 */
export type OptionalParamFn = (
  (() => any) | ((p1?: any, p2?: any, p3?: any, p4?: any) => any)
) & { optionalParams: true };

/**
 * **AsOptionalParamFn**`<T>`
 *
 * Converts the function passed in into a `OptionalParamFn` where possible and
 * converts to `ErrorCondition<"invalid-conversion">` otherwise.
 */
export type AsOptionalParamFn<T extends TypedFunction> = Parameters<T>["length"] extends 0
  ? T & { optionalParams: true }
  : If<
    Some<Parameters<T>, "extends", undefined>,
    Throw<
      "invalid-conversion",
      `To convert to a OptionalParamFn, a function must have _no_ required Parameters but required params were found!`,
      `AsOptionalParamFn`,
      { library: "inferred-types/constants"; params: Parameters<T> }
    >,
    T & { optionalParams: true }
  >;
