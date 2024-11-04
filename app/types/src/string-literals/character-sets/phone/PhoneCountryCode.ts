import { PHONE_COUNTRY_CODES } from "inferred-types";
import { FirstOfEach } from "src/types/tuples";
import { Mutable } from "src/types/type-conversion";

export type PhoneCountryLookup = Mutable<[...typeof PHONE_COUNTRY_CODES]>;

/**
 * **PhoneCountryCode**
 *
 * The official list of _phone_ country codes
 *
 * **Related:** `DialCountryCode`
 */
export type PhoneCountryCode = FirstOfEach<PhoneCountryLookup>;
