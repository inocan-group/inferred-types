import type {
    And,
    AsDateMeta,
    DateMeta,
    IsIsoFullDateTime,
    IsIsoMonthDateTime,
    IsIsoYearMonthTime,
    IsoDateTime,
    IsUnion,
    UnionToTuple
} from "inferred-types/types";

type TupleMap<T extends readonly any[]> = {
  [K in keyof T]: IsIsoDateTime<T[K]>
};

/**
 * **IsIsoDateTime**`<T>`
 *
 * Boolean operator which test whether `T` is a valid ISO 8601
 * DateTime string.
 *
 * **Note:**
 * - if a type passes this test then it guaranteed to be a valid
 * ISO DateTime string
 * - in the type system you can't upgrade it to the "blessed"
 * branded type of `IsoDateTime` but if your runtime uses the
 * `isIsoDateTime()` type guard it will pass and be upgraded.
 */
export type IsIsoDateTime<T> = IsUnion<T> extends true
    ? TupleMap<UnionToTuple<T>>
: null extends T
? false
: T extends string
    ? string extends T
        ? boolean
        : T extends IsoDateTime<"branded">
            ? true
            : AsDateMeta<T> extends Error
                ? false
                : AsDateMeta<T> extends DateMeta
                    ? AsDateMeta<T>["dateType"] extends "datetime"
                        ? true
                        : false
                : false
    : false;

