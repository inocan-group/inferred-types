import { As, ErrContext, StripLeading, TakeState } from "inferred-types/types";

/**
 * **UpdateTake**`<TState, TParsed, [TToken]>`
 *
 * Updates an existing **TakeState** `TState` by:
 *
 * - the `TParsed` generic must always be a _string_ and will represent the "parsed" value
 *   as well as the substring which will be removed from the `parseString` property
 * - the `TToken` generic -- when set -- will be what is added to the `tokens` property
 *    - when `TToken` is not set it's value is set to `TToken`
 */
export type UpdateTake<
    TState extends TakeState,
    TParsed extends string,
    TToken = TParsed
> = As<{
    kind: "TakeState";
    parsed: [...TState["parsed"], TParsed];
    parseString: StripLeading<TState["parseString"], TParsed>;
    tokens: [...TState["tokens"], TToken];
}, TakeState>
