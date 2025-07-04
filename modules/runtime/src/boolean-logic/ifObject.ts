import type { If, IsObject, Narrowable } from "inferred-types/types";
import { isDictionary } from "inferred-types/runtime";

export function ifObject<
    T extends Narrowable,
    IF extends Narrowable,
    ELSE extends Narrowable,
>(
    val: T,
    ifObj: IF,
    notObj: ELSE,
): If<IsObject<T>, IF, ELSE> {
    return (isDictionary(val) ? ifObj : notObj) as If<IsObject<T>, IF, ELSE>;
}
