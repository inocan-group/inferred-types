import type {
    Container,
    Err,
    IsAny,
    IsNever,
    IsTrue,
    Values
} from "inferred-types/types";

type Test<
    T extends readonly unknown[]
> = T extends [infer Head, ...infer Rest]
    ? IsTrue<Head> extends true
        ? true
        : Test<Rest>
    : false;

type Validate<T extends Container> = [IsAny<T>] extends [true]
    ? Err<`invalid/has-true`, `The type passed into 'HasTrue<T>' was 'any'! This utility requires that T be a container type.`>
    : [IsNever<T>] extends [true]
        ? Err<`invalid/has-true`, `The type passed into 'HasTrue<T>' was 'never'! This utility requires that T be a container type.`>
        : T extends Container
            ? T
            : Err<`invalid/has-true`, `The type passed into HasTrue<T> was not a container!`, { value: T }>;

/**
 * **HasTrue**`<T>`
 *
 * Test whether the container `T` has any _value types_ which are equal to `true`.
 *
 * - if `T` is a wide type then this utility will always return `boolean`
 */
export type HasTrue<T extends Container> = [Validate<T>] extends [Error]
    ? Validate<T> // return error
    : [Values<T>] extends [readonly unknown[]]
        ? [number] extends [Values<T>["length"]]
            ? boolean
            : Test<Values<T>>
        : never;
