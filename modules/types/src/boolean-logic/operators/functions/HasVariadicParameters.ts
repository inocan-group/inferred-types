import {
    And,
    As,
    DefineModifiers,
    HasModifier,
    HasVariadicHead,
    HasVariadicInterior,
    HasVariadicTail,
    IsFunction,
    IsNull,
    IsVariadicArray,
    IsWideArray,
    Or,
    TypedFunction
} from "inferred-types/types"

export type VariadicParameterModifiers = DefineModifiers<[
    "match-variadic-tail",
    "match-variadic-head",
    "match-variadic-interior"
]>;

type ProcessModified<
    T extends TypedFunction,
    U extends VariadicParameterModifiers
> = Or<[
        And<[HasModifier<"match-variadic-tail", U, VariadicParameterModifiers>, HasVariadicTail<Parameters<T>>]>,
        And<[HasModifier<"match-variadic-head", U, VariadicParameterModifiers>, HasVariadicHead<Parameters<T>>]>,
        And<[HasModifier<"match-variadic-interior", U, VariadicParameterModifiers>, HasVariadicInterior<Parameters<T>>]>
]>;

/**
 * **HasVariadicParameters**`<T>`
 *
 * Tests wether `T` is:
 *
 * - a function
 * - has parameters which are variadic and **not** a wide array type
 *
 * You can optionally use any of the following three modifiers for `U`:
 *
 * - `match-variadic-tail`,
 * - `match-variadic-head`
 * - `match-variadic-interior`
 *
 * You can include one or more and these modifiers determine which _kinds_ of
 * variadic patterns you want to match on.
 */
export type HasVariadicParameters<T, U extends VariadicParameterModifiers = null> = IsFunction<T> extends true
? IsNull<U> extends true
    ? IsVariadicArray<Parameters<As<T, TypedFunction>>> extends true
        ? IsWideArray<Parameters<As<T, TypedFunction>>> extends true
            ? false
            : true
    : false
: ProcessModified<As<T, TypedFunction>,U>
: false;
