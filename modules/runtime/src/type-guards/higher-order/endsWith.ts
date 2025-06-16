import { isNumber, isString } from "inferred-types/runtime";
import { EndsWith } from "inferred-types/types";

/**
 * **endsWith**(startingWith) => (val)
 *
 * A higher-level builder pattern which is used to create a TypeGuard
 * which checks whether a string _ends with_ another substring.
 */
export function endsWith<
    const TStartsWith extends readonly (string | number)[],
>(...startingWith: TStartsWith) {
    return <
        const TValue extends string | number,
    >(val: TValue): val is TValue & `${TStartsWith[number]}${string}` => {
        return (
            isString(val) || isNumber(val)
                ? startingWith.some(i => String(val).endsWith(String(i)))
                : false
        ) as EndsWith<TValue, TStartsWith[number]>
    };
}
