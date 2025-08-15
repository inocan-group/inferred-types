import type {
    Err,
    HasAny,
    HasNever,
    HasTrue,
    HasWideBoolean,
    IsAny,
    IsNever,
    TypedFunction
} from "inferred-types/types";

type LogicOptions = {
    empty?: boolean | unknown;
    err?: "false" | "error" | unknown;
};

type Reduce<T extends readonly (boolean | TypedFunction)[]> = {
    [K in keyof T]: T[K] extends TypedFunction
        ? ReturnType<T[K]>
        : T[K]
};

/**
 * **Or**`<T, [TOpt]>`
 *
 * Performs logical OR operation on an array of boolean values or functions returning boolean.
 *
 * - Returns `true` if any element is `true`
 * - Returns `boolean` if any element is wide `boolean` type
 * - Returns `false` if all elements are `false`
 * - Returns `false` for empty arrays (or value from options.empty)
 * - Returns `boolean` for wide arrays (length not known at compile time)
 * - Supports functions that return boolean values
 * - Configurable error handling via options parameter
 *
 * **Related:** `And`, `Not`
 */
export type Or<
    T extends readonly unknown[],
    TOpt extends LogicOptions = { empty: false; err: "false" }
>
    // Handle global any/never types
    = IsAny<T> extends true
        ? TOpt extends { err: "error" }
            ? Err<"invalid/or", "The Or<...> logical combinator has a 'any' type! Or is expecting a tuple of boolean values (or functions which return boolean).", { library: "inferred-types" }>
            : false
        : IsNever<T> extends true
            ? TOpt extends { err: "error" }
                ? Err<"invalid/or", "The Or<...> logical combinator has a 'never' type! Or is expecting a tuple of boolean values (or functions which return boolean).", { library: "inferred-types" }>
                : false
        // Handle invalid array element types
            : HasAny<T> extends true
                ? TOpt extends { err: "error" }
                    ? Err<"invalid/or", "The Or<T> found elements in T which were the 'any' type! Or<T> expects all elements to be a boolean value or a function which returns a boolean value.", { value: T }>
                    : false
                : HasNever<T> extends true
                    ? TOpt extends { err: "error" }
                        ? Err<"invalid/or", "The Or<T> found elements in T which were the 'never' type! Or<T> expects all elements to be a boolean value or a function which returns a boolean value.", { value: T }>
                        : false
                // Handle valid boolean/function arrays
                    : T extends readonly (boolean | TypedFunction)[]
                    // Handle wide arrays (unknown length at compile time)
                        ? number extends T["length"]
                            ? boolean
                        // Handle empty arrays
                            : [] extends T
                                ? TOpt extends { empty: infer E } ? E : false
                            // Process the array (reduce functions to booleans if needed)
                                : T extends readonly boolean[]
                                    ? HasTrue<T> extends true
                                        ? true
                                        : HasWideBoolean<T> extends true
                                            ? boolean
                                            : false
                                // Handle arrays with functions
                                    : Reduce<T> extends readonly boolean[]
                                        ? HasTrue<Reduce<T>> extends true
                                            ? true
                                            : HasWideBoolean<Reduce<T>> extends true
                                                ? boolean
                                                : false
                                        : TOpt extends { err: "error" }
                                            ? Err<"invalid/or", "The conditions passed into Or<T> could not be reduced down to just a boolean array.", { library: "inferred-types"; value: T }>
                                            : false
                    // Handle completely invalid types
                        : TOpt extends { err: "error" }
                            ? Err<"invalid/or", "The Or<T> type utility requires that all elements passed to it are either a boolean value directly or a LogicFunction which returns a boolean value", { value: T }>
                            : false;
