import type { And, IsLiteralLike, IsUnion, UnionToTuple } from "inferred-types/types";


// Check if all elements in a tuple are literal types
type AllElementsAreLiteral<T extends readonly unknown[]> = And<{
    [K in keyof T]: IsLiteralLike<T[K]>
}>;

export type IsLiteralUnion<T> = IsUnion<T> extends true
    ? [T] extends [boolean]
        ? true // boolean union (true | false) is literal-like
        : AllElementsAreLiteral<UnionToTuple<T>>
    : false;
