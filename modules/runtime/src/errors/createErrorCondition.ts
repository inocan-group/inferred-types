import type { Err } from "inferred-types/types";

/**
 * **createErrorConditionTemplate**`(kind,[msg],[utility]) => ErrorCondition`
 *
 * A higher order runtime utility for generating reusable `ErrorCondition`'s at
 * runtime.
 */
export function createErrorCondition<
    TKind extends string,
    TMsg extends string = never,
    TUtility extends string = never,
>(kind: TKind, msg: TMsg = "" as never, utility: TUtility = "" as never) {
    return {
        __kind: "Error",
        kind,
        msg,
        utility,
    } as unknown as Err<TKind, TMsg>;
}

export function errCondition(kind: string, msg?: string) {
    return {
        __kind: "Error",
        kind,
        msg,
    };
}
