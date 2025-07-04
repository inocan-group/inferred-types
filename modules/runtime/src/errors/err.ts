import type { Err, Narrowable, TypedError, EmptyObject, IsNever } from "inferred-types/types";
import { toKebabCase } from "inferred-types/runtime";

/**
 * **typedError**(type, message, [ctx])
 *
 * @deprecated prefer using the provided `err(type,message,[ctx])`
 * function
 */
export function typedError<
    T extends string,
    M extends string,
>(
    type: T,
    message: M = "" as M
) {
    const err = new Error(message) as TypedError<string, string | undefined>;
    const [t, subType] = type.split("/");
    err.type = toKebabCase(t);
    err.subType = toKebabCase(subType);
    if (message) {
        err.message = message;
    }

    return err as Err<T, M>;
}

export function err<
    T extends string,
    M extends string = "",
    C extends Record<string, N> = never,
    N extends Narrowable = Narrowable
>(
    type: T,
    message?: M,
    ctx?: C
) {
    const err = new Error(message) as TypedError<string, string | undefined>;
    const [t, subType] = type.split("/");
    err.type = toKebabCase(t);
    err.subType = toKebabCase(subType);
    if (message) {
        err.message = message;
    }
    if (ctx) {
        for (const k of Object.keys(ctx)) {
            err[k] = ctx[k];
        }
    }

    return err as Err<T, M, IsNever<C> extends true ? EmptyObject : C>;
}
