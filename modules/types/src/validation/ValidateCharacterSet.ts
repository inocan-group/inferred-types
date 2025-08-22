import type { Chars, Err, Length, StripChars, Unique } from "inferred-types/types";
import type { IsEqual } from "types/boolean-logic";

type Test<
    T extends string,
    U extends string
> = T extends `${infer Head extends string}${infer Rest}`
    ? Head extends U
        ? Test<Rest, U>
        : false
    : true;

/**
 * **ValidateCharacterSet**`<TContent, TCharset, [E]>`
 *
 * Validates that `TContent` only has the characters found in `TCharset`:
 *
 * - if valid, `TContent` is proxied through "as is"
 * - if invalid, `E` is returned (which defaults to an error type of
 * "invalid-character"
 */
export type ValidateCharacterSet<
    TContent extends string,
    TCharset extends string | readonly string[],
    E = Err<"invalid-character">
> = string extends TContent
    ? TContent | E
    : string extends TCharset
        ? boolean
        : IsEqual<TCharset, string[]> extends true
            ? boolean
            : Test<
                TContent,
                TCharset extends readonly string[]
                    ? TCharset[number]
                    : TCharset extends string
                        ? TCharset
                        : never
            > extends true
                ? TContent
                : E extends Err<"invalid-character">
                    ? StripChars<TContent, TCharset extends readonly string[] ? TCharset[number] : TCharset> extends infer InvalidChars extends string
                        ? Err<
                            "invalid-character",
            `The content passed into ValidateCharacterSet<TContent,TCharset,E> had ${Length<InvalidChars>} character(s) which did not fit into the target character set!`,
            { invalid: Unique<Chars<InvalidChars>>; content: TContent }
                        >
                        : never
                    : E;
