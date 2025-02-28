import type {
    AsNumber,
    EnsureLeading,
    NumberLike,
    Zero,
} from "inferred-types/types";

type Process<
    T extends `${number}`,
> = EnsureLeading<T, "-">;

/**
 * **AsNegativeNumber**
 *
 * Ensures that the number-like value for `T` is a negative number.
 *
 * **Related**: `Abs`, `InvertNumericSign`
 */
export type AsNegativeNumber<
    T extends NumberLike,
> = T extends Zero
    ? T
    : T extends number
        ? AsNumber<Process<`${T}`>> extends number
            ? AsNumber<Process<`${T}`>>
            : never
        : T extends `${number}`
            ? Process<T> extends `${number}`
                ? Process<T>
                : never
            : never;
