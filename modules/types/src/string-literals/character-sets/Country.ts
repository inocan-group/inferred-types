import type { ISO3166_1 } from "inferred-types/constants";
import type { AfterFirst, First, If, IsEqual, IsStringLiteral } from "inferred-types/types";

export type Iso3166_1_Lookup = typeof ISO3166_1;

type Props = "alpha2" | "alpha3" | "countryCode" | "name";

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
 * **Iso3166_1_Alpha3**
 *
 * A union of all 2 character country codes defined by the ISO3166-1
 * standard.
 */
export type Iso3166_1_CountryName = {
  [K in keyof Iso3166_1_Lookup]: "name" extends keyof Iso3166_1_Lookup[K]
    ? Iso3166_1_Lookup[K]["name"]
    : never
}[number];

/**
 * Any identifying aspect of an ISO3166-1 country (alpha2, alpha3, code, name)
 */
export type Iso3166_1_Token = Iso3166_1_Alpha2 | Iso3166_1_Alpha3 | Iso3166_1_CountryCode | Iso3166_1_CountryName;

type LookupAlpha2<
  T extends Iso3166_1_Alpha2,
  Lookup extends readonly { name: string; alpha2: string; alpha3: string; countryCode: string }[],
  Prop extends Props,
> = [] extends Lookup
  ? undefined
  : T extends First<Lookup>["alpha2"]
    ? First<Lookup>[`${Prop}`]
    : LookupAlpha2<
      T,
      AfterFirst<Lookup>,
      Prop
    >;

type LookupAlpha3<
  T extends Iso3166_1_Alpha3,
  Lookup extends readonly { name: string; alpha2: string; alpha3: string; countryCode: string }[],
  Prop extends Props,
> = [] extends Lookup
  ? undefined
  : T extends First<Lookup>["alpha3"]
    ? First<Lookup>[`${Prop}`]
    : LookupAlpha3<
      T,
      AfterFirst<Lookup>,
      Prop
    >;

type LookupCountryCode<
  T extends Iso3166_1_CountryCode,
  Lookup extends readonly { name: string; alpha2: string; alpha3: string; countryCode: string }[],
  Prop extends Props,
> = [] extends Lookup
  ? undefined
  : T extends First<Lookup>["countryCode"]
    ? First<Lookup>[`${Prop}`]
    : LookupCountryCode<
      T,
      AfterFirst<Lookup>,
      Prop
    >;

type LookupCountryName<
  T extends Iso3166_1_CountryName,
  Lookup extends readonly { name: string; alpha2: string; alpha3: string; countryCode: string }[],
  Prop extends Props,
> = [] extends Lookup
  ? undefined
  : T extends First<Lookup>["name"]
    ? First<Lookup>[`${Prop}`]
    : LookupCountryName<
      T,
      AfterFirst<Lookup>,
      Prop
    >;

/**
 * **Iso3166Country**`<T>`
 *
 * Provides the ISO3166-1 **country name** if provided a valid lookup value (
 * aka, a alpha-2, alpha-3, or country code). If not valid returns _undefined_.
 */
export type Iso3166CountryLookup<T> = T extends number
  ? Iso3166CountryLookup<`${T}`>
  : T extends string
    ? IsStringLiteral<T> extends true
      ? T extends Iso3166_1_Alpha2
        ? LookupAlpha2<T, Iso3166_1_Lookup, "name">
        : T extends Iso3166_1_Alpha3
          ? LookupAlpha3<T, Iso3166_1_Lookup, "name">
          : T extends Iso3166_1_CountryCode
            ? LookupCountryCode<T, Iso3166_1_Lookup, "name">
            : T extends Iso3166_1_CountryName
              ? LookupCountryName<T, Iso3166_1_Lookup, "name">
              : IsStringLiteral<T> extends true
                ? undefined
                : If<IsEqual<T, string>, Iso3166_1_CountryCode | undefined, undefined>
      : undefined
    : undefined;

/**
 * **Iso3166Alpha2Lookup**`<T>`
 *
 * Provides the ISO3166-1 **Alpha 2** code if provided a valid lookup value (
 * aka, a alpha-3, country code, or country name). If not valid returns _undefined_.
 */
export type Iso3166Alpha2Lookup<T> = T extends number
  ? Iso3166CountryLookup<`${T}`>
  : T extends string
    ? IsStringLiteral<T> extends true
      ? T extends Iso3166_1_Alpha2
        ? LookupAlpha2<T, Iso3166_1_Lookup, "alpha2">
        : T extends Iso3166_1_Alpha3
          ? LookupAlpha3<T, Iso3166_1_Lookup, "alpha2">
          : T extends Iso3166_1_CountryCode
            ? LookupCountryCode<T, Iso3166_1_Lookup, "alpha2">
            : T extends Iso3166_1_CountryName
              ? LookupCountryName<T, Iso3166_1_Lookup, "alpha2">
              : IsStringLiteral<T> extends true
                ? undefined
                : If<IsEqual<T, string>, Iso3166_1_Alpha2 | undefined, undefined>
      : undefined
    : undefined;

/**
 * **Iso3166Alpha33Lookup**`<T>`
 *
 * Provides the ISO3166-1 **Alpha 3** code if provided a valid lookup value (
 * aka, a alpha-3, country code, or country name). If not valid returns _undefined_.
 */
export type Iso3166Alpha3Lookup<T> = T extends number
  ? Iso3166CountryLookup<`${T}`>
  : T extends string
    ? IsStringLiteral<T> extends true
      ? T extends Iso3166_1_Alpha2
        ? LookupAlpha2<T, Iso3166_1_Lookup, "alpha3">
        : T extends Iso3166_1_Alpha3
          ? LookupAlpha3<T, Iso3166_1_Lookup, "alpha3">
          : T extends Iso3166_1_CountryCode
            ? LookupCountryCode<T, Iso3166_1_Lookup, "alpha3">
            : T extends Iso3166_1_CountryName
              ? LookupCountryName<T, Iso3166_1_Lookup, "alpha3">
              : IsStringLiteral<T> extends true
                ? undefined
                : If<IsEqual<T, string>, Iso3166_1_Alpha3 | undefined, undefined>
      : undefined
    : undefined;

/**
 * **Iso3166Alpha33Lookup**`<T>`
 *
 * Provides the ISO3166-1 **Alpha 3** code if provided a valid lookup value (
 * aka, a alpha-3, country code, or country name). If not valid returns _undefined_.
 */
export type Iso3166CodeLookup<T> = T extends number
  ? Iso3166CountryLookup<`${T}`>
  : T extends string
    ? IsStringLiteral<T> extends true
      ? T extends Iso3166_1_Alpha2
        ? LookupAlpha2<T, Iso3166_1_Lookup, "countryCode">
        : T extends Iso3166_1_Alpha3
          ? LookupAlpha3<T, Iso3166_1_Lookup, "countryCode">
          : T extends Iso3166_1_CountryCode
            ? LookupCountryCode<T, Iso3166_1_Lookup, "countryCode">
            : T extends Iso3166_1_CountryName
              ? LookupCountryName<T, Iso3166_1_Lookup, "countryCode">
              : IsStringLiteral<T> extends true
                ? undefined
                : If<IsEqual<T, string>, Iso3166_1_CountryCode | undefined, undefined>
      : undefined
    : undefined;
