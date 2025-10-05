import type {
    Container,
    Dictionary,
    EmptyObject,
    GetRequiredElementCount,
    IsEqual,
    IsWideContainer,
    RequiredKeysTuple
} from "inferred-types/types";

/**
 * **HasRequiredElements**`<T>`
 *
 * Boolean operator which detects whether the container `T` has any
 * elements/keys which are considered "required".
 */
export type HasRequiredElements<T extends Container> = IsEqual<T, EmptyObject> extends true
    ? false
    : IsWideContainer<T> extends true
        ? boolean
        : T extends readonly unknown[]
            ? GetRequiredElementCount<T> extends 0
                ? false
                : true
            : T extends Dictionary
                ? RequiredKeysTuple<T>["length"] extends 0
                    ? false
                    : true
                : never;
