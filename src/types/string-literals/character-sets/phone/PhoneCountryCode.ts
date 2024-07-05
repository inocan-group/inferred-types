import { PHONE_COUNTRY_CODES } from "src/constants/index";


/**
 * **PhoneCountryCode**
 *
 * The official list of _phone_ country codes
 *
 * **Related:** `DialCountryCode`
 */
export type PhoneCountryCode = typeof PHONE_COUNTRY_CODES[number];
