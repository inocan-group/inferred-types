import { IsUnion, UnionToTuple, And } from "inferred-types/types";

// Helper to check if a single type is literal
type IsLiteralType<T> = T extends string
    ? string extends T ? false : true
    : T extends number
    ? number extends T ? false : true
    : T extends bigint
    ? bigint extends T ? false : true
    : T extends boolean
    ? boolean extends T ? false : true
    : T extends symbol
    ? symbol extends T ? false : true
    : T extends null | undefined
    ? true
    : false;

// Check if all elements in a tuple are literal types
type AllElementsAreLiteral<T extends readonly unknown[]> = And<{
    [K in keyof T]: IsLiteralType<T[K]>
}>;

export type IsLiteralUnion<T> = IsUnion<T> extends true
    ? [T] extends [boolean]
        ? true  // boolean union (true | false) is literal-like
        : AllElementsAreLiteral<UnionToTuple<T>>
    : false;
