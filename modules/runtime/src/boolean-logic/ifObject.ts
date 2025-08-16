import type { If, IsDictionary, Narrowable } from "inferred-types/types";
import { isDictionary } from "inferred-types/runtime";

export function ifObject<
    T extends Narrowable,
    IF extends Narrowable,
    ELSE extends Narrowable,
>(
    val: T,
    ifObj: IF,
    notObj: ELSE,
): If<IsDictionary<T>, IF, ELSE> {
    return (isDictionary(val) ? ifObj : notObj) as If<IsDictionary<T>, IF, ELSE>;
}
