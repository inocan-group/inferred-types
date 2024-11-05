import { PHONE_COUNTRY_CODES } from "inferred-types/dist/constants/index";
import { FirstOfEach } from "src/types/tuples";
import { Mutable } from"inferred-types/dist/types/index";

export type PhoneCountryLookup = Mutable<[...typeof PHONE_COUNTRY_CODES]>;

/**
 * **PhoneCountryCode**
 *
 * The official list of _phone_ country codes
 *
 * **Related:** `DialCountryCode`
 */
export type PhoneCountryCode = FirstOfEach<PhoneCountryLookup>;
