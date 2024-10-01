import { ISO3166_1 } from "src/constants/index";

export type Iso3166_1_Lookup = typeof ISO3166_1;

/**
 * **Iso3166_1**
 *
 * A union of all 2 character country codes defined by the ISO3166-1
 * standard.
 */
export type Iso3166_1 = {
  [K in keyof Iso3166_1_Lookup]: "alpha-2" extends keyof Iso3166_1_Lookup[K]
    ? Iso3166_1_Lookup[K]["alpha-2"]
    : never
}[number];

/**
 * **CountryName**
 *
 * A union of all country names found in the ISO3166-1 standard.
 */
export type CountryName = {
  [K in keyof Iso3166_1_Lookup]: "name" extends keyof Iso3166_1_Lookup[K]
    ? Iso3166_1_Lookup[K]["name"]
    : never
}[number];
