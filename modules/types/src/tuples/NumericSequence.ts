import type { AddPositive, Delta, Err, IsNegativeNumber, Subtract } from "inferred-types/types";
import type { IsFloat, IsGreaterThan, Or } from "types/boolean-logic";
import type { FixedLengthArray } from "./FixedLengthArray";

/**
 * General-purpose increment that works with any integer (positive or negative)
 *
 * - For positive numbers: uses AddPositive<T, 1>
 * - For negative numbers: uses Subtract<T, -1> (subtracting negative = addition)
 */
type LocalIncrement<T extends number>
    = IsNegativeNumber<T> extends true
        ? Subtract<T, -1>
        : AddPositive<T, 1>;

/**
 * General-purpose decrement that works with any integer (positive or negative)
 *
 * - Uses Subtract<T, 1> for both positive and negative numbers
 */
type LocalDecrement<T extends number> = Subtract<T, 1>;

type MoveUpward<
    TTracker extends readonly unknown[],
    TStart extends number,
    TResult extends readonly number[] = []
> = TTracker extends [
    infer _Head,
    ...infer Rest extends readonly unknown[]
]
    ? LocalIncrement<TStart> extends infer Next extends number
        ? MoveUpward<
            Rest,
            Next,
            [
                ...TResult,
                TStart
            ]
        >
        : never
    : [
        ...TResult,
        TStart
    ];

type MoveDownward<
    TTracker extends readonly unknown[],
    TStart extends number,
    TResult extends readonly number[] = []
>
    = TTracker extends [
        infer _Head,
        ...infer Rest extends readonly unknown[]
    ]
        ? LocalDecrement<TStart> extends infer Next extends number
            ? MoveDownward<
                Rest,
                Next,
                [
                    ...TResult,
                    TStart
                ]
            >
            : never
        : [
            ...TResult,
            TStart
        ];

/**
 * **NumericSequence**
 *
 * Produces a tuple with values starting with `TStart` and ending with `TEnd`.
 *
 * - numbers must be integers or an Error will be returned
 * - if `TEnd` is greater than `TStart` the numeric sequence will move downward
 *
 * **Related:** `FixedLengthArray`
 *
 * ```ts
 * // [ 3, 4, 5, 6, 7, 8 ]
 * type Seq = NumericSequence<3,8>;
 * ```
 */
export type NumericSequence<
    TStart extends number,
    TEnd extends number
> = number extends TStart
    ? number[]
    : number extends TEnd
        ? number[]
        : TStart extends TEnd
            ? []
            : Or<[IsFloat<TStart>, IsFloat<TEnd>]> extends true
                ? Err<"invalid-range", `TStart and TEnd must be integer values!`, { symbol: "NumericSequence"; start: TStart; end: TEnd }>
                : Delta<TStart, TEnd> extends infer Diff extends number
                    ? FixedLengthArray<".", Diff> extends infer Tracker extends readonly unknown[]
                        ? IsGreaterThan<TStart, TEnd> extends true
                            ? MoveDownward<
                                Tracker,
                                TStart
                            >
                            : MoveUpward<
                                Tracker,
                                TStart
                            >
                        : never
                    : never;
