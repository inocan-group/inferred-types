import type {
    Dictionary,
    IsNumericLiteral,
    Keys,
    ObjectKey,
    RequiredKeysTuple,
} from "inferred-types/types";

/**
 * **HasRequiredProps**`<T>`
 *
 * Receives `T` and returns true/false based on whether
 * the `T` is an object _and_ has at least one required property on it.
 */
export type HasRequiredProps<
    T extends Dictionary,
> = [Keys<T>] extends [never]
        ? boolean

        : [IsNumericLiteral<Keys<T>["length"]>] extends [true]
            ? [RequiredKeysTuple<T>] extends [readonly ObjectKey[]]
                ? [RequiredKeysTuple<T>["length"]] extends [0]
                    ? false
                    : true
                : boolean
            : never;
