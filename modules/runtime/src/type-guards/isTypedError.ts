import type { TypedError } from "inferred-types/types";
import { Never } from "inferred-types/constants";
import { isError, split } from "inferred-types/runtime";

export function isTypedError<T extends string>(typeSubtype: T) {
    const parts = split(typeSubtype, "/");
    const [_type, _subType] = (
        parts.length === 2
            ? parts as [string, string]
            : parts.length === 1
                ? [parts[0], undefined] as [string, undefined]
                : Never
    );

    return (val: unknown): val is TypedError<typeof _type, typeof _subType> => {
        return isError(val) && "type" in val && typeof val.type === "string";
    };
}
