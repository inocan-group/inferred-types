import type { Narrowable, StartsWith } from "inferred-types/types";
import { isNumber, isString } from "inferred-types/runtime";

/**
 * **StartingWithTypeGuard**`<literal>`
 *
 * A type guard built using the `startsWith` utility.
 */
export type StartingWithTypeGuard<TStartsWith extends string> = <
    TValue extends Narrowable,
>(
    val: TValue
) => val is TValue & `${TStartsWith}${string}`;

/**
 * **startsWithTypeguard**(startingWith) => (val)
 *
 * A higher-level builder pattern which is used to create a TypeGuard
 * which checks whether a string _starts with_ another substring.
 *
 * **Related:** `startsWith()`
 */
export function startsWithTypeguard<
    const TStartsWith extends readonly (string | number)[],
>(...startingWith: TStartsWith) {
    return <
        const TValue extends string | number,
    >(val: TValue): val is TValue extends string
        ? TValue & `${TStartsWith[number]}${string}`
        : TValue => {
        return (
            isString(val) || isNumber(val)
                ? startingWith.some(i => String(val).startsWith(String(i)))
                : false
        ) as StartsWith<TValue, TStartsWith[number]>;
    };
}

/**
 * **startsWith**`(startingWith) -> (val) -> true | false`
 *
 * A higher-level builder pattern which is used to create a boolean
 * operator which indicates whether the given function starts with any
 * of the provided `startingWith` string literal values.
 *
 * **Related:** `startsWithTypeguard()`
 */
export function startsWith<
    const TStartsWith extends readonly (string | number)[]
>(
    ...startingWith: TStartsWith
) {
    return <
        const TValue extends string | number,
    >(val: TValue) => {
        return (
            isString(val) || isNumber(val)
                ? startingWith.some(i => String(val).startsWith(String(i)))
                : false
        ) as StartsWith<TValue, TStartsWith>;
    };
}
