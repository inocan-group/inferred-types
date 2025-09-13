import type {
    Dictionary,
    FromSimpleToken,
    Narrowable,
    ObjectKey,
    SimpleToken,
    InputToken,
    WithoutValue
} from "inferred-types/types";
import { doesExtend, keysOf } from "inferred-types/runtime";

export type DictionaryWithoutValueFilter<Without extends Narrowable> = <
    const T extends Record<ObjectKey, N>,
    N extends Narrowable,
>(
    obj: T
) => WithoutValue<T, Without>;

/**
 * **withoutValue**
 *
 * A _higher-order_ runtime utility which allow you to first specify a **type**
 * which you will want to look for in future objects/dictionaries.
 *
 * ### Example
 *
 * ```ts
 * const withoutStrings = withoutValue("string");
 * const withoutFooBar = withoutValue("string(foo,bar)");
 * ```
 *
 * The returned utility will now receive dictionary objects and -- in a type strong
 * manner -- removed the key/values where the value extends `string` or `"foo" | "bar"`
 * respectively.
 */
export function withoutValue<TWithout extends InputToken>(
    wo: TWithout,
): DictionaryWithoutValueFilter<FromInputToken<TWithout>> {
    return <
        T extends Record<ObjectKey, N>,
        N extends Narrowable,
    >(
        obj: T,
    ): WithoutValue<T, FromInputToken<TWithout>> => {
        const output: Dictionary = {};

        for (const key of keysOf(obj)) {
            const val = obj[key];
            if (!doesExtend(wo)(val)) {
                output[key] = val;
            }
        }
        return output as unknown as WithoutValue<T, FromInputToken<TWithout>>;
    };
}
