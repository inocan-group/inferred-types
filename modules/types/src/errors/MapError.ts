import type { ErrorConditionShape } from "./ErrorCondition";
import type { Throw } from "./Throw";

/**
 * **MapError**`<TError,TUtility,[TGeneric]>`
 *
 * Allows a type utility which receives an `ErrorCondition` to
 * proxy that through while changing the "type" of error to
 * whatever is appropriate now in this new scope of execution.
 *
 * **Related:** `ProxyError`
 */
export type MapError<
    // the error being proxied
    TError extends ErrorConditionShape,
    // the new "kind" of error to map to
    TKind extends string,
    // the type utility catching the error condition
    TUtility extends string,
    // the generic parameter which received the error
    TGeneric extends string | null = null,
> = Throw<
    TKind,
    TGeneric extends string
        ? `The "${TUtility}" type utility received an ErrorCondition<"${TError["kind"]}"> in it's ${TGeneric} parameter. The underlying error was: ${TError["msg"]}`
        : `The "${TUtility}" type utility an ErrorCondition<"${TError["kind"]}">. The underlying error was: ${TError["msg"]}`,
    TUtility,
    { underlying: TError }
>;
