import { LexerState, Narrowable, Unset } from "inferred-types/types";

/**
 * A _take function_ helps to extract a substring from the
 * HEAD of a string token.
 */
export type TakeFunction = <
    const TState extends LexerState<TLeft, TParsed>,
    const TLeft extends string,
    const TParsed extends readonly Narrowable[]
>(token: TState) => Error
    | Unset
    | LexerState<string, [...TParsed, Narrowable]>;

