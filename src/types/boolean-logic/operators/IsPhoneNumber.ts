import { GetPhoneCountryCode, IsNever, IsTrue, PhoneCountryCode, PhoneNumber, Trim } from "../..";
import { IsStringLiteral } from "./IsStringLiteral";


/**
 * **IsPhoneNumber**`<T>`
 *
 * Boolean operator which tests whether `T` has a
 * type that supports it being a phone number.
 *
 * **Related:** `PhoneNumber`, `HasPhoneCountryCode`
 */
export type IsPhoneNumber<T> = T extends string
? IsStringLiteral<T> extends true
  ? IsNever<PhoneNumber<T>> extends true
    ? false
    : true
: boolean
: false;


/**
 * **HasPhoneCountryCode**`<T>`
 *
 * Boolean operator which validates whether the passed in `T` has a country code leading it (ignoring any leading
 * whitespace):
 *
 * - by default, the country code is not only parsed out of the phone number but also validated against an world
 * wide index of valid country codes
 * - if you want to just validate that user _attempted_ to express a country code then you can change the check by
 * setting `TExplicit` to **false**.
 *
 * **Related:** `IsPhoneNumber`, `PhoneNumber`
 */
export type HasPhoneCountryCode<
  TPhone,
  TExplicit extends boolean = true
> = TPhone extends string
? IsStringLiteral<TPhone> extends true
    ? IsTrue<TExplicit> extends true
      ? GetPhoneCountryCode<TPhone> extends PhoneCountryCode
        ? true
        : false
      : GetPhoneCountryCode<TPhone> extends ""
        ? false
        : true
: boolean
: false;

