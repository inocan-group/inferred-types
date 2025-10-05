import type {
    Dictionary,
    FromInputToken,
    InputToken,
    Narrowable,
    ObjectKey,
    WithValue,
} from "inferred-types/types";
import { doesExtend, keysOf } from "inferred-types/runtime";

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
 * The returned utility will now receive dictionary objects and -- in a type strong
 * manner -- removed the key/values where the value extends `string` or `"foo" | "bar"`
 * respectively.
 */
export function withValue<TWithout extends InputToken>(
    wo: TWithout,
): DictionaryWithValueFilter<FromInputToken<TWithout>> {
    return <
        T extends Record<ObjectKey, N>,
        N extends Narrowable,
    >(
        obj: T,
    ): WithValue<T, FromInputToken<TWithout>> => {
        const output: Dictionary = {};

        for (const key of keysOf(obj)) {
            const val = obj[key];
            if (doesExtend(wo)(val)) {
                output[key] = val;
            }
        }
        return output as unknown as WithValue<T, FromInputToken<TWithout>>;
    };
}
