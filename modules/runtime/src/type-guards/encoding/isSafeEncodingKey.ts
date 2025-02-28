import type {
    SafeEncodingKey,
} from "inferred-types/types";
import { SAFE_ENCODING_KEYS } from "inferred-types/constants";
import { isString } from "inferred-types/runtime";

/**
 * Type guard which validates that the `val` passed in is a `SafeEncodingKey`
 */
export function isSafeEncodingKey(val: unknown): val is SafeEncodingKey {
    return isString(val) && val.length === 1 && Object.keys(SAFE_ENCODING_KEYS).includes(val);
}
