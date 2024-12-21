import type {
  Dictionary,
  FromSimpleToken,
  Narrowable,
  ObjectKey,
  SimpleToken,
  WithValue,
} from "inferred-types/types";
import { doesExtend } from "src/runtime-types/doesExtend";
import { keysOf } from "./keysOf";

export type DictionaryWithValueFilter<Without extends Narrowable> = <
  T extends Record<ObjectKey, N>,
  N extends Narrowable,
>(obj: T
) => WithValue<T, Without>;

/**
 * **WithValue**
 *
 * A _higher-order_ runtime utility which allow you to first specify a **type**
 * which you will want to look for in future objects/dictionaries.
 *
 * ```ts
 * const withoutStrings = WithValue("string");
 * const withoutFooBar = WithValue("string(foo,bar)");
 * ```
 *
 * The returned utility will now receive dictonary objects and -- in a type strong
 * manner -- removed the key/values where the value extends `string` or `"foo" | "bar"`
 * repectively.
 */
export function withValue<TWithout extends SimpleToken>(
  wo: TWithout,
): DictionaryWithValueFilter<FromSimpleToken<TWithout>> {
  return <
    T extends Record<ObjectKey, N>,
    N extends Narrowable,
  >(
    obj: T,
  ): WithValue<T, FromSimpleToken<TWithout>> => {
    const output: Dictionary = {};

    for (const key of keysOf(obj)) {
      const val = obj[key];
      if (doesExtend(wo)(val)) {
        output[key] = val;
      }
    }
    return output as unknown as WithValue<T, FromSimpleToken<TWithout>>;
  };
}
