import type {
    AfterFirst,
    Err,
    First,
    HasAny,
    HasFalse,
    HasNever,
    HasWideBoolean,
    IfEqual,
    IsAny,
    IsNever,
    IsWideArray,
    LogicFunction,
    TypedFunction,
} from "inferred-types/types";

type Process<
    TConditions extends readonly boolean[],
    TBooleanSeen extends boolean,
> = [] extends TConditions
    ? IfEqual<TBooleanSeen, true, boolean, true>
    : [First<TConditions>] extends [false]
        ? false
        : Process<
            AfterFirst<TConditions>,
            TBooleanSeen
        >;

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
                `The And<T> found elements in T which were the 'never' type! Or<T> expects all elements to be a boolean value or a function which returns a boolean value.`,
                { value: T; library: "inferred-types" }
            >
            : [HasAny<T>] extends [true]
                ? Err<
                    `invalid/and`,
                    `The And<T> found elements in T which were the 'any' type! Or<T> expects all elements to be a boolean value or a function which returns a boolean value.`,
                    { value: T; library: "inferred-types" }
                >

                : T extends readonly (boolean | LogicFunction)[]
                    ? Reduce<T> extends readonly boolean[]
                        ? Reduce<T>
                        : Err<`invalid/and`, `The And<T> utility found invalid types in the elements of T. Or<T> expects either a boolean value or a function which returns a boolean value.`, { value: T }>
                    : Err<`invalid/and`, `The And<T> found invalid types in the elements of T. Or<T> expects either a boolean value or a function which returns a boolean value.`, { value: T }>;

/**
 * **And**`<TConditions, [TEmpty]>`
 *
 * Allows an array of conditions which are either ARE a boolean value or a
 * function which evaluates to a boolean value to be logically AND'd together.
 */
export type And<
    TConditions extends readonly (boolean | LogicFunction)[],
    TEmpty extends boolean = false,
> = Validate<TConditions> extends Error
    ? Validate<TConditions>
    : IsWideArray<TConditions> extends true
        ? boolean
        : [] extends TConditions
            ? TEmpty
            : Validate<TConditions> extends readonly boolean[]
                ? HasFalse<Validate<TConditions>> extends true
                    ? false
                    : HasWideBoolean<Validate<TConditions>> extends true
                        ? boolean
                        : true
                : never;
