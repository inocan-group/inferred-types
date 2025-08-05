import {
    Container,
    Err,
    IsAny,
    IsDictionary,
    IsNever,
    IsWideBoolean,
    Keys,
    Values
} from "inferred-types/types";

type Test<
    T
> = T extends readonly [infer Head, ...infer Rest]
? IsWideBoolean<Head> extends true
    ? true
    : Test<Rest>
:  false;

type Validate<T> = [IsAny<T>] extends [true]
? Err<`invalid/has-wide-boolean`, `The type passed into 'HasWideBoolean<T>' was 'any'! This utility requires that T be a container type.`>
: [IsNever<T>] extends [true]
? Err<`invalid/has-wide-boolean`, `The type passed into 'HasWideBoolean<T>' was 'never'! This utility requires that T be a container type.`>
: T;

/**
 * **HasNever**`<T>`
 *
 * Test whether the container `T` has any _values_ which are the wide `boolean` type.
 *
 * - if `T` is a wide type then this utility will always return `boolean`
 */
export type HasWideBoolean<T extends Container> = [Validate<T>] extends [Error]
? Validate<T>
: [T] extends [readonly any[]]
    ? [number] extends [Keys<T>["length"]]
        ? boolean
        : Test<T>
: [IsDictionary<T>] extends [true]
    ? [number] extends [Keys<T>["length"]]
        ? boolean
        : Test<Values<T>>
: false;
