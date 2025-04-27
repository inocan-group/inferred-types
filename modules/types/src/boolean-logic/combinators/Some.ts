import type {
    AfterFirst,
    ComparisonOperation,
    Compare,
    Container,
    Dictionary,
    First,
    Values,
    Flexy,
    ComparisonLookup,
} from "inferred-types/types";

type Process<
    TElements extends readonly unknown[],
    TOp extends ComparisonOperation,
    TComparator extends Flexy<ComparisonLookup[TOp]["params"]>,
> = [] extends TElements
    ? false
    : [Compare<First<TElements>, TOp, TComparator>] extends [true]
        ? true
        : Process<
            AfterFirst<TElements>,
            TOp,
            TComparator
        >;

export type Some<
    TContainer extends Container,
    TOp extends "extends" | "equals" | "startsWith" | "endsWith" | "lessThan" | "greaterThan",
    TComparator extends Flexy<ComparisonLookup[TOp]["params"]>,
> = TContainer extends readonly unknown[]
    ? Process<TContainer, TOp, TComparator>
    : TContainer extends Dictionary
        ? Process<Values<TContainer>, TOp, TComparator>
        : never;
