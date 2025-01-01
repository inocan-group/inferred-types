import type { Dictionary, FromSimpleToken, Narrowable, ObjectKey, SimpleToken, WithoutValue } from "inferred-types/types";
import { doesExtend } from "inferred-types/runtime";
import { keysOf } from "./keysOf";

export type DictionaryWithoutValueFilter<Without extends Narrowable> = <
  T extends Record<ObjectKey, N>,
  N extends Narrowable,
>(obj: T
) => WithoutValue<T, Without>;

/**
 * **withoutValue**
 *
 * A _higher-order_ runtime utility which allow you to first specify a **type**
 * which you will want to look for in future objects/dictionaries.
 *
 * ```ts
 * const withoutStrings = withoutValue("string");
 * const withoutFooBar = withoutValue("string(foo,bar)");
 * ```
 *
 * The returned utility will now receive dictonary objects and -- in a type strong
 * manner -- removed the key/values where the value extends `string` or `"foo" | "bar"`
 * repectively.
 */
export function withoutValue<TWithout extends SimpleToken>(
  wo: TWithout,
): DictionaryWithoutValueFilter<FromSimpleToken<TWithout>> {
  return <
    T extends Record<ObjectKey, N>,
    N extends Narrowable,
  >(
    obj: T,
  ): WithoutValue<T, FromSimpleToken<TWithout>> => {
    const output: Dictionary = {};

    for (const key of keysOf(obj)) {
      const val = obj[key];
      if (!doesExtend(wo)(val)) {
        output[key] = val;
      }
    }
    return output as unknown as WithoutValue<T, FromSimpleToken<TWithout>>;
  };
}
