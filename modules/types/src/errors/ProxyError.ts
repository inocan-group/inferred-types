import type { ErrorCondition } from "./ErrorCondition";
import type { Throw } from "./Throw";

type Underlying<T extends ErrorCondition> = "msg" extends keyof T
    ? T["msg"] extends string
        ? T["msg"]
        : "no message"
    : "no message";

type StackDesc<T extends ErrorCondition> = "stack" extends keyof T
    ? T["stack"] extends readonly [string, ...string[]]
        ? ` [ from  ${T["stack"][0]} ]`
        : ""
    : "";

/**
 * **ProxyError**`<TError,TUtility,[TGeneric]>`
 *
 * Allows a type utility which receives an `ErrorCondition` to
 * proxy that through to the caller but with a small amount of additional
 * context to allow the user to better understand the call chain.
 *
 * **Notes:**
 * - the "kind" of error is not modified; if you want that behavior use `MapError`
 * instead.
 * - you can improve the error message by stating the generic parameter which
 * received the error
 */
export type ProxyError<
    // the error being proxied
    TError extends ErrorCondition,
    // the type utility catching the error condition
    TUtility extends string,
    // the generic parameter which received the error
    TGeneric extends string | null = null,
> = Throw<
    TError["kind"],
    TGeneric extends string
        ? `The "${TUtility}" type utility detected an ErrorCondition in the "${TGeneric}" property passed into it. The underlying error message${StackDesc<TError>} was: ${Underlying<TError>}`
        : `The "${TUtility}" type utility detected an ErrorCondition. The underlying error message${StackDesc<TError>} was: ${Underlying<TError>}`,
    TUtility,
    { underlying: TError }
>;
