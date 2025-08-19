import type {
    As,
    Err,
    ErrType,
    IsInputTokenSuccess,
    IT_TakeOutcome,
    IT_Token,
    QuoteCharacter,
    RetainAfter,
    RetainUntil,
    Trim
} from "inferred-types/types";

type Quoted<T extends string> = T extends `${infer Quote extends QuoteCharacter}${infer Rest extends string}`
    ? [
        RetainUntil<Rest, Quote>,
        RetainAfter<Rest, Quote>
    ] extends [
        infer Literal extends string,
        infer Rest extends string
    ]
        ? {
            __kind: "IT_Token";
            kind: "literal";
            token: Literal;
            type: Literal;
            rest: Trim<Rest>;
        }
        : Err<
            `malformed-token/string-literal`,
        `Found a quote character [${Quote}] at the head of the token '${Trim<T>}' indicating that this would be a string literal but no terminating quote character.`,
        { token: T; quote: Quote; rest: Rest }
        >
    : Err<"wrong-handler/string-literal", `The quoted variant of a string literal was not found at the head of the token string`>
;

/**
 * matches on string literals defined like `String(foo)`
 */
type StringConstructor<T extends string> = T extends `String(${infer Rest}`
    ? [
        RetainUntil<Rest, ")">,
        RetainAfter<Rest, ")">
    ] extends [
        infer Literal extends string,
        infer Rest extends string
    ]

        ? {
            __kind: "IT_Token";
            kind: "literal";
            token: `${Literal}`;
            type: Literal;
            rest: Trim<Rest>;
        }
        : Err<
            "malformed-token/string-literal",
            `The string constructor based literal token was started but no terminating ')' character was found!`,
            { token: T }
        >
    : Err<
        "wrong-handler/string-literal",
        `The token didn't match that a of a string literal using the constructor syntax (e.g., 'String(literal)')`,
        { token: T }
    >;

export type IT_TakeStringLiteral<T extends string> = As<
    IsInputTokenSuccess<Quoted<T>> extends true
        ? Quoted<T> extends infer Success extends IT_Token<"literal">
            ? Success
            : never
        : ErrType<Quoted<T>> extends "malformed-token"
            ? Quoted<T>
            : StringConstructor<T>,

    IT_TakeOutcome<"literal">
>;
