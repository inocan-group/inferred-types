import { Iso3166_1 } from "src/types/index";
import { isString } from "../isString";
import { ISO3166_1 } from "src/constants/ISO3166";

/**
 * Type guard which checks whether `val` is a 2 character country
 * representation found in the ISO3166-1 standard.
 */
export const isIso3166Alpha2 = (val: unknown): val is Iso3166_1 => {
  const codes = ISO3166_1.map(i => i["alpha-2"]) as string[];
  return isString(val) && codes.includes(val);
}
