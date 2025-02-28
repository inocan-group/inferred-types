import type { IsEmpty, Narrowable, NarrowObject, Tuple } from "inferred-types/types";
import { isEmpty } from "inferred-types/runtime";

export function ifEmpty<
    T extends Tuple<N> | NarrowObject<N>,
    N extends Narrowable,
    TEmpty,
    TNotEmpty,
>(
    val: T,
    empty: TEmpty,
    notEmpty: TNotEmpty,
) {
    return (
        isEmpty(val) ? empty : notEmpty
    ) as IsEmpty<T> extends true ? TEmpty : TNotEmpty;
}
