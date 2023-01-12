import { SimplifyObject } from "../SimplifyObject";

/**
 * **DictReturnValues**
 *
 * A type utility which receives an object `<T>` and then modifies
 * the return type of any properties which are a function to have this
 * new **ReturnType** `<R>`. Optionally you can specify a particular return type which
 * you are targeting and then
 */
export type DictReturnValues<
  /** the object which we expect to have props with function values */
  T extends Record<string, any>,
  /** the return type that functions should be modified to have */
  R extends any,
  /** optionally this utility can target only functions with a certain existing return value */
  O extends (...args: any[]) => any = (...args: any[]) => any
> = SimplifyObject<
  {
    [K in keyof T]: T[K] extends O
      ? // it's a function (or at least the scoped down type of function we're looking for)
        T[K] extends (...args: infer A) => any
        ? Record<K, (...args: A) => R>
        : Record<K, T[K]>
      : Record<K, T[K]>;
  }[keyof T]
>;
