import { Iso3166_1_Alpha2, Iso3166_1_Alpha3, Iso3166_1_CountryCode } from "src/types/index";
import { isString } from "../isString";
import { ISO3166_1 } from "src/constants/ISO3166";

/**
 * Type guard which checks whether `val` is a 2 character country
 * representation found in the ISO3166-1 standard.
 */
export const isIso3166Alpha2 = (val: unknown): val is Iso3166_1_Alpha2 => {
  const codes = ISO3166_1.map(i => i["alpha2"]) as string[];
  return isString(val) && codes.includes(val);
}

/**
 * Type guard which checks whether `val` is a 3 character country
 * representation found in the ISO3166-1 standard.
 */
export const isIso3166Alpha3 = (val: unknown): val is Iso3166_1_Alpha3 => {
  const codes = ISO3166_1.map(i => i["alpha3"]) as string[];
  return isString(val) && codes.includes(val);
}

/**
 * Type guard which checks whether `val` is a 3 character country
 * representation found in the ISO3166-1 standard.
 */
export const isIso3166CountryCode = (val: unknown): val is Iso3166_1_CountryCode => {
  const codes = ISO3166_1.map(i => i["countryCode"]) as string[];
  return isString(val) && codes.includes(val);
}
