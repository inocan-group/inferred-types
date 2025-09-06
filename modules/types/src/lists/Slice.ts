import { IsGreaterThan } from '../boolean-logic/operators/scalar/numeric/IsGreaterThan';
import type {
    Abs,
    Chars,
    Concat,
    FixedLengthArray,
    IsLessThan,
    IsNegativeNumber,
    TakeFirst,
    TakeLast,
} from "inferred-types/types";

export type DropLeading<
    TList extends readonly unknown[],
    TStart extends number,
> = TList extends readonly [
    ...FixedLengthArray<unknown, TStart>,
    ...infer REST,
]
    ? REST
    : never;

export type DropTrailing<
    TList extends readonly unknown[],
    TStart extends number,
> = TList extends readonly [
    ...infer LEAD,
    ...FixedLengthArray<unknown, TStart>,
]
    ? LEAD
    : never;

export type TruncateAtLen<
    TList extends readonly unknown[],
    TLen extends number | undefined,
> = TLen extends number
    ? IsNegativeNumber<TLen> extends true
        ? DropTrailing<TList, Abs<TLen>>
        : TakeFirst<TList, TLen>
    : TList;

type ProcessList<
    TList extends readonly unknown[],
    TStart extends number,
    TLen extends number | undefined,
> = TList extends readonly unknown[]
    ? IsNegativeNumber<TStart> extends true
        ? TakeLast<TList, Abs<TStart>>
        : TruncateAtLen<DropLeading<TList, TStart>, TLen>
    : never;

type ProcessChars<
    TList extends readonly string[],
    TStart extends number,
    TLen extends number | undefined,
> = ProcessList<TList, TStart, TLen> extends readonly string[]
    ? Concat<ProcessList<TList, TStart, TLen>>
    : never;

/**
 * **Slice**`<TList, TStart, TLen>`
 *
 * Provides a slice of a tuple or a string.
 *
 * - negative indexes for `TEnd` can be used
 * - `TStart` defaults to 0
 * - `TLen` defaults to the all the remaining elements
 * but can be any amount; if you use negative values this
 * will drop that many values off the end of the tuple
 */
export type Slice<
    TList extends readonly unknown[] | string,
    TStart extends number,
    TLen extends number | undefined = undefined,
> = TList extends string
    ? Chars<TList> extends readonly string[]
        ? IsGreaterThan<TStart, Chars<TList>["length"]> extends true
            ? ""
            : ProcessChars<Chars<TList>, TStart, TLen>
        : never
    : TList extends readonly unknown[]
        ? ProcessList<TList, TStart, TLen>
        : never;
