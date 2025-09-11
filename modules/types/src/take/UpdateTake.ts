import { ErrContext, StripLeading, TakeState } from "inferred-types/types";

/**
 * **UpdateTake**`<T, U>`
 *
 * Updates an existing **Take** state `T` with the content found in `U`.
 *
 * - `U` is the return type of the `TakeParser` function
 */
export type UpdateTake<
    T extends TakeState | Error,
    U extends [ null, Error ] | [ taken: string, parsed: readonly unknown[] ]
> = T extends Error
    ? T
: T extends TakeState
    ? U extends [
        infer _Taken extends null,
        infer Token extends Error
    ]
        ? ErrContext<Token, { parsed: T["parsed"]; parseString: T["parseString"]; tokens: T["tokens"] }>
    : U extends [
        infer Taken extends string,
        infer Token
    ]
        ? {
            kind: "Take";
            parsed: [...T["parsed"], Taken];
            parseString: StripLeading<T["parseString"], Taken>;
            tokens: [...T["tokens"], Token];
        }
: never
: never;
