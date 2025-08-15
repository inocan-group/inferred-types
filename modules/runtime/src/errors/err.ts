import type {
    EmptyObject,
    Err,
    IsNever,
    TypedError
} from "inferred-types/types";
import { toKebabCase } from "inferred-types/runtime";
import { dropFirstStackFrame } from "./dropFirstStackFrame";

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
    err.__kind = "Error";
    err.type = toKebabCase(t);
    err.subType = toKebabCase(subType);
    if (message) {
        err.message = message;
    }

    return err as Err<T, M>;
}

export function err<
    TType extends string,
    TMsg extends string = "",
    const TCtx extends Record<string, U> = never,
    U = unknown
>(
    type: TType,
    message?: TMsg,
    ctx?: TCtx
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

    return dropFirstStackFrame(err) as Err<TType, TMsg, IsNever<TCtx> extends true ? EmptyObject : TCtx>;
}
