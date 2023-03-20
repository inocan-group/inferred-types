
import { 
  IfLength, 
  IfTrue, 
  IfContainer, 
  IfEqual, 
  Key, 
  AnyObject, 
  UnionToTuple, 
  RetainStrings, 
  NumericKeys,
  IfReadonlyObject,
} from "src/types";

type _ObjKeys<
  TValue extends AnyObject,
  TOnlyStringKeys extends boolean
> = IfLength<
  Readonly<UnionToTuple<keyof TValue>>, 0,
  IfTrue<
    TOnlyStringKeys, 
     string[], 
     (string | symbol)[]
  >,
  IfEqual<
    UnionToTuple<Readonly<keyof TValue>>,  [string], 
    string[],
    IfTrue<
      TOnlyStringKeys, 
      RetainStrings<UnionToTuple<Readonly<keyof TValue>>>,
      UnionToTuple<Readonly<keyof TValue>>
    >
  >
>;



/**
 * **Keys**`<TValue, [TOnlyStringKeys]>`
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
    ? NumericKeys<TValue> // array/tuple
    : IfReadonlyObject<
      TValue,
      Readonly<_ObjKeys<TValue & object, TOnlyStringKeys>>,
      _ObjKeys<TValue & object, TOnlyStringKeys>
    >,
  // Non-Container
  readonly Key[]
>;


