import type {
    Delta,
    FixedLengthArray,
    IsLessThan,
} from "inferred-types/types";

export type WithMinLength<
    TTup extends readonly unknown[],
    TLen extends number,
    TFill = undefined
> = IsLessThan<
    TTup["length"],
    TLen
> extends true
    ? Delta<TTup["length"], TLen> extends number
        ? FixedLengthArray<TFill, Delta<TTup["length"], TLen>> extends readonly unknown[]
            ? [
                ...TTup,
                ...FixedLengthArray<TFill, Delta<TTup["length"], TLen>>
            ]
            : never
        : never
    : TTup;
