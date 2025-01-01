import type { AnyObject, Widen } from "inferred-types/types";

export type StrictSetKey<
  TObj extends AnyObject,
  TKey extends keyof TObj,
  TVal extends TObj[TKey],
> = {
  [K in keyof TObj]: K extends TKey
    ? TVal
    : TObj[K]
};

/**
 * **SetKey**`<TObj,TKey,TVal>
 *
 * Sets one of the keys `TKey` of an object `TObj` to `TValue`
 * while ensuring that `TVal` extends the _wide_ type of `TObj[TKey]`.
 *
 * - if you want `TVal` to be unconstrained, use `ForceSetKey`
 * instead.
 */
export type SetKey<
  TObj extends AnyObject,
  TKey extends keyof TObj,
  TVal extends Widen<TObj[TKey]>,
> = {
  [K in keyof TObj]: K extends TKey
    ? TVal
    : TObj[K]
};

/**
 * **ForceSetKey**`<TObj,TKey,TVal>
 *
 * Sets one of the keys `TKey` of an object `TObj` to `TValue`
 * even if `TValue` doesn't fit the type which `TObj` proposes.
 *
 * - if you want `TVal` to be constrained to valid keys of
 * `TObj` use `SetKey`instead.
 */
export type ForceSetKey<
  TObj extends AnyObject,
  TKey extends keyof TObj,
  TVal ,
> = {
  [K in keyof TObj]: K extends TKey
    ? TVal
    : TObj[K]
};
