import type { Add, NumberLike } from "inferred-types/types";
import { asNumber, isString } from "inferred-types/runtime";

export function add<
    A extends NumberLike,
    B extends NumberLike
>(
    a: A,
    b: B
): A extends number ? As<PreProcess<A, B>, number> : A extends `${number}` ? As<PreProcess<A, B>, `${number}`> : never {
    return isString(a) || isString(b)
        ? String(asNumber(a) + asNumber(b)) as Add<A, B>
        : asNumber(a) + asNumber(b) as Add<A, B>;
}
