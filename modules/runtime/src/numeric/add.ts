import { asNumber, isString } from "inferred-types/runtime";
import { Add, NumberLike } from "inferred-types/types";

export function add<
    A extends NumberLike,
    B extends NumberLike
>(
    a: A,
    b: B
) {
    return isString(a) || isString(b)
       ? String(asNumber(a) + asNumber(b)) as Add<A,B>
       : asNumber(a) + asNumber(b) as Add<A,B>
}
