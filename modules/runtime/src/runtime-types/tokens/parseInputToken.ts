import { IT_ATOMIC_TOKENS } from "inferred-types/constants";
import { isString,  trim } from "inferred-types/runtime";
import type { InputTokenLike } from "inferred-types/types";

interface ReadonlyArray<T> {
    /**
     * Determines whether an array includes a certain element, returning true or false as appropriate.
     * @param searchElement The element to search for.
     * @param fromIndex The position in this array at which to begin searching for searchElement.
     */
    includes(searchElement: T, fromIndex?: number): boolean;
}

export function parseInputToken(token: InputTokenLike) {

    return isString(token)
        ? IT_ATOMIC_TOKENS.includes(trim(token))

}
