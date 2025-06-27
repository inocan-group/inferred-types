import type {
    AfterFirst,
    Err,
    First,
    IsBoolean,
    IsFalse,
    IsNever,
    IsTrue,
    Logic,
    LogicFunction,
} from "inferred-types/types";

type Result<
    T extends readonly (boolean | never)[],
    THasBoolean extends boolean = false,
> = [] extends T
    ? [IsTrue<THasBoolean>] extends [true]
        ? boolean
        : false
    : [IsBoolean<First<T>>] extends [true]
        ? [IsTrue<First<T>>] extends [true]
            ? true
            : [IsFalse<First<T>>] extends [true]
                ? Result<
                    AfterFirst<T>,
                    THasBoolean
                >
                : Result<
                    AfterFirst<T>,
                    true
                >
        : never;

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
> = [IsNever<T>] extends [true]
    ? Err<
        `invalid/never`,
        `The Or<...> logical combinator was passed never as a value! Or is expecting a tuple of boolean values.`,
        { library: "inferred-types" }
    >
    : T extends (boolean | LogicFunction)[]

    ? Result<{
        [K in keyof T]: Logic<T[K], "never">
    }>
    : false;

// [] extends TConditions
//     ? TEmpty
//     : First<TConditions> extends true
//         ? true
//         : First<TConditions> extends TypedFunction
//             ? ReturnType<First<TConditions>> extends true
//                 ? true
//                 : First<TConditions> extends false
//                     ? Or<AfterFirst<TConditions>, TEmpty>
//                     : Or<AfterFirst<TConditions>, boolean>
//             : First<TConditions> extends false
//                 ? Or<AfterFirst<TConditions>, TEmpty>
//                 : Or<AfterFirst<TConditions>, boolean>;
