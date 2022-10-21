import { SimplifyObject } from "../SimplifyObject";

/**
 * Allow a dictionary have it's value's type changed to `T` while maintaining the keys in
 * the original object `I` so long as the original value for the KV pair extends `V`.
 *
 * If `V` is not specified then it defaults to _any_ and therefore all KVs are preserved.
 */
export type DictChangeValue<
  /** the object who's value-type we're changing */
  I extends Record<string, any>,
  /** the return type that functions should be modified to have */
  T extends any,
  /**
   *The type we expect in the value; if the value extends type `V` then the value will
   * be converted to type `O`; if not then the KV pair will be discarded
   */
  V extends any = any
> = SimplifyObject<
  {
    [K in keyof I]: I[K] extends V
      ? // it's a function (or at least the scoped down type of function we're looking for)
        Record<K, T>
      : never;
  }[keyof I]
>;
