import type {
    AfterFirst,
    ComparatorOperation,
    Compare,
    Container,
    Dictionary,
    First,
    IsEqual,
    NumberLike,
    Or,
    Values,
    WhenNever,
} from "inferred-types/types";

type Process<
    TElements extends readonly unknown[],
    TOp extends ComparatorOperation,
    TComparator,
> = [] extends TElements
    ? false
    : [WhenNever<Compare<First<TElements>, TOp, TComparator>>] extends [true]
        ? true
        : Process<
            AfterFirst<TElements>,
            TOp,
            TComparator
        >;

export type Some<
    TContainer extends Container,
    TOp extends "extends" | "equals" | "startsWith" | "endsWith" | "lessThan" | "greaterThan",
    TComparator extends Or<[
        IsEqual<TOp, "startsWith">,
        IsEqual<TOp, "endsWith">,
    ]> extends true
        ? string
        : Or<[IsEqual<TOp, "lessThan">, IsEqual<TOp, "greaterThan">]> extends true
            ? NumberLike
            : unknown,
> = TContainer extends readonly unknown[]
    ? Process<TContainer, TOp, TComparator>
    : TContainer extends Dictionary
        ? Process<Values<TContainer>, TOp, TComparator>
        : never;
