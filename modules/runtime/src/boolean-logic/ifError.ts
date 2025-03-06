import type { IsError, Narrowable } from "inferred-types/types";
import { isError } from "src/type-guards";

/**
 * **ifError(val, wasError, wasNotError)**
 *
 * A boolean branching operator
 */
export function ifError<
    T extends Narrowable,
    E extends Narrowable,
    NE extends Narrowable,
>(
    val: T,
    wasError: E,
    wasNotError: NE
) {
    return (
        isError(val)
            ? wasError
            : wasNotError
    ) as IsError<T> extends true ? E : NE;
}
