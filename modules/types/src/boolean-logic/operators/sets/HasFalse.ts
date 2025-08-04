import {
    AfterFirst,
    Container,
    Err,
    IsAny,
    IsDictionary,
    IsFalse,
    IsNever,
    IsWideArray,
    IsWideObject,
    Values
} from "inferred-types/types";

type Test<
    T extends readonly unknown[]
> = [[]] extends [T]
? false
: [IsFalse<T>] extends [true]
    ? true
    : Test<
        AfterFirst<T>
    >;

type Validate<T> = [IsAny<T>] extends [true]
? Err<`invalid/has-wide-boolean`, `The type passed into 'HasWideBoolean<T>' was 'any'! This utility requires that T be a container type.`>
: [IsNever<T>] extends [true]
? Err<`invalid/has-wide-boolean`, `The type passed into 'HasWideBoolean<T>' was 'never'! This utility requires that T be a container type.`>
: T;

/**
 * **HasFalse**`<T>`
 *
 * Test whether the container `T` has any _elements_ which are equal to `false`.
 *
 * - if `T` is a wide type then this utility will always return `boolean`
 */
export type HasFalse<T extends Container> = [Validate<T>] extends [Error]
? Validate<T>
: [T] extends [readonly any[]]
? [IsWideArray<T>] extends [true]
    ? boolean
    : Test<T>
: [IsDictionary<T>] extends [true]
    ? [IsWideObject<T>] extends [true]
        ? boolean
        : Test<Values<T>>
: false;
