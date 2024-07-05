
import {
  IsStringLiteral,
  PhoneNumberDelimiter,
  RetainUntil,
  StartsWith,
  Trim
} from "src/types/index"

/**
 * GetPhoneCountryCode`<T>`
 *
 * Attempts to find a country code signature in a phone number.
 *
 * - it returns the country code without the leading `+` or `00` prefix
 * - if there is no delimiter or prefix for the country code then, then it
 * will use a _real_ list of country codes to try to extract this value
 * - if not found it returns an empty string (`""`)
 * - if `T` is a _wide_ string string then this will return `string` back
 */
export type GetPhoneCountryCode<T> = T extends string
? [IsStringLiteral<T>] extends [true]
    ? StartsWith<Trim<T>, "+" | "00"> extends true
      ? [Trim<T>] extends [`${"+" | "00"}${infer CC}${PhoneNumberDelimiter}${string}`]
        ? RetainUntil<CC, " ">
        : ""
      : ""
    : string
: never;
