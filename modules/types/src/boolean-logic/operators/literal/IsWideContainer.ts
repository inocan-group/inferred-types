import { Container, Dictionary,IsWideArray,IsWideObject } from "inferred-types/types";


/**
 * **IsWideContainer**`<T>`
 *
 * Boolean operator which checks if `T` is a **wide** variant of a `Container` type.
 */
export type IsWideContainer<T> = T extends Container
? T extends readonly unknown[]
    ? IsWideArray<T>
: T extends Dictionary
    ? IsWideObject<T>
    : false
: false;
