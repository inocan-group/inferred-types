import {
    Container,
    Err,
    IsAny,
    IsFalse,
    IsNever,
    IsWideArray,
    Or,
    Values
} from "inferred-types/types";

type Test<
    T
> = IsWideArray<T> extends true
? boolean
: T extends readonly unknown[]
? Or<{
    [K in keyof T]: IsFalse<T[K]>
}>
: false;


type Validate<T extends Container> = [IsAny<T>] extends [true]
    ? Err<`invalid/has-false`, `The type passed into 'HasFalse<T>' was 'any'! This utility requires that T be a container type.`>
: [IsNever<T>] extends [true]
    ? Err<`invalid/has-false`, `The type passed into 'HasFalse<T>' was 'never'! This utility requires that T be a container type.`>
: T extends Container
    ? T
    : Err<`invalid/has-false`, `The type passed into HasFalse<T> was not a container!`, { value: T }>;

/**
 * **HasFalse**`<T>`
 *
 * Test whether the container `T` has any _values_ which are equal to `false`.
 *
 * - if `T` is a wide type then this utility will always return `boolean`
 */
export type HasFalse<T extends Container> = Validate<T> extends Error
    ? Validate<T>
: Test<Values<T>>




