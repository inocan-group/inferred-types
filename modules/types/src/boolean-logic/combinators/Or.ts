import type {
    AfterFirst,
    As,
    Err,
    First,
    IsBoolean,
    IsFalse,
    IsNever,
    IsTrue,
    TypedFunction,
} from "inferred-types/types";

/**
 * **Or**`<TConditions, [TEmpty]>`
 *
 * Allows an array of conditions (either a boolean value or a
 * function which evaluates to a boolean value) to be logically OR'd together.
 *
 * - by default if an empty tuple of conditions is passed in then this utility
 * resolves to `false` but this can be changed by modifying `TEmpty`
 *
 * **Related:** `And`
 */
export type Or<
    T extends readonly unknown[]
> = [] extends T
    ? false
    : [IsNever<T>] extends [true]
        ? Err<
            `invalid/never`,
            `The Or<...> logical combinator was passed never as a value! Or is expecting a tuple of boolean values.`,
            { library: "inferred-types" }
        >
        : [IsBoolean<First<T>>] extends [true]
            ? [IsTrue<First<T>>] extends [true]
                ? true
                : [IsFalse<First<T>>] extends [true]
                    ? Or<AfterFirst<T>>
                    : boolean
            : [First<T> extends TypedFunction ? true : false] extends [true]
                ? [IsTrue<ReturnType<As<First<T>, TypedFunction>>>] extends [true]
                    ? true
                    : [IsFalse<ReturnType<As<First<T>, TypedFunction>>>] extends [true]
                        ? Or<AfterFirst<T>>
                        : boolean
                : Or<AfterFirst<T>>;
