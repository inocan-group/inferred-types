import type { If, IsUnion, ToNumber, TupleToUnion, UnionToTuple } from "inferred-types/types";

type Convert<T> = T extends `${number}`
    ? ToNumber<T>
    : T;

type ConvertTuple<T> = T extends unknown[]
    ? {
        [K in keyof T]: Convert<T[K]>
    }
    : never;

type ConvertUnion<T> = If<
    IsUnion<T>,
    TupleToUnion<ConvertTuple<UnionToTuple<T>>>,
    never
>;

/**
 * **AsNumberWhenPossible**`<T>`
 *
 * Takes any value `T` and either returns `T` as an _identity value_ or where
 * it finds a string literal which can be converted to a number it will convert
 * it to that number value.
 *
 * - if an array of values is passed in then the values are iterated over and
 * the same process is applied to each.
 * - if the type of `T` is a _union type_ then any numeric string literal in the
 * literal values will be converted to a numeric literal but the return type will
 * still be a _union_.
 */
export type AsNumberWhenPossible<T> = If<
    IsUnion<T>,
    ConvertUnion<T>,
    T extends readonly unknown[]
        ? ConvertTuple<T>
        : Convert<T>
>;
