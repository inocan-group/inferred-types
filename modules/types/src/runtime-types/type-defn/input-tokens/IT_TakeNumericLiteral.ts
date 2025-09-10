import type {
    As,
    AsNumber,
    Contains,
    Err,
    IT_TakeOutcome,
    IT_Token,
    NumericChar,
    RetainUntil,
    StartsWith,
    StripLeading,
    Trim,
    Whitespace
} from "inferred-types/types";

type Break = Whitespace | "|" | "&";

type TakeNumber<
    T extends string,
    R extends string = ''
> = T extends `${infer Head}${infer Rest}`
    ? Head extends Break
        ? R
    : TakeNumber<Rest, `${R}${Head}`>
: R;



type Bare<T extends string> = StartsWith<T, NumericChar|"-"> extends true
    ? TakeNumber<T> extends `${number}`
        ? {
            __kind: "IT_Token";
            kind: "literal";
            token: `${TakeNumber<T>}`;
            type: AsNumber<TakeNumber<T>>;
            rest: Trim<StripLeading<T, TakeNumber<T>>>;
        }
        : Err<
            `malformed-token/numeric-literal`,
            `A bare number was detected but the resultant token of '${TakeNumber<T>}' can not be converted to a number!`,
            { parse: T; token: TakeNumber<T> }
        >
    : Err<
        `wrong-handler/numeric-literal`,
        `A bare number representing a numeric literal requires that the string passed in starts with a numeric literal.`,
        { token: T }
    >;


type NumberConstructor<T extends string> =
T extends `Number(${infer Num extends number})${infer Rest extends string}`
        ? {
            __kind: "IT_Token";
            kind: "literal";
            token: `${Num}`;
            type: Num;
            rest: Trim<Rest>;
        }
: T extends `Number(${infer Rest extends string}`
    ? Contains<Rest, ")"> extends true
        ? Err<
            `malformed-token/numeric-literal`,
            `A numeric literal with the 'Number(defn)' syntax provided an invalid numeric value of '${RetainUntil<Rest,")">}'!`,
            { token: T }
        >
        : Err<
            `malformed-token/numeric-literal`,
            `A numeric literal definition was detected by the 'Numeric(' but no terminating ')' character found!`,
            { token: T }
        >
: Err<"wrong-handler/numeric-literal">;


/**
 * **IT_TakeNumericLiteral**`<T>`
 *
 * Attempts to parse a numeric literal from the head of the parse string.
 */
export type IT_TakeNumericLiteral<T extends string> = As<
    Bare<T> extends IT_Token<"literal">
        ? Bare<T>
    : NumberConstructor<T> extends IT_Token<"literal">
        ? NumberConstructor<T>
    : Bare<T> extends Err<"malformed-token">
        ? Bare<T>
    : NumberConstructor<T> extends Err<"malformed-token">
        ? NumberConstructor<T>
    : Err<"wrong-handler/numeric-literal">
    ,
    IT_TakeOutcome<"literal">
>;

