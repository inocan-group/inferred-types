import {
    AfterFirst,
    Container,
    Dictionary,
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
: [IsAny<First<T>>] extends [true]
    ? true
    : Test<
        AfterFirst<T>
    >;

// type Validate<T extends Container> = [IsAny<T>] extends [true]
// ? Err<
//     `invalid/has-any`,
//     `The type passed into 'HasAny<T>' was 'any'! This utility requires that T be a container type.`
// >
// : [IsNever<T>] extends [true]
// ? Err<`invalid/has-any`, `The type passed into 'HasAny<T>' was 'never'! This utility requires that T be a container type.`>
// : T;

/**
 * **HasAny**`<T>`
 *
 * Test whether the container `T` has any values which are the `any` type.
 *
 * - if `T` is a wide type then this utility will always return `boolean`
 */
export type HasAny<
    T extends Container
> = [IsAny<T>] extends [true]
? Err<
    `invalid/has-any`,
    `The type passed into 'HasAny<T>' was 'any'! This utility requires that T be a container type.`
>
: [IsNever<T>] extends [true]
? Err<`invalid/has-any`, `The type passed into 'HasAny<T>' was 'never'! This utility requires that T be a container type.`>
: T extends readonly any[]
? IsWideArray<T> extends true
    ? boolean
    : Test<T>
: IsDictionary<T> extends true
    ? IsWideObject<T> extends true
        ? boolean
        : Test<Values<T>>
: false;

type X = IsWideArray<
