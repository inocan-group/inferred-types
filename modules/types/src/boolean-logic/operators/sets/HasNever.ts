import type {
    Container,
    Err,
    IsAny,
    IsDictionary,
    IsNever,
    IsWideArray,
    IsWideObject,
    Values
} from "inferred-types/types";

type TestArray<T>
    = T extends readonly []
        ? false
        : T extends readonly [infer First, ...infer Rest]
            ? [IsNever<First>] extends [true]
                ? true
                : Rest extends readonly unknown[]
                    ? TestArray<Rest>
                    : false
            : false; // This handles wide arrays that don't match tuple patterns

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
export type HasNever<T extends Container> = [Validate<T>] extends [Error]
    ? Validate<T>
    : [IsWideArray<T>] extends [true]
        ? boolean
        : [T] extends [readonly any[]]
            ? [IsWideArray<T>] extends [true]
                ? boolean
                : TestArray<T>
            : [IsWideObject<T>] extends [true]
                ? boolean
                : IsDictionary<T> extends true
                    ? TestArray<Values<T>>
                    : false;
