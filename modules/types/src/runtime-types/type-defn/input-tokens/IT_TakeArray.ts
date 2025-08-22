import type { Err, ErrType, GetInputToken, Join, NestedSplit, Trim } from "inferred-types/types";
import type { IT_Token } from "types/runtime-types/type-defn/input-tokens/IT_Base";

/**
 * matches on tokens like `string[]`, `number[]`, etc.
 */
type IT_TakeArray_Postfix<T extends string>
= T extends `${infer Block extends string}[][]${infer Rest extends string}`
    ? ErrType<GetInputToken<Block>> extends "malformed-token"
        ? Err<
            `malformed-token/array`,
            `the token has the shape of a two-dimensional array of '${Block}' but the type of array could not be parsed into a type!`,
            { token: T; block: Block; rest: Rest }
        >
        : GetInputToken<Block> extends infer Token extends IT_Token
            ? {
                __kind: "IT_Token";
                kind: "array";
                token: `${Token["token"]}[][]`;
                type: (Token["type"])[][];
                rest: Rest;
            }
            : never

    : T extends `${infer Block extends string}[]${infer Rest extends string}`
        ? ErrType<GetInputToken<Block>> extends "malformed-token"
            ? Err<
                `malformed-token/array`,
            `the token has the shape of an array of type '${Block}' but the type of array could not be parsed into a type!`,
            { token: T; block: Block; rest: Rest }
            >
            : GetInputToken<Block> extends infer Token extends IT_Token
                ? {
                    __kind: "IT_Token";
                    kind: "array";
                    token: `${Token["token"]}[]`;
                    type: (Token["type"])[];
                    rest: Rest;
                }
                : Err<"wrong-handler/array">
        : Err<"wrong-handler/array">;

/**
 * matches on tokens like `(string)[]`, `(string | number)[]`, etc.
 */
type IT_TakeArray_Postfix_Grouped<T extends string>
= T extends `(${infer Rest}`
    ? NestedSplit<Rest, ")[][]"> extends [
        infer Block extends string,
        ...infer Rest extends [string, ...string[]]
    ]
        ? GetInputToken<Trim<Block>> extends infer Token extends IT_Token
            ? {
                __kind: "IT_Token";
                kind: "array";
                token: `(${Token["token"]})[][]`;
                type: (Token["type"])[][];
                rest: Trim<Join<Rest, ")[][]">>;
            }
            : Err<
                "malformed-token/array",
                `The token '${T}' appeared to be a grouped two-dimensional array but the interior block '${Block}' could not be parsed as a valid type!`,
                { token: T; block: Block; rest: Rest }
            >

        : NestedSplit<Rest, ")[]"> extends [
            infer Block extends string,
            ...infer Rest extends readonly [string, ...string[]]
        ]
            ? GetInputToken<Block> extends infer Token extends IT_Token
                ? {
                    __kind: "IT_Token";
                    kind: "array";
                    token: `(${Token["token"]})[]`;
                    type: (Token["type"])[];
                    rest: Trim<Join<Rest, ")[]">>;
                }
                : Err<
                    "malformed-token/array",
                `The token '${T}' appeared to be a grouped array but the interior block '${Block}' could not be parsed as a valid type!`,
                { token: T; block: Block; rest: Rest }
                >
            : Err<
                "wrong-handler/array",
                `The grouped function matcher could not parse the string token.`,
                { token: T; rest: Rest }
            >
    : Err<"wrong-handler/array">;

/**
 * matches on tokens like `Array<string|number>`, etc.
 */
// eslint-disable-next-line unused-imports/no-unused-vars, ts/no-unused-vars
type IT_TakeArray_Bracket<T extends string> = T extends `Array<${infer Rest extends string}`
    ? NestedSplit<Rest, ">"> extends [
        infer Block extends string,
        infer Rest extends string
    ]
        ? GetInputToken<Block> extends infer Token extends IT_Token
            ? {
                __kind: "IT_Token";
                kind: "array";
                token: `Array<${Token["token"]}>`;
                type: Array<Token["type"]>;
                rest: Trim<Rest>;
            }
            : Err<
                "malformed-token/array",
                `The token '${T}' appeared to be a bracketed array (e.g., Array<...>) but the interior block '${Block}' could not be parsed as a valid type!`,
                { token: T; block: Block; rest: Rest }
            >
        : Err<
            "malformed-token/array",
        `The token '${T}' appears to be a bracketed array type (e.g., Array<...>) but the terminal '>' character was not found!`,
        { token: T; rest: T }
        >
    : Err<
        "wrong-handler/array",
        `The string token does not start with 'Array<' so the bracketed array take function is not the right handler for this token`,
        { token: T }
    >;

type Select<
    T extends readonly unknown[],
    TToken extends string
> = T extends [ infer Head, ...infer Rest extends readonly unknown[]]
    ? Head extends infer Success extends IT_Token<"array">
        ? Success
        : Head extends infer Fail extends Err<"malformed-token">
            ? Fail
            : Select<Rest, TToken>
    : Err<
        "wrong-handler",
    `The IT_TakeArray<T> handler is unable to parse the head of: '${TToken}'`,
    { token: TToken }
    >;

/**
 * **IT_TakeArray**`<T>`
 *
 * Tries to take wide array signatures off the head of the string token.
 *
 * - **PostFix**: `string[]`, `string[][]`, `number[]`, etc.
 * - **PostFix Grouped**: `(string | number)[]`, `(number | boolean)[][]`
 * - **Bracketed**: `Array<string>`, `Array<string | number>`
 */
export type IT_TakeArray<T extends string> = Select<[
    IT_TakeArray_Postfix_Grouped<T>,
    IT_TakeArray_Postfix<T>,
    IT_TakeArray_Bracket<T>
], T>;
