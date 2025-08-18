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
    ? Delta<TTup["length"], TLen> extends infer Difference extends number
        ? FixedLengthArray<TFill, Difference> extends readonly unknown[]
            ? [
                ...TTup,
                ...FixedLengthArray<TFill, Difference>
            ]
            : never
        : never
    : TTup;
