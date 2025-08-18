import type { Narrowable, Unbrand } from "inferred-types/types";

/**
 * **unbrand**`(val)`
 *
 * This runtime utility _does not_ modify the runtime value at all but it
 * will strip off a "branded type" which was added with the `brand()` or
 * `Brand<T,U>` utilities
 */
export function unbrand<T extends Narrowable>(val: T): Unbrand<T> {
    return val as Unbrand<T>;
}
