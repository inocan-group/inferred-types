import { IfLength, IfEqual, IfTrue } from "src/types/boolean-logic";
import { RetainStrings, NumericKeys } from "src/types/lists";
import { UnionToTuple } from "src/types/type-conversion";
import { AnyObject } from "../base-types";

type _ObjKeys<
  TValue extends AnyObject,
  TOnlyString extends boolean
> = IfEqual<
Readonly<UnionToTuple<keyof TValue>>, readonly [string], 
[] & readonly ((string|symbol)& keyof TValue)[],
IfLength<
  Readonly<UnionToTuple<keyof TValue>>, 0,
  readonly [],
  IfTrue<
    TOnlyString, 
    Readonly<RetainStrings<UnionToTuple<keyof TValue>>>,
    Readonly<UnionToTuple<keyof TValue>>
  >
>
>;

/**
 * **Keys**`<TValue, [TExclude]>`
 * 
 * Provides the _keys_ of the container (aka, object or array) `TValue`.
 *
 * ```ts
 * type T1 = { foo: 1, bar: 2 };
 * // readonly ["foo", "bar"] & (keyof T1)[]
 * type K = Keys<T1>;
 * ```
 */
export type Keys<
  TValue extends AnyObject | unknown[],
  TOnlyString extends boolean = false
> = IfLength<
  TValue extends readonly unknown[]
    ? NumericKeys<TValue> & readonly (keyof TValue)[]
    : _ObjKeys<TValue, TOnlyString> & readonly (keyof TValue)[]
  , 0, 
  // just make readonly [] if there are no elements
  readonly []
>;
