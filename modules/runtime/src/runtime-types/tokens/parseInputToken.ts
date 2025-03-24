import type { InputTokenLike } from "inferred-types/types";
import { IT_ATOMIC_TOKENS } from "inferred-types/constants";
import { isString, trim } from "inferred-types/runtime";

// declare type ReadonlyArray<T> =

export function parseInputToken(token: InputTokenLike) {
    return isString(token)
        ? IT_ATOMIC_TOKENS.includes(trim(token) as any)
        : "";
}
