import type { PHONE_COUNTRY_CODES } from "inferred-types/constants";
import type { FirstOfEach, Mutable } from "inferred-types/types";

export type PhoneCountryLookup = Mutable<[...typeof PHONE_COUNTRY_CODES]>;

/**
 * **PhoneCountryCode**
 *
 * The official list of _phone_ country codes
 *
 * **Related:** `DialCountryCode`
 */
export type PhoneCountryCode = FirstOfEach<PhoneCountryLookup>;
