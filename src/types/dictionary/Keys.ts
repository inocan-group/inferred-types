import { IfEqual, IfTrue } from "../boolean-logic";
import { IfLength } from "../boolean-logic/IfLength";
import { RetainStrings } from "../lists";
import { NumericKeys } from "../lists/NumericKeys";
import { Narrowable } from "../literals/Narrowable";
import { UnionToTuple } from "../type-conversion/UnionToTuple";

/**
 * **Keys**`<TValue, [TExclude]>`
 * 
 * Provides the _keys_ of an object `TValue`. 
 *
 * - all keys will be typed as `readonly (keyof T & string)[]`
exclusion property described above.
 * ```ts
 * type T1 = { foo: 1, bar: 2 };
 * // readonly ["foo", "bar"] & (keyof T1)[]
 * type K = Keys<T1>;
 * ```
 */
export type Keys<
  TValue extends Narrowable,
  TOnlyString extends boolean = false
> = TValue extends readonly any[]
  ? NumericKeys<TValue>
  : IfEqual<
      Readonly<UnionToTuple<keyof TValue>>, readonly [string], 
      readonly [],
      IfLength<
        Readonly<UnionToTuple<keyof TValue>>, 0,
        readonly [],
        IfTrue<
          TOnlyString, 
          Readonly<RetainStrings<UnionToTuple<keyof TValue>>>,
          Readonly<UnionToTuple<keyof TValue> >
        >
      >
    >;
