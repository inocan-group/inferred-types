import type { IsEmpty, Narrowable } from "inferred-types/types";
import { isEmpty } from "inferred-types/runtime";

/**
 * **ifEmpty(val, empty, notEmpty)**
 *
 * A boolean branching operator
 */
export function ifEmpty<
    T,
    TEmpty extends Narrowable,
    TNotEmpty extends Narrowable,
>(
    val: T,
    empty: TEmpty,
    notEmpty: TNotEmpty,
) {
    return (
        isEmpty(val) ? empty : notEmpty
    ) as IsEmpty<T> extends true ? TEmpty : TNotEmpty;
}
