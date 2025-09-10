import { IT_TakeKind, IT_Token } from "inferred-types/types";
import { isObject } from "runtime/type-guards";

function isBase(val: unknown): val is IT_Token {
    return isObject(val) && "name" in val && "token" in val && "kind" in val && "__kind" in val
        && "type" in val && "rest" in val && typeof val.rest === "string" && val.__kind === "IT_Token"
}

/**
 * **isTokenDefinition**`(val, [variant])`
 *
 * Type guard which validates whether `val` is a `IT_Token` variant.
 *
 * - you may optionally include a _particular_ variant you want to match on
 */
export function isTokenDefinition<V extends IT_TakeKind>(val: unknown, variant?: V): val is V extends undefined ? IT_Token : IT_Token<V> {
    return variant
        ? isBase(val) && val.kind === variant
        : isBase(val)
}
