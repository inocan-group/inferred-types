import { IfLength, IfTrue, IfContainer, IfEqual } from "src/types/boolean-logic";
import { RetainStrings, NumericKeys } from "src/types/lists";
import { UnionToTuple } from "src/types/type-conversion";
import { AnyObject } from "src/types/base-types";
import { Key } from "./Key";

type _ObjKeys<
  TValue extends AnyObject,
  TOnlyStringKeys extends boolean
> = IfLength<
  Readonly<UnionToTuple<keyof TValue>>, 0,
  IfTrue<TOnlyStringKeys, readonly string[], readonly (string | symbol)[]>,
  IfEqual<
    UnionToTuple<Readonly<keyof TValue>>,  [string], 
    readonly string[],
    IfTrue<
      TOnlyStringKeys, 
      Readonly<RetainStrings<UnionToTuple<Readonly<keyof TValue>>>>,
      Readonly< UnionToTuple<Readonly<keyof TValue>>>
    >
  >
>;

/**
 * **Keys**`<TValue, [TExclude]>`
 * 
 * Provides the _keys_ of the container (aka, object or array) `TValue`.
 * 
 * - if a _non-container_ is passed as `TValue` the type will always be an empty readonly array
 *
 * ```ts
 * type T1 = { foo: 1, bar: 2 };
 * // readonly ["foo", "bar"]
 * type K1 = Keys<T1>;
 * ```
 */
export type Keys<
  TValue,
  TOnlyStringKeys extends boolean = false
  > = IfContainer<
  TValue,
  // Container
  TValue extends readonly unknown[]
    ? NumericKeys<TValue>
    : _ObjKeys<TValue & AnyObject, TOnlyStringKeys>
  ,
  // Non-Container
  readonly Key[]
>;



// IfLength<
//   TValue extends readonly unknown[]
//     ? NumericKeys<TValue>
//     : _ObjKeys<TValue, TOnlyStringKeys>
//   , 0, 
//   // just make readonly [] if there are no elements
//   readonly []
// >;
