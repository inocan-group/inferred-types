import type {
    AfterFirst,
    Err,
    First,
    HasAny,
    HasNever,
    IsAny,
    IsEqual,
    IsNever,
    IsTrue,
    LogicFunction,
    TypedFunction,
} from "inferred-types/types";

type Process<
    T extends readonly boolean[],
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

type Reduce<T extends readonly (boolean | LogicFunction)[]> = {
    [K in keyof T]: T[K] extends TypedFunction
        ? ReturnType<T[K]>
        : T[K]
};

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

/**
 * **Or**`<T>`
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
    T extends readonly (boolean | LogicFunction)[],
    U extends boolean = false
> = Validate<T> extends Error
    ? Validate<T>
    : [] extends T
        ? U
        : Validate<T> extends readonly boolean[]
            ? Process<Validate<T>>
            : never;
