import { Iso3166_1_Alpha2, Iso3166_1_Alpha3, Iso3166_1_CountryCode, Iso3166_1_CountryName } from "inferred-types/dist/types/index";
import { isString } from "../isString";
import { ISO3166_1 } from "inferred-types/dist/constants/index";

/**
 * Type guard which checks whether `val` is a 2 character country
 * representation found in the ISO3166-1 standard.
 */
export const isIso3166Alpha2 = (val: unknown): val is Iso3166_1_Alpha2 => {
  const codes = ISO3166_1.map(i => i["alpha2"]) as string[];
  return isString(val) && codes.includes(val);
}

/**
 * Type guard which checks whether `val` is a 2 character country
 * representation found in the ISO3166-1 standard.
 *
 * **Alias:** `isIso3166Alpha2`
 */
export const isCountryCode2 = (val: unknown): val is Iso3166_1_Alpha2 => {
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
 *
 * **Alias:** `isIso3166Alpha3`
 */
export const isCountryCode3 = (val: unknown): val is Iso3166_1_Alpha3 => {
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

/**
 * Type guard which checks whether `val` is a 2 or 3 character country
 * abbreviation found in the ISO3166-1 standard.
 */
export const isCountryAbbrev = (val: unknown): val is Iso3166_1_Alpha2 | Iso3166_1_Alpha3 => {
  return isCountryCode2(val) || isCountryCode3(val)
}

/**
 * Type guard which checks whether `val` is a valid ISO3166-1 country name.
 */
export const isIso3166CountryName = (val: unknown): val is Iso3166_1_CountryName => {
  const codes = ISO3166_1.map(i => i["name"]) as string[];
  return isString(val) && codes.includes(val);
}


/**
 * Type guard which checks whether `val` is a valid ISO3166-1 country name.
 *
 * **Alias:** `isIso3166CountryName`
 */
export const isCountryName = (val: unknown): val is Iso3166_1_CountryName => {
  const codes = ISO3166_1.map(i => i["name"]) as string[];
  return isString(val) && codes.includes(val);
}
