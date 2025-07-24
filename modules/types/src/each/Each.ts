import { Err, Get, GetTypeOf } from "inferred-types/types";
import { TypedFunction } from "types/base-types";

export type EachOperation = "returnType" | "get";

export type Each<
    T extends readonly unknown[],
    TOp extends EachOperation,
    TParam = null
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
                { element: T[K], param: TParam }
            >
    : never
}
