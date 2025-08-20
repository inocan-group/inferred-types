import type { LexerState } from "inferred-types/types";
import {
    err,
} from "inferred-types/runtime";

import {
    createLexer,
    isLexerState
} from "runtime/runtime-types/createLexer";
import { takeAtomicToken } from "runtime/take/input-tokens/takeAtomicToken";

function hasUnionToken<T extends LexerState>(_state: T) {
    return false; // TODO
}

function hasIntersectionToken<T extends LexerState>(_state: T) {
    return false; // TODO
}

export function inputTokenParser<TToken extends string>(token: TToken) {
    const lexer = createLexer(
        takeAtomicToken as any
    );

    const result = lexer(token);

    if (isLexerState(result)) {
        if (result.parse.trim() === "") {
            if (hasUnionToken(result)) {
                // TODO
            }
            else if (hasIntersectionToken(result)) {
                // TODO
            }

            return result;
        }
        else {
            if (result.tokens.length > 0) {
                err(
                    "parse/leftover",
                    `There were ${result.tokens.length} tokens which were resolved but then the remaining string -- '${result.parse}' -- could not be parsed!`

                );
            }
        }
    }

    return result;
}
