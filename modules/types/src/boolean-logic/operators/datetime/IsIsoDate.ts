import type {
  IsEqual,
  NumericChar,
  NumericCharZeroToThree,
  NumericCharZeroToTwo,
  Slice,
} from "inferred-types/types";

type YMD<T> = T extends `${number}-${number}-${number}`
  ? T extends `${infer Year}-${infer Month}-${infer Day}`
    ? [Year, Month, Day]
    : never
  : T extends `${number}`
    ? [Slice<T, 0, 4>, Slice<T, 4, 2>, Slice<T, 6, 2>]
    : never;

type Validate<T> = T extends readonly [string, string, string]
  ? T[0] extends `${NumericChar}${NumericChar}${NumericChar}${NumericChar}`
    ? T[1] extends `${NumericCharZeroToTwo}${NumericChar}`
      ? T[2] extends `${NumericCharZeroToThree}${NumericChar}`
        ? true
        : false
      : false
    : false
  : false;

/**
 * **IsIsoExplicitDate**`<T>`
 *
 * Boolean operator which returns `true` when `T` is an explicit date string of the
 * format `YYYY-MM-DD`.
 */
export type IsIsoExplicitDate<T> = IsEqual<T, string> extends true
  ? boolean
  : T extends `${number}-${number}-${number}`
    ? Validate<YMD<T>> extends true
      ? true
      : false
    : false;

/**
 * **IsIsoImplicitDate**`<T>`
 *
 * Boolean operator which returns `true` when `T` is an _impplicit_ date string of the
 * format `YYYYMMDD`.
 */
export type IsIsoImplicitDate<T> = IsEqual<T, string> extends true
  ? boolean
  : T extends `${number}`
    ? Validate<YMD<T>> extends true
      ? true
      : false
    : false;

/**
 * **IsIsoDate**`<T>`
 *
 * Boolean operator which returns `true` when `T` is a valid ISO 8601 date string of the
 * format `YYYYMMDD` or `YYYY-MM-DD`.
 */
export type IsIsoDate<T> = IsEqual<T, string> extends true
  ? boolean
  : IsIsoExplicitDate<T> extends true
    ? true
    : IsIsoImplicitDate<T> extends true
      ? true
      : false;
