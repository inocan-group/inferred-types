import type {
    As,
    AsLiteralTemplate,
    AsStaticTemplate,
    Contains,
    Err,
    IsNever,
    IT_TakeOutcome,
    IT_Token,
    Join,
    NestedSplit,
    QuoteCharacter,
    RetainAfter,
    RetainUntil,
    Trim
} from "inferred-types/types";

type X = NestedSplit<"'foo", "'">;
type X2 = NestedSplit<"''", "'">;

type EmptyString<T extends string> = T extends `''${infer Rest}`
? {
    __kind: "IT_Token";
    kind: "literal";
    token: T;
    type: `""`;
    rest: Rest;
}
: T extends `""${infer Rest}`
? {
    __kind: "IT_Token";
    kind: "literal";
    token: T;
    type: `""`;
    rest: Rest;
}
: T extends `\`\`${infer Rest}`
? {
    __kind: "IT_Token";
    kind: "literal";
    token: T;
    type: `""`;
    rest: Rest;
}
: Err<"wrong-handler/empty-string">;
;

type Quoted<T extends string> = T extends `${infer Head}${infer Rest}`
    ? Head extends infer Quote extends QuoteCharacter
        ? Contains<Rest, Quote> extends true
            ? NestedSplit<Rest, Quote> extends [
                infer Block extends string,
                ...infer Rest extends string[]
            ]
                ? Block extends ""
                    ? Err<"malformed-token/string-literal">
                : {
                        __kind: "IT_Token";
                        kind: "literal";
                        token: `${Quote}${Block}${Quote}`;
                        type: AsLiteralTemplate<Block>;
                        rest: Trim<Join<Rest, Quote>>;
                }
            : Err<
                `malformed-token/string-literal`,
                `While parsing a string literal starting with quote character ${Quote}; there was no terminating quote character of the same type!`,
                { token: T }
            >
        : Err<
            "malformed-token/string-literal",
            `While parsing a string literal starting with quote character ${Quote}; there was no terminating quote character of the same type!`,
            { token: T }
        >
    : Err<`wrong-handler/quoted`, `The parse string did not start with a quote character`>
: Err<`wrong-handler/quoted`, `The parse string only had a single character`>;


/**
 * matches on string literals defined like `String(foo)`
 */
// eslint-disable-next-line unused-imports/no-unused-vars, ts/no-unused-vars
type StringConstructor<T extends string> = T extends `String(${infer Rest}`
    ? Contains<Rest, ")"> extends true
        ? NestedSplit<Rest,")"> extends [
            infer Block extends string,
            ...infer Rest extends string[]
        ]
            ? {
                __kind: "IT_Token";
                kind: "literal";
                token: `String(${Block})`;
                type: AsLiteralTemplate<Block>;
                rest: Trim<Join<Rest, ")">>;
            }
            : never
    : Err<
        "malformed-token/string-literal",
        `While parsing a string literal using the String(literal) syntax; there was no terminating ')' character!`,
        { token: T }
    >

    : Err<
        "wrong-handler/string-literal",
        `The token didn't match that a of a string literal using the constructor syntax (e.g., 'String(literal)')`,
        { token: T }
    >;


/**
 * **IT_TakeStringLiteral**`<T>`
 *
 * Attempts to parse a string literal from the _head_ of the parse string.
 */
export type IT_TakeStringLiteral<T extends string> = EmptyString<T> extends IT_Token<"literal">
? EmptyString<T>
: StringConstructor<T> extends IT_Token<"literal">
? StringConstructor<T>
: Quoted<T> extends IT_Token<"literal">
? Quoted<T>
: StringConstructor<T> extends Err<"malformed-token">
    ? StringConstructor<T>
: Quoted<T> extends Err<"malformed-token">
    ? Quoted<T>
: IsNever<StringConstructor<T>> extends true
    ? Err<`malformed-token`>
: IsNever<Quoted<T>> extends true
    ? Err<`malformed-token`>
: Err<
    "wrong-handler/string-literal",
    `The IT_TakeString<T> handler is unable to parse the head of: '${T}'`,
    { token: T }
>
