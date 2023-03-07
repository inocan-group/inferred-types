import { IfLength, IfEqual, IfTrue } from "src/types/boolean-logic";
import { RetainStrings, NumericKeys } from "src/types/lists";
import { UnionToTuple } from "src/types/type-conversion";
import { AnyObject } from "src/types/base-types";

type _ObjKeys<
  TValue extends AnyObject,
  TOnlyStringKeys extends boolean
> = IfEqual<
Readonly<UnionToTuple<keyof TValue>>, readonly [string], 
[] & readonly ((string|symbol)& keyof TValue)[],
IfLength<
  Readonly<UnionToTuple<keyof TValue>>, 0,
  readonly [],
  IfTrue<
    TOnlyStringKeys, 
    Readonly<RetainStrings<UnionToTuple<keyof TValue>>>,
    Readonly< UnionToTuple<keyof TValue>>
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
 * // readonly ["foo", "bar"]
 * type K1 = Keys<T1>;
 * ```
 */
export type Keys<
  TValue extends AnyObject | unknown[],
  TOnlyStringKeys extends boolean = false
> = IfLength<
  TValue extends readonly unknown[]
    ? NumericKeys<TValue>
    : _ObjKeys<TValue, TOnlyStringKeys>
  , 0, 
  // just make readonly [] if there are no elements
  readonly []
>;
