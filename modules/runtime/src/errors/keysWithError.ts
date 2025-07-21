import type {
    Dictionary,
} from "inferred-types/types";
import { indexOf, isError } from "inferred-types/runtime";
import { KeysWithError } from "@inferred-types/types";

/**
 * **keysWithError**`(obj)`
 *
 * Returns a list of _keys_ where the passed in object is
 */
export function keysWithError<
    const T extends Dictionary<string>,
>(obj: T) {
    const keys = Object.keys(obj).filter((k) => {
        return isError(indexOf(obj, k));
    });

    return keys as KeysWithError<T>;
}
