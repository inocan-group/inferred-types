import type { EndsWith } from "inferred-types/types";
import { isNumber } from "runtime/type-guards/numeric";
import { isString } from "runtime/type-guards";

/**
 * **endsWith**(endingWith) => (val) -> true | false
 *
 * A higher-level builder pattern which is used to create a boolean
 * operator which indicates whether the given function ends with any
 * of the provided `endingWith` string literal values.
 */
export function endsWithTypeguard<
    const TEndsWith extends readonly (string | number)[],
>(...endingWith: TEndsWith) {
    return <
        const TValue extends string | number,
    >(val: TValue): val is TValue extends string
        ? TValue & `${TEndsWith[number]}${string}`
        : TValue => {
        return (
            isString(val) || isNumber(val)
                ? endingWith.some(i => String(i) !== "" && String(val).endsWith(String(i)))
                : false
        );
    };
}

export function endsWith<
    const TEndsWith extends readonly (string | number)[],
>(...endingWith: TEndsWith) {
    return <
        const TValue extends string | number,
    >(val: TValue) => {
        return (
            isString(val) || isNumber(val)
                ? endingWith.some(i => String(i) !== "" && String(val).endsWith(String(i)))
                : false
        ) as EndsWith<TValue, TEndsWith>;
    };
}
