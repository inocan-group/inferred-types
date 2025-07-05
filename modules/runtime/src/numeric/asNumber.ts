import type { AsNumber, NumberLike } from "inferred-types/types";
import { isString } from "inferred-types/runtime";

/**
 * **asNumber**`(val)`
 *
 * Converts `NumberLike` values to a number.
 *
 * - also handles numeric strings which have leading zeros
 */
export function asNumber<T extends NumberLike>(val: T): AsNumber<T> {
    return isString(val)
        ? Number(val) as AsNumber<T>
        : val as AsNumber<T>;
}
