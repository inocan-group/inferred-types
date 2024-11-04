import {
  HasPhoneCountryCode,
  IsLessThan,
  IsStringLiteral,
  NumericChar,
  RetainChars,
  StrLen,
  Trim
} from "@inferred-types/types";


export type PhoneNumberType = "international" | "country" | "regional" | "short-code";

/**
 * **GetPhoneNumberType**`<T>`
 *
 * Indicates whether the phone number is "international", "country", or "regional"
 * based on the shape and number of digits
 */
export type GetPhoneNumberType<T> = T extends string
? IsStringLiteral<T> extends true
  ? HasPhoneCountryCode<T,false> extends true
    ? "international"
    : IsLessThan<
        StrLen<
          RetainChars<Trim<`${T}`>,
          NumericChar
        >>,
        8
      > extends true
        ? StrLen<
            RetainChars<Trim<`${T}`>,
            NumericChar
          >> extends 7
          ? "regional"
          : "short-code"
        : "country"
: string
: never;
