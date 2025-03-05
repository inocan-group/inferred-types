import { isError, split } from "inferred-types/runtime";
import { TypedError } from "inferred-types/types";

export function isTypedError<T extends string>(typeSubtype: T) {
    const parts = split(typeSubtype, "/");
    const [type, subType] = parts.length > 1
        ? parts
        : [parts, undefined];

    return (val: unknown): val is TypedError<typeof type, typeof subType> => {
        return isError(val) && "type" in val && typeof val.type === "string"
    }

}
