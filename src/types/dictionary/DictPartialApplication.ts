import { SimplifyObject } from "../SimplifyObject";

/**
 * Given a dictionary of key/values, where the value is a function, this
 * type utility will maintain the keys but change the values to whatever
 * the `ReturnType` of the function was.
 * ```ts
 * const api = {
 *    val: 42,
 *    hi: (name: string) => `hi ${name}`,
 *    bye: (name: string) => `bye ${name}`
 * };
 * // { hi: string; bye: string }
 * type Test = UnwrapValue<typeof api>
 * // { val: number; foo: string; bar: string }
 * type Test2 = UnwrapValue<typeof api, false>
 * ```
 */
export type DictPartialApplication<
  T extends Record<string, any>,
  I extends boolean = true
> = SimplifyObject<
  {
    [K in keyof T]: T[K] extends (...args: any[]) => any
      ? Record<K, ReturnType<T[K]>>
      : true extends I
      ? never
      : Record<K, T[K]>;
  }[keyof T]
>;
