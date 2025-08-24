import type { And, AsNumber, Err, Get, GetTypeOf, IsLiteral, IsLiteralLike, IsWideType } from "inferred-types/types";
import type { TypedFunction } from "types/base-types";

export type EachOperation = "returnType" | "get" | "isLiteral" | "isLiteralLike" | "isWide" | "append" | "prepend";

type FirstParam<T extends EachOperation> = T extends "returnType"
    ? null
    : T extends "get"
        ? string | null
        : T extends "offset"
            ? PropertyKey | null
            : T extends "isLiteral"
                ? null
                : T extends "isWide"
                    ? null
                    : T extends "append"
                        ? string | number
                        : T extends "prepend"
                            ? string | number
                            : null;

// type SecondParam<T extends EachOperation> = T extends "returnType"
//     ? null
// : T extends "get"
//     ? null
// : T extends "offset"
//     ? "greaterThan" | "lessThan" | "startsWith" | "endsWith"
// : null;

// type ThirdParam<T extends EachOperation> = T extends "returnType"
//     ? null
// : T extends "get"
//     ? null
// : T extends "offset"
//     ? "greaterThan" | "lessThan" | "startsWith" | "endsWith"
// : null;

/**
 * **Each**`<T, TOp, [TParam]>`
 *
 * Iterates over a tuple `T` and performs one of the following operations:
 *
 * - `get` - combined with a parameter -- which can be a _dot-path_ -- this
 * operation will retrieve nested properties in each element
 * - `returnType` - expects elements to functions and converts these functions into
 * their appropriate return type.
 * - `isLiteral` - returns `true` if all elements are literal values
 * - `isWide` - returns `true` if all elements are wide values
 */
export type Each<
    T extends readonly unknown[],
    TOp extends EachOperation,
    TParam extends FirstParam<TOp> | null = null,
    // TSecond extends SecondParam<TOp> | null = null,
    // TThird extends ThirdParam<TOp> | null = null
> = TOp extends "isLiteral"
    ? And<{
        [K in keyof T]: IsLiteral<T[K]>
    }>

    : TOp extends "isLiteralLike"
        ? And<{
            [K in keyof T]: IsLiteralLike<T[K]>
        }>
        : TOp extends "isWide"
            ? And<{
                [K in keyof T]: IsWideType<T[K]>
            }>
            : {
                [K in keyof T]: TOp extends "returnType"
                    ? T[K] extends TypedFunction
                        ? ReturnType<T[K]>
                        : Err<
                            `not-function/return-type`,
                    `The Each operation 'returnType' expected to see a functions in T but item was '${GetTypeOf<T[K]>}' instead!`,
                    { element: T[K] }
                        >
                    : TOp extends "get"
                        ? TParam extends string
                            ? Get<T[K], TParam>
                            : Err<
                                `no-index/get`,
                                `The Each operation 'get' requires that a parameter representing a 'DotPath' be present but no such parameter was found!`,
                                { element: T[K]; param: TParam }
                            >
                        : TOp extends "append"
                            ? TParam extends string | number
                                ? T[K] extends string
                                    ? `${T[K]}${TParam}`
                                    : T[K] extends number
                                        ? `${T[K]}${TParam}` extends `${number}`
                                            ? AsNumber<`${T[K]}${TParam}`>
                                            : `${T[K]}${TParam}`
                                        : T[K]
                                : Err<`invalid-param/append`, `The parameter for 'append' must be a string (or number)!`, { param: TParam }>

                            : TOp extends "prepend"
                                ? TParam extends string | number
                                    ? T[K] extends string
                                        ? `${TParam}${T[K]}`
                                        : T[K] extends number
                                            ? `${TParam}${T[K]}` extends `${number}`
                                                ? AsNumber<`${TParam}${T[K]}`>
                                                : `${TParam}${T[K]}`
                                            : T[K]
                                    : Err<`invalid-param/prepend`, `The parameter for 'prepend' must be a string (or number)!`, { param: TParam }>

                                : never

            };
