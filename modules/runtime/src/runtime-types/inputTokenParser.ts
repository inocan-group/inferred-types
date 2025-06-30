import {
    err,
    takeAtomicToken
} from "inferred-types/runtime";
import { LexerState } from "inferred-types/types";
import { createLexer, isLexerState } from "runtime/runtime-types/createLexer";


function hasUnionToken<T extends LexerState>(state: T) {
    return false; // TODO
}

function hasIntersectionToken<T extends LexerState>(state: T) {
    return false; // TODO
}



export function inputTokenParser<TToken extends string>(token: TToken) {

    const lexer = createLexer(
        takeAtomicToken,
    );

    const result = lexer(token);

    if(isLexerState(result)) {
        if (result.remaining.trim() === "") {
            if(hasUnionToken(result)) {

            } else if (hasIntersectionToken(result)) {

            }

            return result;
        } else {
            if (result.tokens.length > 0) {
                err(
                    "parse/leftover",
                    `There were ${result.tokens.length} tokens which were resolved but then the remaining string -- '${result.remaining}' -- could not be parsed!`

                )
            }

        }
    }

    return result;
}
