import type {
    AfterFirst,
    Err,
    First,
    IsEqual,
    IsNever,
    IsTrue,
    TypedFunction,
} from "inferred-types/types";

type Process<
    T extends readonly unknown[],
    B extends boolean = false
> = [] extends T
    ? [B] extends [true]
        ? boolean
        : false
    : [First<T>] extends [true]
        ? true
        : [First<T>] extends [TypedFunction]
            ? [IsTrue<ReturnType<First<T>>>] extends [true]
                ? true
                : [IsEqual<ReturnType<First<T>>, boolean>] extends [true]
                    ? Process<AfterFirst<T>, true>
                    : Process<AfterFirst<T>, B>
            : [IsEqual<First<T>, boolean>] extends [true]
                ? Process<AfterFirst<T>, true>
                : Process<AfterFirst<T>, B>;

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
        : Process<T>;
