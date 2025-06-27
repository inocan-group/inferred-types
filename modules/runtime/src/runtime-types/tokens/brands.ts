import type { FixedLengthArray, IsLiteral, Join } from "inferred-types/types";

/**
 * A token representation of a **Parameter** definition inside
 * of a function token definition.
 */
export type FnParam = string & {
    __brand: `parameter for function`;
};

export type FnParams<T> = T extends readonly unknown[]
    ? IsLiteral<T["length"]> extends true
        ? Join<FixedLengthArray<FnParam, T["length"]>, ", ">
        : string
    : never;

/**
 * A token representation of a **Parameter** definition inside
 * of a function token definition.
 */
export type GenParam = string & {
    __brand: `parameter for generator function`;
};

export type GenParams<T> = T extends readonly unknown[]
    ? IsLiteral<T["length"]> extends true
        ? Join<FixedLengthArray<GenParam, T["length"]>, ", ">
        : string
    : never;

export type Rtn = string & {
    __brand: `return type for a function`;
};
