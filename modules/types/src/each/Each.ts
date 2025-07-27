import type { Compare, ComparisonAccept, ComparisonOperation, Err, Get, GetTypeOf } from "inferred-types/types";
import type { TypedFunction } from "types/base-types";

export type EachOperation = "returnType" | "get";

type FirstParam<T extends EachOperation> = T extends "returnType"
    ? null
: T extends "get"
    ? string | null
: T extends "offset"
    ? PropertyKey | null
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


export type Each<
    T extends readonly unknown[],
    TOp extends EachOperation,
    TParam extends FirstParam<TOp> | null = null,
    // TSecond extends SecondParam<TOp> | null = null,
    // TThird extends ThirdParam<TOp> | null = null
> = {
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
                    `no-index`,
                    `The Each operation 'get' requires that a parameter representing a 'DotPath' be present but no such parameter was found!`,
                    { element: T[K]; param: TParam }
                >

        : never
};
