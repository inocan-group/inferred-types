import {
    Container,
    Dictionary,
    Err,
    IsAny,
    IsNever,
    IsWideContainer,
    IsWideObject,
    Values
} from "inferred-types/types";

// Test arrays for any values recursively
type TestArray<T extends readonly unknown[]> =
    // Check for wide arrays first
    T extends (infer U)[]
        ? any[] extends T  // Only wide if any[] extends it
            ? boolean
            : T extends readonly []
                ? false
                : T extends readonly [infer First, ...infer Rest]
                    ? IsAny<First> extends true
                        ? true
                        : Rest extends readonly unknown[]
                            ? TestArray<Rest>
                            : false
                    : false
        : T extends readonly []
            ? false
            : T extends readonly [infer First, ...infer Rest]
                ? IsAny<First> extends true
                    ? true
                    : Rest extends readonly unknown[]
                        ? TestArray<Rest>
                        : false
                : false;



type Validate<T extends Container> = IsAny<T> extends true
? Err<
    `invalid/has-any`,
    `The type passed into 'HasAny<T>' was 'any'! This utility requires that T be a container type.`
>
: IsNever<T> extends true
? Err<`invalid/has-any`, `The type passed into 'HasAny<T>' was 'never'! This utility requires that T be a container type.`>
: T;

/**
 * **HasAny**`<T>`
 *
 * Test whether the container `T` has any values which are the `any` type.
 *
 * - if `T` is a wide type then this utility will always return `boolean`
 */
export type HasAny<
    T extends Container
> = Validate<T> extends Error
? Validate<T>
: IsWideContainer<T> extends true
    ? boolean
: T extends readonly unknown[]
    ? TestArray<T>
    : T extends Dictionary
        ? IsWideObject<T> extends true
            ? boolean
            : Values<T> extends readonly unknown[]
                ? TestArray<Values<T>>
                : never
        : false;


