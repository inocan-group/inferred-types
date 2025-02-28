import type { Narrowable } from "inferred-types/types";
import { isNumber, isString } from "inferred-types/runtime";

export type EndingWithTypeGuard<T extends string> = <
    V extends Narrowable,
>(val: V
) => val is V & `${string}${T}`;

/**
 * **endsWith**(endingIn) => (val)
 *
 * Creates a TypeGuard which checks whether a value _ends with_ a
 * particular string literal.
 */
export function endsWith<
    T extends string,
>(endingIn: T): EndingWithTypeGuard<T> {
    return <V extends Narrowable>(val: V): val is V & `${string}${T}` => {
        return isString(val)
            ? !!val.endsWith(endingIn)
            : isNumber(val)
                ? !!String(val).endsWith(endingIn)
                : false;
    };
}
