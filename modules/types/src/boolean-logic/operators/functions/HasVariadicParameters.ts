import type {
    And,
    AnyFunction,
    DefineModifiers,
    HasModifier,
    HasVariadicHead,
    HasVariadicInterior,
    HasVariadicTail,
    IsAny,
    IsNever,
    IsNull,
    IsUnknown,
    IsVariadicArray,
    TypedFunction
} from "inferred-types/types";

export type VariadicParameterModifiers = DefineModifiers<[
    "match-variadic-tail",
    "match-variadic-head",
    "match-variadic-interior"
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
export type HasVariadicParameters<
    T,
    U extends VariadicParameterModifiers = null
> = [IsNever<T>] extends [true]
? false
: [IsAny<T>] extends [true]
? boolean
: [IsUnknown<T>] extends [true]
? boolean
: T extends AnyFunction
    ? T extends TypedFunction
        ? Parameters<T> extends infer Params extends readonly unknown[]
            ? IsVariadicArray<Params> extends true
                ? IsNull<U> extends true
                    ? true
                    : And<[
                        HasModifier<"match-variadic-tail", U, VariadicParameterModifiers>,
                        HasVariadicTail<Parameters<T>>
                    ]> extends true
                        ? true
                    : And<[
                        HasModifier<"match-variadic-head", U, VariadicParameterModifiers>,
                        HasVariadicHead<Parameters<T>>
                    ]> extends true
                        ? true
                    : And<[
                        HasModifier<"match-variadic-interior", U, VariadicParameterModifiers>,
                        HasVariadicInterior<Parameters<T>>
                    ]> extends true
                        ? true
                    : false
                : false
        : false

    : false
: false;
