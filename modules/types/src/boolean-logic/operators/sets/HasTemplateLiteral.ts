import type {
    Container,
    Err,
    IsAny,
    IsNever,
    IsTemplateLiteral,
    Values
} from "inferred-types/types";

type Test<
    T extends readonly unknown[]
> = T extends [infer Head, ...infer Rest]
    ? IsTemplateLiteral<Head> extends true
        ? true
        : Test<Rest>
    : false;

type Validate<T extends Container> = [IsAny<T>] extends [true]
    ? Err<`invalid/has-template-literal`, `The type passed into 'HasTemplateLiteral<T>' was 'any'! This utility requires that T be a container type.`>
    : [IsNever<T>] extends [true]
        ? Err<`invalid/has-template-literal`, `The type passed into 'HasTemplateLiteral<T>' was 'never'! This utility requires that T be a container type.`>
        : T extends Container
            ? T
            : Err<`invalid/has-template-literal`, `The type passed into HasTemplateLiteral<T> was not a container!`, { value: T }>;

/**
 * **HasTemplateLiteral**`<T>`
 *
 * Test whether the container `T` has any _values types_ which are equal template literals (
 * aka, have blocks like `${string}` or `${number}`).
 *
 * - if `T` is a wide type then this utility will always return `boolean`
 * - if `T` is an _optional_ type it is treated the same as if it were a required type
 */
export type HasTemplateLiteral<
    T extends Container,
    R extends Container = Required<T>
>
    = [Validate<T>] extends [Error]
        ? Validate<T> // return error
        : [Values<R>] extends [readonly unknown[]]
            ? [number] extends [Values<R>["length"]]
                ? boolean
                : Test<Values<R>>
            : never;
