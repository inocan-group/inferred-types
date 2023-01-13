import { IfEquals, IsEqual } from "src/types/boolean-logic/equivalency";
import { AnyObject } from "./boolean-logic";
import { IfOr } from "./boolean-logic/Or";

type KeyCalc<
  TValue extends Record<string, any> | readonly string[],
  TExclude extends string | undefined
> = TValue extends readonly string[]
? // if T is a readonly string[]
  TExclude extends string
  ? IfOr<
      [ 
        IsEqual<TValue, {}>,
        IsEqual<TValue, []>,
        IsEqual<TValue, Record<string, any>>,
      ],
      [],
      Exclude<TValue[number], TExclude>
    >
  : IfOr<
      [ 
        IsEqual<TValue, {}>,
        IsEqual<TValue, []>,
        IsEqual<TValue, Record<string, any>>,
      ],
      [],
      TValue[number]
    > 
: // if T is Record<string, any>
  TExclude extends string
    ? IfOr<
        [ 
          IsEqual<TValue, {}>,
          IsEqual<TValue, []>,
          IsEqual<TValue, Record<string, any>>,
        ],
        [],
        Exclude<keyof TValue & string, TExclude>
      >
    : IfOr<
        [ 
          IsEqual<TValue, {}>,
          IsEqual<TValue, []>,
          IsEqual<TValue, Record<string, any>>,
        ],
        [],
        keyof TValue & string
      >;

/**
 * **Keys**`<TValue, [TExclude]>`
 * 
 * Provides the _keys_ of an object `TValue`. 
 *
 * - all keys will be typed as `keyof T & string`
 * - the return type is a _union type_ of all the keys
 * - Exclusions:
 *   - You may optionally express certain keys that you want to exclude
 *   - These exclusions should be represented as a union of string literals
 * - Composition:
 *    - while typically `TValue` would be an object, it can also be `readonly string[]`
 *    - in this situation, you will probably be using it to filter down the keys with the exclusion property described above.
 * ```ts
 * const t1 = { foo: 1, bar: 2 };
 * // "foo" | "bar"
 * type K = Keys<typeof t1>;
 * // "bar"
 * type K2 = Keys<typeof t1, "foo">
 * const t2 = ["foo", "bar"] as const;
 * // "foo" | "bar"
 * type K = Keys<typeof t2>;
 * ```
 */
export type Keys<
  TValue extends AnyObject,
> = readonly (keyof TValue & string)[]

