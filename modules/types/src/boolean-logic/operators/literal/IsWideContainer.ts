import type { Container, IsEqual, IsWideArray, IsWideObject, TypedFunction } from "inferred-types/types";

/**
 * **IsWideContainer**`<T>`
 *
 * Boolean operator which checks if `T` is a **wide** variant of a `Container` type.
 */
export type IsWideContainer<T> = IsEqual<T, object> extends true
    ? boolean

    : T extends Container
        ? T extends readonly unknown[]
            ? IsWideArray<T>
            : T extends object
                ? IsWideObject<T>
                : T extends TypedFunction
                    ? TypedFunction extends T
                        ? true
                        : Function extends T
                            ? true
                            : false
                    : false
        : false;
