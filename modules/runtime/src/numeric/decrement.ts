import { asNumber, isString } from "inferred-types/runtime";
import { Decrement, NumberLike } from "inferred-types/types";


export function decrement<T extends NumberLike>(val: T) {
    return isString(val)
        ? String(asNumber(val) - 1) as Decrement<T>
        : asNumber(val) - 1 as Decrement<T>;
}
