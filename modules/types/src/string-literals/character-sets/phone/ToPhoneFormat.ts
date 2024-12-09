import type {
  PHONE_FORMAT,
} from "inferred-types/constants";

import type {
  ErrorCondition,
  GetPhoneCountryCode,
  GetPhoneNumberType,
  HasPhoneCountryCode,
  IsStringLiteral,
  PhoneNumber,
} from "inferred-types/types";

/**
 * **PhoneFormat**
 *
 * A union type of _formats_ used for telephone numbers
 */
export type PhoneFormat = typeof PHONE_FORMAT[number];

type FormatLookup<T extends string> = {
  "Dashed (e.g., 456-555-1212)": HasPhoneCountryCode<T> extends true
    ? `+${GetPhoneCountryCode<T>} ${number}-${number}-${number}`
    : GetPhoneNumberType<T> extends "regional"
      ? `${number}-${number}`
      : `${number}-${number}-${number}`;
  "Dotted (e.g., 456.555.1212)": HasPhoneCountryCode<T> extends true
    ? `+${GetPhoneCountryCode<T>} ${number}.${number}.${number}`
    : GetPhoneNumberType<T> extends "regional"
      ? `${number}.${number}`
      : `${number}.${number}-${number}`;
  "ParaSpaced (e.g., (456) 555 1212)": "";
  "ParaDashed (e.g., (456) 555-1212)": "";
} & Record<PhoneFormat, any>;

export type ToPhoneFormat<
  TPhone extends string,
  TFormat extends PhoneFormat,
> = IsStringLiteral<TPhone> extends true
  ? PhoneNumber<TPhone> extends string
    ? FormatLookup<TPhone>[TFormat]
    : PhoneNumber<TPhone>
  : FormatLookup<TPhone>[TFormat] | ErrorCondition<"invalid-phone-number">;
