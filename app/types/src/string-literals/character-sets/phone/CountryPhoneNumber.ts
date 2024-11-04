import {
  LocalPhoneNumber,
  PhoneAreaCode,
  PhoneNumberDelimiter
} from "src/types/index";



/**
 * **CountryPhoneNumber**`<[TDelimiter]>`
 *
 * Provides a shape phone number meant for use within a country. It includes
 * the local number plus what would be referred to as the "area code" in the
 * USA.
 *
 * **Related:** `InternationalPhoneNumber`, `LocalPhoneNumber`, `PhoneNumber`
 */
export type CountryPhoneNumber<
  TDelimiter extends PhoneNumberDelimiter = PhoneNumberDelimiter
> = `${PhoneAreaCode}${TDelimiter}${LocalPhoneNumber<TDelimiter>}`
