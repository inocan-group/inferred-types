
import { HasParameters, TypedFunction } from "inferred-types/types";

export interface Box<T> {
  __type: "box";
  value: T;
  /**
   * Unbox the boxed value in the narrowest possible type.
   *
   * **note:** if the boxed value is a function with parameters you
   * can pass the parameters directly into the `b.unbox(params)` call.
   */
  unbox: HasParameters<Box<T>["value"]> extends true
    ? Box<T>["value"] extends TypedFunction
      ? Box<T>["value"] extends (...args: infer A) => infer R
        ? <N extends A>(...args: N) => R
        : () => ReturnType<T>
      : () => T
    : () => T;
}
