import { NumericString } from "../alphabetic/alpha-characters";

/**
 * An email address
 */
export type Email = `${string}@${string}.${string}`;


type Zip5 = `${NumericString}${NumericString}${string}${NumericString}`;
type Zip4 = `${NumericString}${string}`;

/**
 * A relatively strong type for Zip5 or Zip5+4 zip codes
 */
export type ZipCode = Zip5 | `${Zip5}-${Zip4}`;