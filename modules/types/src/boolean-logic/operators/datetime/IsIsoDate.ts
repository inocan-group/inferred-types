import type {
    EmptyObject,
    Every,
    IsAny,
    IsEqual,
    IsIsoFullDate,
    IsIsoMonthDate,
    IsIsoYear,
    IsIsoYearMonth,
    IsNever,
    IsNull,
    IsUnion,
    IsUnknown,
    Some,
    UnionToTuple
} from "inferred-types/types";

type Member<
    T extends readonly unknown[]
> = {
    [K in keyof T]: IsIsoDate<T[K]>
};

/**
 * **IsIsoDate**`<T>`
 *
 * Boolean operator which returns `true` when `T` is a valid ISO 8601 date string of the
 * format:
 *
 *  - `YYYY-MM-DD`,
 *  - `--MM-DD` or `--MMDD` - _for year-independent dates_
 *  - `-YYYY-DD` or `-YYYYDD` - _for year-month resolution with specific date_
 *
 * **Note:** this _does not_ match on DateTime combinations; use `IsIsoDateTime`
 * for that.
 */
export type IsIsoDate<T> = [IsNever<T>] extends [true]
    ? false
    : [IsAny<T>] extends [true]
        ? boolean
        : [IsUnknown<T>] extends [true]
            ? boolean
            : [IsNull<T>] extends [true]
                ? false
                : [IsEqual<T, EmptyObject>] extends [true]
                    ? false
                    : [string] extends [T]
                        ? boolean
                        : [IsUnion<T>] extends [true]
                            ? [Every<Member<UnionToTuple<T>>, "equals", true>] extends [true]
                                ? true
                                : [Some<Member<UnionToTuple<T>>, "equals", true>] extends [true]
                                    ? boolean
                                    : false
                            : [IsIsoFullDate<T>] extends [true]
                                ? true
                                : [IsIsoYearMonth<T>] extends [true]
                                    ? true
                                    : [IsIsoMonthDate<T>] extends [true]
                                        ? true
                                        : [IsIsoYear<T>] extends [true]
                                            ? true
                                            : false;
