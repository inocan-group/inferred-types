import type {
    As,
    Err,
    HasAny,
    HasFalse,
    HasNever,
    HasWideBoolean,
    IsAny,
    IsNever,
    LogicFunction,
    LogicOptions,
    MergeObjects,
    TypedFunction,
} from "inferred-types/types";

type Reduce<T extends readonly (boolean | LogicFunction)[]> = {
    [K in keyof T]: T[K] extends TypedFunction
        ? ReturnType<T[K]>
        : T[K]
};

type Validate<T extends readonly unknown[]> = [IsAny<T>] extends [true]
? Err<
    `invalid/and`,
    `The And<T> logical combinator has a 'any' type! Or is expecting a tuple of boolean values (or functions which return boolean).`,
    { library: "inferred-types" }
>
: [IsNever<T>] extends [true]
    ? Err<
        `invalid/and`,
        `The And<T> logical combinator has a 'never' type! Or is expecting a tuple of boolean values (or functions which return boolean).`,
        { library: "inferred-types" }
    >
: [HasNever<T>] extends [true]
    ? Err<
        `invalid/and`,
        `The And<T> found elements in T which were the 'never' type! And<T> expects all elements to be a boolean value or a function which returns a boolean value.`,
        { value: T; library: "inferred-types" }
    >
: [HasAny<T>] extends [true]
    ? Err<
        `invalid/and`,
        `The And<T> found elements in T which were the 'any' type! And<T> expects all elements to be a boolean value or a function which returns a boolean value.`,
        { value: T; library: "inferred-types" }
    >

: T extends readonly (boolean | LogicFunction)[]
    ? T
    : Err<`invalid/and`, `The And<T> found invalid types in the elements of T. And<T> expects either a boolean value or a function which returns a boolean value.`, { value: T }>;

/**
 * Returns a true/false value based on logic conditions
 */
type Test<
    TConditions extends readonly boolean[],
> = HasFalse<TConditions> extends true
        ? false
    : HasWideBoolean<TConditions> extends true
        ? boolean
        : true;



type DefaultOptions = {
    empty: false;
    err: "false";
}

type O<T extends LogicOptions> = As<
    MergeObjects<
        DefaultOptions,
        T
    >,
    Required<LogicOptions>
>

type Process<
    T extends readonly (boolean | LogicFunction)[],
    O extends Required<LogicOptions>
> = [] extends T
    ? O["empty"]
    : T extends readonly boolean[]
        ? Test<T>
        : Reduce<T> extends readonly boolean[]
            ? Test<Reduce<T>>
        : O["err"] extends "error"
            ? Err<
                `invalid/and`,
                `The conditions passed into And<T> could not be reduced down to just a boolean array. It is ok to include LogicFunction's in what you pass in but after attempting to reduce any functions down to boolean values the issue still remains.`,
                { library: "inferred-types", value: T, emptyType: O["empty"] }
            >
            : false;

/**
 * **And**`<TConditions, [TOpt]>`
 *
 * Allows an array of conditions which are either ARE a boolean value or a
 * function which evaluates to a boolean value to be logically AND'd together.
 *
 * - you can modify the `TOpt` hash's "empty" property which determines the type to return if
 * the conditions passed in are an empty array. By default this is `false`.
 * - you can modify the error handling behavior with the `TOpt`'s "err" property.
 *     - `"false" results in invalid types in the conditions resulting in a `false` type return
 *     - `"error"` passes through a contextual Error
 *     - the _default_ behavior is to return `false` in order to keep the return type's union to just
 *     a `true`, `false`, or `boolean` type. This does place more responsibility on the caller for
 *     somewhat better type performance.
 *
 * **Related:** `Or`, `Xor`, `Compare`, `Inverse`, `Not`, `None`
 */
export type And<
    TConditions extends readonly unknown[],
    TOpt extends LogicOptions = {empty: false, err: "false"}
> =
TConditions extends readonly (boolean | LogicFunction)[]
? number extends TConditions["length"]
    ? boolean
: Validate<TConditions> extends Error
    ? O<TOpt>["err"] extends "error"
        ? Validate<TConditions>
        : false
: Process<TConditions,O<TOpt>>
: O<TOpt>["err"] extends "error"
    ? Err<`invalid/and`, `The And<T> type utility requires that all elements passed to it are either a boolean value directly or a LogicFunction which returns a boolean value`>
    : false;
