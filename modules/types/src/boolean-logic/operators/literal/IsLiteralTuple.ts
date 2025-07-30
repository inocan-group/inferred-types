import { IsAny, IsNever, IsTuple } from "inferred-types/types";

// Forward declaration to avoid circular dependency
type IsLiteralScalar<T> = T extends string | number | bigint | boolean | symbol | null | undefined
    ? string | number | bigint | boolean | symbol extends T
        ? false
        : true
    : false;

type IsLiteralObject<T> = T extends object
    ? [IsAny<T>] extends [true]
        ? false
        : [IsNever<T>] extends [true]
        ? false
        : T extends readonly unknown[]
        ? false
        : T extends (...args: any[]) => any
        ? false
        : number extends keyof T
        ? false
        : true
    : false;

type IsLiteralValue<T> = [IsAny<T>] extends [true]
    ? false
    : [IsNever<T>] extends [true]
    ? false
    : T extends readonly unknown[]
    ? IsLiteralTuple<T>
    : T extends object
    ? IsLiteralObject<T>
    : IsLiteralScalar<T>;

/**
 * **IsLiteralTuple**`<T>`
 *
 * Boolean operator which tests whether `T` is a literal tuple where ALL elements are literal types.
 * A literal tuple must be literal in both shape (fixed-length array) and type (all elements are literals).
 */
export type IsLiteralTuple<T> = [IsAny<T>] extends [true]
    ? false
    : [IsNever<T>] extends [true]
    ? false
    : T extends readonly unknown[]
    ? [IsTuple<T>] extends [true]
        ? T extends readonly []
            ? true
            : T extends readonly [infer First, ...infer Rest]
            ? [IsLiteralValue<First>] extends [true]
                ? IsLiteralTuple<Rest>
                : false
            : false
        : false
    : false;