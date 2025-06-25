import { AsNumber, NumberLike } from "inferred-types/types";
import {  isString } from "inferred-types/runtime";


export function asNumber<T extends NumberLike>(val: T): AsNumber<T> {
    return isString(val)
        ? Number(val) as AsNumber<T>
        : val as AsNumber<T>
}
