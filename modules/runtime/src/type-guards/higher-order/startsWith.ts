import type { Narrowable, StartsWith } from "inferred-types/types";
import { isNumber } from "runtime/type-guards/numeric";
import { isString } from "runtime/type-guards/isString";

/**
 * **StartingWithTypeGuard**`<literal>`
 *
 * A type guard built using the `startsWith` utility.
 */
export type StartingWithTypeGuard<TStartsWith extends readonly (string|number)[]> = <
    const TValue extends string | number,
>(
    val: TValue
) => val is TValue & StartsWith<TValue, TStartsWith>;

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
>(...startingWith: TStartsWith): StartingWithTypeGuard<TStartsWith> {
    return <const TValue extends string | number>(val: TValue): val is TValue & StartsWith<TValue,TStartsWith> => {
        return (
            isString(val) || isNumber(val)
                ? startingWith.some(i => String(i) !== "" && String(val).startsWith(String(i)))
                : false
        );
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
                ? startingWith.some(i => String(i) !== "" && String(val).startsWith(String(i)))
                : false
        ) as StartsWith<TValue, TStartsWith>;
    };
}
