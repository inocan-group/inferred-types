import type { GetPhoneCountryCode, IsStringLiteral, Trim } from "inferred-types/types";

/**
 * **RemoveCountryCode**`<T,[TExplicitCountryCode]>`
 *
 * Removes the country code -- where present -- to reveal
 * just a country-based number.
 *
 * **Note:** there are two approaches this utility can take toward
 * removal of the country code:
 *
 * - the default relies on a space delimiter being present between
 * the country code and the remaining phone number; use this if
 * this is a reasonable assumption as it is more type performant.
 * - if you might have a string of numbers -- even possibly without
 * the `+` or `00` prefixes -- then you can set `TExplicitCountryCode`
 * to `true`
 *   - when set to true, it will still be able to extract _real_ country codes
 * from the string but if an _imagined_ country code has been entered it will
 * fail.
 *   - if it is an _imagined_ country code which does have a `+` or `00` prefix
 * then the type will be `ErrorCondition<"invalid-country-code">`
 *   - if no country code prefix then you'll likely get a
 * `ErrorCondition<"too-many-digits">` error (unless of course your have _other_
 * problems).
 */
export type RemovePhoneCountryCode<
  T,
> = T extends string
  ? IsStringLiteral<T> extends true
    ? GetPhoneCountryCode<Trim<T>> extends ""
      ? T
      : Trim<T> extends `+${GetPhoneCountryCode<Trim<T>>} ${infer Rest}`
        ? Rest
        : T
    : string
  : never;
