import type {
    Abs,
    Add,
    AsNegativeNumber,
    AsNumber,
    CompareNumbers,
    Err,
    HaveSameNumericSign,
    If,
    IsGreaterThan,
    IsNegativeNumber,
    IsWideType,
    NumberLike,
    Or,
    ParseInt,
    StartsWith,
    Subtract,
} from "inferred-types/types";

type Process<
    A extends NumberLike,
    B extends NumberLike,
> = If<
    HaveSameNumericSign<A, B>,
    If<
        IsGreaterThan<Abs<A>, Abs<B>>,
        Add<Abs<A>, AsNegativeNumber<B>>,
        Add<Abs<B>, AsNegativeNumber<A>>
    >,
    // one of the params is negative, one positive
    Add<Abs<A>, Abs<B>>
>;

/**
 * **Delta**`<A,B>`
 *
 * Provides the _delta_ between two numbers (including
 * between negative numbers).
 */
export type Delta<
    A extends NumberLike,
    B extends NumberLike,
> = A extends `${number}`
    ? Process<A, B>
    : AsNumber<Process<A, B>>;

type AsLit<T extends NumberLike> = T extends `${number}`
    ? T
    : T extends number
        ? `${T}`
        : never;

type ProcessNeg<
    A extends `${number}`,
    B extends `${number}`,
> = Delta<A, B> extends `${infer Num extends number}`
    ? StartsWith<Num, "-"> extends true
        ? `${Num}`
        : `-${Num}`
    : never;

export type NegDelta<
    A extends NumberLike,
    B extends NumberLike,
> = A extends number
    ? ParseInt<ProcessNeg<
        AsLit<A>,
        AsLit<B>
    >>
    : ProcessNeg<
        AsLit<A>,
        AsLit<B>
    >;


export type DeltaLight<
    A extends NumberLike,
    B extends NumberLike
> = Or<[
    IsWideType<A>,
    IsWideType<B>
]> extends true
    ? number
: Or<[
    IsNegativeNumber<A>,
    IsNegativeNumber<B>
]> extends true
    ? Err<
        `invalid-type/negative`,
        `The DeltaLight<A,B> utility does not work with negative numbers! Use Delta<A,B> if you need that`,
        { a: A, b: B }
    >
: CompareNumbers<A,B> extends "greater"
    ? Subtract<A,B>
    : CompareNumbers<A,B> extends "less"
    ? Subtract<B,A>
    : 0;
