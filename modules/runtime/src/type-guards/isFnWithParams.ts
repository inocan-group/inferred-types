import type {
    AsNarrowingFn,
    IsLiteral,
    SimpleToken,
    SimpleType,
    Tuple,
    TypedFunction,
} from "inferred-types/types";

/**
 * **isFnWithParams**(input, [...params | count])
 *
 * Type guard which checks whether a give variable is a function
 * which contains at least one parameter.
 *
 * - the optional second parameter may be used to express the **types** of
 * the expected parameters or just the expected **count** of parameters
 * - if you set the parameter types, it will check that the
 * correct amount of parameters are set but can only _assume_ the types of
 * the parameters are as you have expressed
 */
export function isFnWithParams<T, P extends (readonly SimpleToken[]) | [number]>(
    input: T,
    ...params: P
): input is T & AsNarrowingFn<
    "length" extends keyof T
        ? T["length"] extends 0
            ? IsLiteral<P["length"]> extends true
                ? Tuple<any, P["length"]>
                : [any, ...any[]]
            : [any, ...any[]]
        : P extends readonly SimpleToken[]
            ? {
                [K in keyof P]: SimpleType<P[K]>
            }
            : P extends [number]
                ? Tuple<any, P[0]>
                : never,
    T extends TypedFunction ? ReturnType<T> : unknown
> {
    return params.length === 0
        ? typeof input === "function" && input?.length > 0
        : typeof input === "function" && input?.length === params.length;
}
