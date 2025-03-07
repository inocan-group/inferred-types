import { Err } from "inferred-types/types";
import { toKebabCase, asTypeSubtype, toPascalCase } from "inferred-types/runtime";

export function asTypedError<
    TType extends string,
    TMsg extends string
>(
    classification: TType,
    msg: TMsg
) {
    const [type,subType] = asTypeSubtype(classification);
    const err = new Error(msg) as Err<TType,TMsg>;
    err.name = toPascalCase(type);
    err.type = toKebabCase(type);
    err.subType = toKebabCase(subType);

    return err;
}
