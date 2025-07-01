import { err } from "inferred-types/runtime";
import { LexerState, TakeFunction } from "inferred-types/types";
import { isArray, isError, isObject, isString, isUnset } from "runtime/type-guards";

type TrimType = "trim" | "trimStart" | "trimEnd" | "none";

type LexerOptions = {
    /**
     * what -- _if any_ -- `trim` operation should be performed on
     * the token string prior to passing to each take function.
     */
    trim: TrimType;
}


export function isLexerState(val: unknown): val is LexerState {
    return isObject(val)
        && "remaining" in val && "tokens" in val
        && isArray(val.tokens) && isString(val.remaining)
}

/**
 * **lexer**`(opt, ...takeFns) -> (parseString) -> Error | ParsedResult`
 *
 * A higher order function which:
 *
 * 1. receives **Take Functions** to perform lexing functions
 * 2. receives the initial string to be parsed
 * 3. returns either an Error or a `ParsedResult`
 *
 * NOTE:
 * - the lexer may reduce the parse string to an empty string, however,
 * as long as any lexing _step_ doesn't return an error it will return
 * successfully when it has parsed as much of the string as it is
 * able to.
 */
export function createLexer<
    TOpt extends LexerOptions,
    TTake extends readonly TakeFunction[]
>(
    opt: TOpt,
    ...takeFns: TTake
) {

    return <TParse extends string>(token: TParse) => {
        let state: LexerState = { parse: token, tokens: []};

        for (const take of takeFns) {
            switch (opt.trim) {
                case "trim": {
                    state.parse = state.parse.trim();
                }
                case "trimEnd": {
                    state.parse = state.parse.trimEnd();
                }
                case "trimStart": {
                    state.parse = state.parse.trimStart();
                }
                case "none": {
                    break;
                }
                default:
                    throw err(
                        `parse/create-lexer`,
                        `The tokenizer provided as part of the createLexer() builder was called with a 'trim' option of '${String(opt.trim)} which is NOT known!`,
                        { trim: opt.trim }
                    )
            }
            const result = take(state);
            if(isError(result)) {
                return result; // fail fast
            }

            if(isLexerState(result)) {
                state = result;
            }
        }

        return state;
    }


}
