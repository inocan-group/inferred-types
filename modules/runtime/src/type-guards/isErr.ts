import { Err } from "inferred-types/types";
import { retainUntil, stripUntil } from "runtime/string-literals";
import { isError } from "runtime/type-guards/isError";

/**
 * **IsErr**`<T,[U]>`
 *
 * Type guard which validates whether `T` is an Error extended from the `Err<..>` utility.
 *
 * - if the type is specified then the type (and optionally the subType) properties will be explicitly checked too
 * - all Err<...> types _extend_ the Javascript Error class
 *
 * **Related:** `isError()`
 */
export function isErr<TType extends string>(val: unknown, type?: TType): val is TType extends string ? Err<TType> : Err {
    return type
        ? isError(val) && "type" in val && retainUntil(type, "/") === val.type && (
            type.includes("/")
                ? "subType" in val && val.subType === stripUntil(type, "/")
                : true
        )
        : isError(val)
}
