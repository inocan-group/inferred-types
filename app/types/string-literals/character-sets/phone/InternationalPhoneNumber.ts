import {
  CountryPhoneNumber,
  DialCountryCode,
  PhoneNumberDelimiter
} from "src/types/index"

/**
 * **InternationalPhoneNumber**`<[TDelimiter]>`
 *
 * A phone number which explicitly leads by expressing the _country_ that the number belongs to.
 *
 * - uses `+` or `00` prefix to mark as a country code
 *
 * **Related:** `CountryPhoneNumber`, `LocalPhoneNumber`, `PhoneNumber`
 */
export type InternationalPhoneNumber<
  TDelimiter extends PhoneNumberDelimiter = PhoneNumberDelimiter
> = `${DialCountryCode}${TDelimiter}${CountryPhoneNumber<TDelimiter>}`;

