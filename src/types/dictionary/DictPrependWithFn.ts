import { SimplifyObject } from "../SimplifyObject";

/**
 * **DictPrependWithFn**
 *
 * Given a strongly typed object `<T>`, this utility will inject a function call with
 * arguments `<A>` and then return what had subsequently been the value of the property.
 * 
 * Should you only want to apply this treatment to _some_ of the properties you can
 * pass in a value `<E>` which will ensure that only properties which _extend_ `E` will be
 * modified.
 */
export type DictPrependWithFn<
  T extends Record<string, any>,
  A extends any[],
  E extends any = any
> = SimplifyObject<
  {
    [K in keyof T]: T[K] extends E 
      ? Record<K, (...args: A) => T[K]>
      : Record<K, T[K]>;
  }[keyof T]
>;