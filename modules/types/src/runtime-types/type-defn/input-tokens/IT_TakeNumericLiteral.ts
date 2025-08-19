import type {
    As,
    Err,
    ErrType,
    IsInputTokenSuccess,
    IT_TakeOutcome,
    IT_Token,
    NumericChar,
    RetainWhile,
    StartsWith,
    StripWhile,
    Trim
} from "inferred-types/types";

type Bare<T extends string> = StartsWith<T, NumericChar> extends true
    ? [RetainWhile<T, NumericChar>, StripWhile<T, NumericChar>] extends [
        `${infer Num extends number}`,
        infer Rest extends string
    ]
        ? {
            __kind: "IT_Token";
            kind: "literal";
            token: `${Num}`;
            type: Num;
            rest: Trim<Rest>;
        }
        : Err<
            `wrong-handler`
        >
    : Err<
        `wrong-handler/numeric-literal`,
        `A bare number representing a numeric literal requires that the string passed in starts with a numeric literal.`,
        { token: T }
    >;

type NumberConstructor<T extends string>
    = T extends `Number(${infer Num extends number})${infer Rest extends string}`
        ? {
            __kind: "IT_Token";
            kind: "literal";
            token: `${Num}`;
            type: Num;
            rest: Trim<Rest>;
        }

        : Err<"wrong-handler/numeric-literal">;

export type IT_TakeNumericLiteral<T extends string> = As<
    IsInputTokenSuccess<Bare<T>> extends true
        ? Bare<T> extends infer Success extends IT_Token<"literal">
            ? Success
            : never
        : ErrType<Bare<T>> extends "malformed-token"
            ? Bare<T>
            : NumberConstructor<T>,

    IT_TakeOutcome<"literal">
>;
