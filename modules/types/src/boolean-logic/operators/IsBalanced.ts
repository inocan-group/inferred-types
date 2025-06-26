import type {
    AfterFirst,
    And,
    Chars,
    Contains,
    Dictionary,
    Err,
    First,
    FromNamedNestingConfig,
    IsNestingConfig,
    IsNestingEnd,
    IsNestingKeyValue,
    IsNestingMatchEnd,
    IsNestingStart,
    Join,
    Last,
    Nesting,
    NestingConfig__Named,
    Pop,
    ReverseLookup,
    ToString,
    ToStringLiteral,
    ToStringLiteral__Tuple,
    Values
} from "inferred-types/types";



type Check<
    TInput extends readonly string[],
    TNesting extends Nesting,
    TStack extends readonly string[] = [],
> = [] extends TInput
    ? [TStack["length"]] extends [0]
        ? true
        : Err<
            `unbalanced/is-balanced`,
            `The characters passed to 'IsBalanced<T,U>' are not balanced for the given nesting configuration. On completing a full pass the stack still has items on it: ${Join<TStack, ", ">}`
        >
    : [IsNestingStart<First<TInput>, TNesting>] extends  [true]
        ? Check<
            AfterFirst<TInput>,
            TNesting,
            [...TStack, First<TInput>]
        >
    : [IsNestingMatchEnd<First<TInput>, TStack, TNesting>] extends [true]
        ? Check<
            AfterFirst<TInput>,
            TNesting,
            Pop<TStack>
        >
    : And<[
        IsNestingEnd<First<TInput>, TNesting>,
        TStack["length"] extends 0 ? true : false]
    > extends true
        ? Err<
            "unbalanced/is-balanced",
            `The stack moved into negative territory when the character '${First<TInput>}' -- an END character -- while the stack was already empty!`,
            { char: First<TInput>, stack: ToStringLiteral__Tuple<TStack> }
        >
    : Check<
        AfterFirst<TInput>,
        TNesting,
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
 */
export type IsBalanced<
    T extends string,
    U extends Nesting | NestingConfig__Named = "default"
> = IsNestingConfig<FromNamedNestingConfig<U>> extends true
    ? Check<Chars<T>, FromNamedNestingConfig<U>>
    : IsNestingConfig<FromNamedNestingConfig<U>> extends Error
        ? IsNestingConfig<FromNamedNestingConfig<U>>
        : Err<
            "invalid-key-value/is-balanced",
            `The IsBalanced<T,U> utility expects U to be a key/value dictionary where both keys and values are one character strings.`,
            { kv: ToStringLiteral<U> }
        >;

type X = IsBalanced<"[0] square brackets once">
