import { isArray, isString } from "runtime/type-guards";

/**
 * A Take function being used with a Lexer returns a `DeltaReturn` and this type
 * guard validates whether `val` is one.
 */
export function isDeltaReturn(val: unknown): val is [ string, unknown ] {
    return isArray(val) && val.length === 2 && isString(val[0]);
}
