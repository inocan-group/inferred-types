import type { Narrowable, StartsWith } from "inferred-types/types";
import { isNumber, isString } from "inferred-types/runtime";

/**
 * **StartingWithTypeGuard**`<literal>`
 *
 * A type guard built using the `startsWith` utility.
 */
export type StartingWithTypeGuard<TStartsWith extends string> = <
    TValue extends Narrowable,
>(val: TValue
) => val is TValue & `${TStartsWith}${string}`;

/**
 * **startsWith**(startingWith) => (val)
 *
 * A higher-level builder pattern which is used to create a TypeGuard
 * which checks whether a string _starts with_ another substring.
 */
export function startsWith<
    const TStartsWith extends readonly (string | number)[],
>(...startingWith: TStartsWith) {
    return <
        const TValue extends string | number,
    >(val: TValue): val is TValue & `${TStartsWith[number]}${string}` => {
        return (
            isString(val) || isNumber(val)
                ? startingWith.some(i => String(val).startsWith(String(i)))
                : false
        ) as StartsWith<TValue, TStartsWith[number]>;
    };
}
