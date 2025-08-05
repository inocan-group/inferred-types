import {
    Container,
    Err,
    IsAny,
    IsDictionary,
    IsNever,
    IsWideArray,
    IsWideObject,
    Values
} from "inferred-types/types";

type TestArray<T extends readonly unknown[]> =
    T extends readonly []
        ? false
    : T extends readonly [infer First, ...infer Rest]
        ? [IsNever<First>] extends [true]
            ? true
            : Rest extends readonly unknown[]
                ? TestArray<Rest>
                : false
        : false;  // This handles wide arrays that don't match tuple patterns

type Validate<T> = [IsAny<T>] extends [true]
? Err<
    `invalid/has-never`,
    `The type passed into 'HasNever<T>' was 'any'! This utility requires that T be a container type.`
    >
: [IsNever<T>] extends [true]
    ? Err<
        `invalid/has-never`,
        `The type passed into 'HasNever<T>' was 'never'! This utility requires that T be a container type.`
    >
: T;

/**
 * **HasNever**`<T>`
 *
 * Test whether the container `T` has any _values_ which are the `never` type.
 *
 * - if `T` is a wide type then this utility will always return `boolean`
 */
export type HasNever<T extends Container> = [[]] extends [T]
    ? false
: [Validate<T>] extends [Error]
    ? Validate<T>
: [IsWideArray<T>] extends [true]
    ? boolean
: [T] extends [readonly any[]]
    ? [IsWideArray<T>] extends [true]
        ? boolean
        : TestArray<T>
    : IsDictionary<T> extends true
        ? IsWideObject<T> extends true
            ? boolean
            : TestArray<Values<T>>
    : false;


