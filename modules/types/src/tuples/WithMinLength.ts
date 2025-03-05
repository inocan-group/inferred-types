import { Delta } from "inferred-types/types"
import { IsLessThan } from "src/boolean-logic"
import { FixedLengthArray } from "src/tuples/FixedLengthArray"

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
