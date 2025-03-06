import type { Delta } from "inferred-types/types";
import type { IsLessThan } from "src/boolean-logic";
import type { FixedLengthArray } from "src/tuples/FixedLengthArray";

export type WithMinLength<
    TTup extends readonly any[],
    TLen extends number,
    TFill = undefined
> = IsLessThan<
    TTup["length"],
    TLen
> extends true
    ? [...TTup, ...FixedLengthArray<TFill, Delta<TTup["length"], TLen>>]
    : TTup;
