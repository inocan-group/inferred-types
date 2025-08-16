import type { As, IsLiteralLike, IsTrue, IsUnion, UnionToTuple } from "inferred-types/types";

// Check if all elements in a tuple are literal types
type AllElementsAreLiteral<
    T extends readonly unknown[],
    B extends boolean = false
> = T extends [infer Head, ...infer Rest]
    ? [IsLiteralLike<Head>] extends [true]
        ? AllElementsAreLiteral<Rest, B>
        : [IsLiteralLike<Head>] extends [false]
            ? false
            : AllElementsAreLiteral<Rest, true>
    : IsTrue<B> extends true
        ? boolean
        : true;

/**
 * **IsLiteralUnion**`<T>`
 *
 * Boolean operator which returns true when `T`:
 *
 * - is a union type, AND
 * - all elements of the union are `LiteralLike`
 */
export type IsLiteralUnion<T> = As<
    [IsUnion<T>] extends [true]
        ? AllElementsAreLiteral<UnionToTuple<T>>
        : false,
    boolean
>;

// type Debug = 1 | 2 | 3 | 42;
// type Test = IsLiteralUnion<Debug>;
// type Any = IsLiteralLike<any>; // =>
// type Never = IsLiteralLike<never>; // =>
