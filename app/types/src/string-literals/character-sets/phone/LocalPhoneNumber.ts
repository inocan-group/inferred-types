import { NumericChar, PhoneNumberDelimiter } from "src/types/index"

/**
 * **LocalPhoneNumber**`<[TDelimiter]>`
 *
 * Provides a shape for phone numbers local a region of country that do
 * not have a _country code_ designation nor what is referred to as the
 * "area code" in the USA.
 *
 * **Related:** `CountryPhoneNumber`, `InternationalPhoneNumber`, `PhoneNumber`
 */
export type LocalPhoneNumber<
TDelimiter extends PhoneNumberDelimiter = PhoneNumberDelimiter
> = `${NumericChar}${number}${TDelimiter}${number}`;
