import type { AsTypeSubtype, TypedError } from "inferred-types/types";
import { isError } from "inferred-types/runtime";

export function isTypedError<T extends string>(_type: T) {
    /**
     * Type guard which validates that the `val` passsed in
     * extends the configured variant of `TypedError`
     */
    return (val: unknown): val is TypedError<
        AsTypeSubtype<T>[0],
        AsTypeSubtype<T>[1]
    > => {
        return isError(val) && "type" in val && typeof val.type === "string";
    };
}
