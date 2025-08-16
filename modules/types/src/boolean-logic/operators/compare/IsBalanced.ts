import type {
    AfterFirst,
    And,
    Chars,
    Err,
    First,
    FromNamedNestingConfig,
    IsNestingConfig,
    IsNestingEnd,
    IsNestingMatchEnd,
    IsNestingStart,
    Join,
    Nesting,
    NestingConfig__Named,
    Pop,
    ToStringLiteral,
    ToStringLiteral__Tuple,
} from "inferred-types/types";

type Check<
    TInput extends readonly string[],
    TNesting extends Nesting,
    TErr extends boolean = false,
    TStack extends readonly string[] = [],
> = [] extends TInput
    ? [TStack["length"]] extends [0]
        ? true
        : TErr extends true
            ? Err<
                `unbalanced/is-balanced`,
                `The characters passed to 'IsBalanced<T,U>' are not balanced for the given nesting configuration. On completing a full pass the stack still has items on it: ${Join<TStack, ", ">}`
            >
            : false
    : [IsNestingStart<First<TInput>, TNesting>] extends [true]
        ? Check<
            AfterFirst<TInput>,
            TNesting,
            TErr,
            [...TStack, First<TInput>]
        >
        : [IsNestingMatchEnd<First<TInput>, TStack, TNesting>] extends [true]
            ? Check<
                AfterFirst<TInput>,
                TNesting,
                TErr,
                Pop<TStack>
            >
            : And<[
                IsNestingEnd<First<TInput>, TNesting>,
                TStack["length"] extends 0 ? true : false
            ]
            > extends true
                ? TErr extends true
                    ? Err<
                        "unbalanced/is-balanced",
                        `The stack moved into negative territory when the character '${First<TInput>}' -- an END character -- while the stack was already empty!`,
                        { char: First<TInput>; stack: ToStringLiteral__Tuple<TStack> }
                    >
                    : false
                : [IsNestingEnd<First<TInput>, TNesting>] extends [true]
                    ? TErr extends true
                        ? Err<
                            "unbalanced/is-balanced",
                            `Found an end character '${First<TInput>}' that doesn't match the expected end character for the top of the stack`,
                            { char: First<TInput>; stack: ToStringLiteral__Tuple<TStack> }
                        >
                        : false
                    : Check<
                        AfterFirst<TInput>,
                        TNesting,
                        TErr,
                        TStack
                    >;

/**
 * **IsBalanced**`<T,U>`
 *
 * Boolean operator which tests whether the string literal `T` has an equal
 * number of "start" and "end" characters in it.
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
    U extends Nesting | NestingConfig__Named = "default",
    TErr extends boolean = false
> = IsNestingConfig<FromNamedNestingConfig<U>> extends true
    ? Check<Chars<T>, FromNamedNestingConfig<U>, TErr>
    : IsNestingConfig<FromNamedNestingConfig<U>> extends Error
        ? IsNestingConfig<FromNamedNestingConfig<U>>
        : TErr extends true
            ? Err<
                "invalid-key-value/is-balanced",
                `The IsBalanced<T,U> utility expects U to be a key/value dictionary where both keys and values are one character strings.`,
                { kv: ToStringLiteral<U> }
            >
            : false;
