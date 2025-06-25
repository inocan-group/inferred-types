import { asNumber, isString } from "inferred-types/runtime";
import { Increment, NumberLike } from "inferred-types/types";


export function increment<T extends NumberLike>(val: T) {
    return isString(val)
        ? String(asNumber(val) + 1) as Increment<T>
        : asNumber(val) + 1 as Increment<T>;
}
