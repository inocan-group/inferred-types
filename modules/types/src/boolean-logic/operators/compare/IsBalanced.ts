import type {
    AfterFirst,
    And,
    Chars,
    Err,
    First,
    FromNamedNestingConfig,
    IsNestingEnd,
    IsNestingMatchEnd,
    IsNestingStart,
    Join,
    Nesting,
    NestingConfig__Named,
    Pop,
    ToStringLiteral__Array,
} from "inferred-types/types";

type Check<
    TInput extends readonly string[],
    TNesting extends Nesting,
    TErr extends boolean = false,
    TStack extends readonly string[] = [],
> = TInput extends [
        infer Head extends string,
        ...infer Rest extends readonly string[]
]
    ? [IsNestingStart<Head, TNesting>] extends [true]
        ? Check<
            Rest,
            TNesting,
            TErr,
            [...TStack, Head]
        >
        : [IsNestingMatchEnd<Head, TStack, TNesting>] extends [true]
            ? Check<
                Rest,
                TNesting,
                TErr,
                TStack extends [
                    ...infer Leading extends readonly string[],
                    string
                ]
                    ? Leading
                    : never
            >
            : And<[
                IsNestingEnd<Head, TNesting>,
                TStack["length"] extends 0 ? true : false
            ]
            > extends true
                ? TErr extends true
                    ? Err<
                        "unbalanced/is-balanced",
                        `The stack moved into negative territory when the character '${Head}' -- an END character -- while the stack was already empty!`,
                        { char: Head; stack: ToStringLiteral__Array<TStack> }
                    >
                    : false
                : [IsNestingEnd<Head, TNesting>] extends [true]
                    ? TErr extends true
                        ? Err<
                            "unbalanced/is-balanced",
                            `Found an end character '${Head}' that doesn't match the expected end character for the top of the stack`,
                            { char: Head; stack: ToStringLiteral__Array<TStack> }
                        >
                        : false
                    : Check<
                        Rest,
                        TNesting,
                        TErr,
                        TStack
                    >
: [TStack["length"]] extends [0]
    ? true
    : TErr extends true
        ? Err<
            `unbalanced/is-balanced`,
            `The characters passed to 'IsBalanced<T,U>' are not balanced for the given nesting configuration. On completing a full pass the stack still has items on it: ${Join<TStack, ", ">}`
        >
        : false;

type EvalString<
    T extends string,
    U extends Nesting,
    TErr extends boolean
> = Check<Chars<T>, U, TErr>;

/**
 * **IsBalanced**`<T,U>`
 *
 * Boolean operator which tests whether the string literal `T` has an equal
 * number of "start" and "end" characters in it.
 *
 * - you may also pass in a `NestedString` or a _tuple_ of `NestedString`'s for `T`
 *
 * **Note:**
 * - if a start token is found _before_ the first start token (or the
 * tracker ever goes below zero for any reason) the returned value will be `false`.
 * - the generic `U` is a dictionary where the _keys_ represent the starting
 * character and the values are the ending character.
 * - if you prefer to get Error messages instead of `false` values you can set `TErr`
 * to true
 */
export type IsBalanced<
    T extends string,
    U extends Nesting | NestingConfig__Named = "brackets",
    TErr extends boolean = false
> = T extends string
    ? string extends T
        ? boolean
        : EvalString<T, FromNamedNestingConfig<U>, TErr>
    : never;
