import type {
    AsDateMeta,
    DateMeta
} from "inferred-types/types";

/**
 * Tests whether `T` is a valid ISO Date which captures year
 * and month but not date:
 *
 * - `-YYYY-MM` _or_ `-YYYYMM`
 *
 * **Related:** `IsIsoYearMonthTime`, `IsIsoDate`
 *
 * **Note:**
 * - if a type passes this test then it guaranteed to be a valid
 * ISO Date string
 * - in the type system you can't upgrade it to the "blessed"
 * branded type of `IsoDate` but if your runtime uses the
 * `isIsoDate()` type guard it will pass and be upgraded.
 */
export type IsIsoYearMonth<T> = T extends string
    ? string extends T
        ? boolean
        : AsDateMeta<T> extends Error
            ? false
            : AsDateMeta<T> extends DateMeta
                ? AsDateMeta<T>["dateType"] extends "year-month"
                    ? true
                    : false
                : false
    : false;
