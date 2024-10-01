import { ISO3166_1 } from "src/constants/index";
import {  If, IsEqual, IsStringLiteral } from "src/types/boolean-logic";
import { AfterFirst, First } from "src/types/lists";


export type Iso3166_1_Lookup = typeof ISO3166_1;

/**
 * **Iso3166_1_Alpha2**
 *
 * A union of all 2 character country codes defined by the ISO3166-1
 * standard.
 */
export type Iso3166_1_Alpha2 = {
  [K in keyof Iso3166_1_Lookup]: "alpha2" extends keyof Iso3166_1_Lookup[K]
    ? Iso3166_1_Lookup[K]["alpha2"]
    : never
}[number];

/**
 * **Iso3166_1_Alpha3**
 *
 * A union of all 2 character country codes defined by the ISO3166-1
 * standard.
 */
export type Iso3166_1_Alpha3 = {
  [K in keyof Iso3166_1_Lookup]: "alpha3" extends keyof Iso3166_1_Lookup[K]
    ? Iso3166_1_Lookup[K]["alpha3"]
    : never
}[number];


/**
 * **Iso3166_1_Alpha3**
 *
 * A union of all 2 character country codes defined by the ISO3166-1
 * standard.
 */
export type Iso3166_1_CountryCode = {
  [K in keyof Iso3166_1_Lookup]: "countryCode" extends keyof Iso3166_1_Lookup[K]
    ? Iso3166_1_Lookup[K]["countryCode"]
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

type LookupAlpha2<
  T extends Iso3166_1_Alpha2,
  Lookup extends readonly { name: string; alpha2: string; alpha3: string; countryCode: string }[],
  Match extends Iso3166_1_CountryCode | undefined = undefined
> = [] extends Lookup
? Match
: T extends First<Lookup>["alpha2"]
    ? First<Lookup>["name"]
    : LookupAlpha2<
        T,
        AfterFirst<Lookup>,
        Match
      >;


type LookupAlpha3<
  T extends Iso3166_1_Alpha3,
  Lookup extends readonly { name: string; alpha2: string; alpha3: string; countryCode: string }[],
  Match extends Iso3166_1_CountryCode | undefined = undefined
> = [] extends Lookup
? Match
: T extends First<Lookup>["alpha3"]
    ? First<Lookup>["name"]
    : LookupAlpha3<
        T,
        AfterFirst<Lookup>,
        Match
      >;

type LookupCountryCode<
  T extends Iso3166_1_CountryCode,
  Lookup extends readonly { name: string; alpha2: string; alpha3: string; countryCode: string }[],
  Match extends Iso3166_1_CountryCode | undefined = undefined
> = [] extends Lookup
? Match
: T extends First<Lookup>["countryCode"]
    ? First<Lookup>["name"]
    : LookupCountryCode<
        T,
        AfterFirst<Lookup>,
        Match
      >;

/**
 * **Iso3166Country**`<T>`
 *
 * Provides the ISO3166-1 **country name** if provided a valid lookup value (
 * aka, a alpha-2, alpha-3, or country code). If not valid returns _undefined_.
 */
export type Iso3166Country<T> = T extends number
? Iso3166Country<`${T}`>
: T extends string
  ? IsStringLiteral<T> extends true
  ? T extends Iso3166_1_Alpha2
    ? LookupAlpha2<T, Iso3166_1_Lookup>
    : T extends Iso3166_1_Alpha3
    ? LookupAlpha3<T, Iso3166_1_Lookup>
    : T extends Iso3166_1_CountryCode
    ? LookupCountryCode<T, Iso3166_1_Lookup>
    : IsStringLiteral<T> extends true
    ? undefined
    : If<IsEqual<T, string>, Iso3166_1_CountryCode | undefined, undefined>
: undefined
: undefined;
