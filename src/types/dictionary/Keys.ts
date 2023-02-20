import { AnyObject } from "src/types/base-types";
import { IfLength, IfEqual, IfTrue } from "src/types/boolean-logic";
import { RetainStrings, NumericKeys } from "src/types/lists";
import { Narrowable } from "src/types/literals";
import { UnionToTuple } from "src/types/type-conversion";

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
  TValue extends AnyObject | Narrowable[],
  TOnlyString extends boolean = false
> = TValue extends readonly Narrowable[]
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
          Readonly<UnionToTuple<keyof TValue>>
        >
      >
    >;
