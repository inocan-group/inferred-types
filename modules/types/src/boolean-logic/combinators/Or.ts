import type {
    As,
    Err,
    HasAny,
    HasFalse,
    HasNever,
    HasTrue,
    HasWideBoolean,
    IsAny,
    IsNever,
    LogicFunction,
    LogicOptions,
    TypedFunction,
} from "inferred-types/types";

type Process<
    T extends readonly boolean[],
    U extends Required<LogicOptions>
> = HasTrue<T> extends true
? true
: HasWideBoolean<T> extends true
? boolean
: false;

type Reduce<T extends readonly (boolean | LogicFunction)[]> = As<{
    [K in keyof T]: T[K] extends TypedFunction
        ? ReturnType<T[K]>
        : T[K]
}, readonly boolean[]>;

type Validate<T extends readonly unknown[]> = [IsAny<T>] extends [true]
    ? Err<
        `invalid/or`,
        `The Or<...> logical combinator has a 'any' type! Or is expecting a tuple of boolean values (or functions which return boolean).`,
        { library: "inferred-types" }
    >
    : [IsNever<T>] extends [true]
        ? Err<
            `invalid/or`,
            `The Or<...> logical combinator has a 'never' type! Or is expecting a tuple of boolean values (or functions which return boolean).`,
            { library: "inferred-types" }
        >
        : [HasNever<T>] extends [true]
            ? Err<`invalid/or`, `The Or<T> found elements in T which were the 'never' type! Or<T> expects all elements to be a boolean value or a function which returns a boolean value.`, { value: T }>
        : [HasAny<T>] extends [true]
            ? Err<`invalid/or`, `The Or<T> found elements in T which were the 'any' type! Or<T> expects all elements to be a boolean value or a function which returns a boolean value.`, { value: T }>

        : T extends readonly (boolean | LogicFunction)[]
            ? Reduce<T> extends readonly boolean[]
                ? Reduce<T>
                : Err<`invalid/or`, `The Or<T> utility found invalid types in the elements of T. Or<T> expects either a boolean value or a function which returns a boolean value.`, { value: T }>
        : Err<`invalid/or`, `The Or<T> found invalid types in the elements of T. Or<T> expects either a boolean value or a function which returns a boolean value.`, { value: T }>;


type DefaultOptions = {
    empty: false;
    err: "false";
}

type Opt<T extends LogicOptions> = As<
    {
        empty: T extends { empty: infer E } ? E : DefaultOptions["empty"];
        err: T extends { err: infer E } ? E : DefaultOptions["err"];
    },
    Required<LogicOptions>
>

/**
 * **Or**`<T, [U]>`
 *
 * Allows an array of conditions -- _either a boolean value or a function which evaluates
 * to a boolean value_ -- to be logically OR'd together.
 *
 * - if `T` is type `any` or `never` returns an Error
 * - if any element in `T` is `any` or `never` then returns an Error
 * - if `T` is type `unknown` returns `boolean | Error`
 * - if any element in `T` is `unknown` returns `boolean | Error`
 *
 * **Related:** `And`
 */
export type Or<
    T extends readonly unknown[],
    U extends LogicOptions = { empty: false, err: "false" }
> = Validate<T> extends Error
    ? Opt<U>["err"] extends "error"
        ? Validate<T>
        : false
: T extends readonly (boolean | LogicFunction)[]
? number extends T["length"]
    ? boolean
: T extends readonly boolean[]
    ? Process<T, Opt<U>>
: Process<Reduce<T>, Opt<U>>
: Opt<U>["err"] extends "error"
    ? Err<
        `invalid/or`,
        `The Or<T> type utility requires that all elements passed to it are either a boolean value directly or a LogicFunction which returns a boolean value`,
        { value: T }
    >
    : false;
