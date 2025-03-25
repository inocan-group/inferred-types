import {
    AfterFirst,
    Chars,
    Contains,
    Err,
    First,
    Dictionary,
    StringKeys, Values,
    ToString,
    Length,
    ReverseLookup,
    Last
} from "inferred-types/types";

type Inv<
    TVal extends string,
    TKv extends Dictionary<string,string>,
    TLookup extends Dictionary<string,string> = ReverseLookup<TKv>
> = TVal extends keyof TLookup
? TLookup[TVal]
: never;

type Check<
    TInput extends readonly string[],
    TStartEnd extends Dictionary<string,string>,
    TCount extends readonly string[] = [],
> = [] extends TInput
? TCount["length"] extends 0
    ? true
    : false
: First<TInput> extends keyof TStartEnd
    ? Check<
        AfterFirst<TInput>,
        TStartEnd,
        [...TCount, First<TInput>]
    >
    : Contains<Values<TStartEnd>, First<TInput>> extends true
        ? Inv<First<TInput>, TStartEnd> extends Last<TCount>
            ? TCount extends readonly [string, ...infer Remaining extends string[]]
                ? Check<
                    AfterFirst<TInput>,
                    TStartEnd,
                    Remaining
                >
                : never
            : false
    : Check<
        AfterFirst<TInput>,
        TStartEnd,
        TCount
    >;


type LengthOne<T extends readonly string[]> = [] extends T
    ? true
    : Length<First<T>> extends 1
        ? LengthOne<AfterFirst<T>>
        : false;


/**
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
    U extends Dictionary<string,string>
> = LengthOne<[...StringKeys<U>, ...Values<U>]> extends true
    ? Check<Chars<T>,U>
    : Err<"invalid-key-value/is-balanced", `The IsBalanced<T,U> utility expects U to be a key/value dictionary where both keys and values are one character strings.`, { kv: ToString<U> }>;


