import {
    AfterFirst,
    Container,
    Err,
    First,
    IsAny,
    IsDictionary,
    IsNever,
    IsWideArray,
    IsWideObject,
    Values
} from "inferred-types/types";

type Test<
    T extends readonly unknown[]
> = [] extends T
? false
: [IsNever<First<T>>] extends [true]
    ? true
    : Test<
        AfterFirst<T>
    >;

type Validate<T> = [IsAny<T>] extends [true]
? Err<`invalid/has-never`, `The type passed into 'HasNever<T>' was 'any'! This utility requires that T be a container type.`>
: [IsNever<T>] extends [true]
? Err<`invalid/has-never`, `The type passed into 'HasNever<T>' was 'never'! This utility requires that T be a container type.`>
: T;

/**
 * **HasNever**`<T>`
 *
 * Test whether the container `T` has any values which are the `any` type.
 *
 * - if `T` is a wide type then this utility will always return `boolean`
 */
export type HasNever<T extends Container> = Validate<T> extends Error
? Validate<T>
: T extends readonly any[]
? IsWideArray<T> extends true
    ? boolean
    : Test<T>
: IsDictionary<T> extends true
    ? IsWideObject<T> extends true
        ? boolean
        : Test<Values<T>>
: false;
