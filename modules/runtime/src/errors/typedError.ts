import { Err, TypedError } from "inferred-types/types";
import { toKebabCase } from "src/literals";


export function typedError<
    T extends string,
    M extends string,
>(
    type: T,
    message: M = "" as M
)  {
    const err = new Error() as TypedError<string, string|undefined>;
    const [t, subType] = type.split("/");
    err.type = toKebabCase(t);
    err.subType = toKebabCase(subType);
    if(message) {
        err.message = message;
    }

    return err as Err<T,M>
}
