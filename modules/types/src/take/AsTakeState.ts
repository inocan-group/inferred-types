import type { TakeState, ExpandDictionary, As } from "inferred-types/types";

/**
 * **AsTakeState**`<T>`
 *
 * Ensures that if `T` is a _string_ that it's converted to an appropriate
 * `TakeState`.
 */
export type AsTakeState<T extends string | TakeState | Error> = As<
T extends string
    ?  { kind: "TakeState";  parseString: T; parsed: []; tokens: [] }
    : T extends TakeState
        ? T
    : T extends Error
        ? Error & T
    : never,
    T extends Error
    ? Error | TakeState
    : TakeState
>;

