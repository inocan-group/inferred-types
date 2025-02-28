import type { AsString, Iso3166_1_Alpha2, Iso3166_1_Alpha3, Iso3166_1_CountryCode, Iso3166_1_CountryName, Iso3166Alpha2Lookup, Iso3166Alpha3Lookup, Iso3166CodeLookup, Iso3166CountryLookup, NumberLike, Suggest } from "inferred-types/types";
import { ISO3166_1 } from "inferred-types/constants";
import { isIso3166Alpha2, isIso3166Alpha3, isIso3166CountryName, isNumber, isNumberLike, uppercase } from "inferred-types/runtime";

type Props = "alpha2" | "alpha3" | "countryCode" | "name";

function lookupAlpha2Code<
    T extends Iso3166_1_Alpha2,
    P extends Props,
>(code: T, prop: P): P extends "name"
    ? Iso3166_1_CountryName
    : P extends "alpha2"
        ? Iso3166_1_Alpha2
        : P extends "alpha3"
            ? Iso3166_1_Alpha3
            : P extends "countryCode"
                ? Iso3166_1_CountryCode
                : never {
    const found = ISO3166_1.find(i => i.alpha2 === code);

    return (
        found ? found[prop] : undefined
    ) as unknown as P extends "name"
        ? Iso3166_1_CountryName
        : P extends "alpha2"
            ? Iso3166_1_Alpha2
            : P extends "alpha3"
                ? Iso3166_1_Alpha3
                : P extends "countryCode"
                    ? Iso3166_1_CountryCode
                    : never;
}

function lookupAlpha3Code<P extends Props>(code: Iso3166_1_Alpha3, prop: P): P extends "name"
    ? Iso3166_1_CountryName
    : P extends "alpha2"
        ? Iso3166_1_Alpha2
        : P extends "alpha3"
            ? Iso3166_1_Alpha3
            : P extends "countryCode"
                ? Iso3166_1_CountryCode
                : never {
    const found = ISO3166_1.find(i => i.alpha3 === code);

    return (
        found ? found[prop] : undefined
    ) as unknown as P extends "name"
        ? Iso3166_1_CountryName
        : P extends "alpha2"
            ? Iso3166_1_Alpha2
            : P extends "alpha3"
                ? Iso3166_1_Alpha3
                : P extends "countryCode"
                    ? Iso3166_1_CountryCode
                    : never;
}

function lookupName<
    T extends Iso3166_1_CountryName,
    P extends Props,
>(name: T, prop: P): P extends "name"
    ? Iso3166_1_CountryName
    : P extends "alpha2"
        ? Iso3166_1_Alpha2
        : P extends "alpha3"
            ? Iso3166_1_Alpha3
            : P extends "countryCode"
                ? Iso3166_1_CountryCode
                : never {
    const found = ISO3166_1.find(i => i.name === name);

    return (
        found ? found[prop] : undefined
    ) as unknown as P extends "name"
        ? Iso3166_1_CountryName
        : P extends "alpha2"
            ? Iso3166_1_Alpha2
            : P extends "alpha3"
                ? Iso3166_1_Alpha3
                : P extends "countryCode"
                    ? Iso3166_1_CountryCode
                    : never;
}

function lookupNumericCode<
    T extends NumberLike,
    P extends Props,
>(code: T, prop: P): string | undefined {
    let num: string = isNumber(code) ? `${code}` : code as `${number}`;
    if (num.length === 1) {
        num = `00${num}`;
    }
    else if (num.length === 2) {
        num = `0${num}`;
    }

    const found = ISO3166_1.find(i => i.countryCode === num);

    return found ? found[prop] : undefined;
}

/**
 * **lookupCountryName**`(code)`
 *
 * Looks up a country name by either the alpha-2, alpha-3, or country code
 * as defined by the [ISO3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) standard.
 *
 * - the ISO standard uses uppercase characters for Alpha2 and Alpha3 codes but
 * this utility will handle upper or lowercase
 * - it will correctly type the country name if the code passed in is a literal
 * string (and a valid code)
 *
 * **Related:** `lookupCountryAlpha2()`, `lookupCountryAlpha3()`
 */
export function lookupCountryName<T extends Suggest<Iso3166_1_Alpha2 | Iso3166_1_Alpha3 | Iso3166_1_CountryCode>>(code: T) {
    const uc = uppercase(code);

    return (
        isNumberLike(code)
            ? lookupNumericCode(code, "name")
            : isIso3166Alpha2(uc)
                ? lookupAlpha2Code(uc, "name")
                : isIso3166Alpha3(uc)
                    ? lookupAlpha3Code(uc, "name")
                    : undefined
    ) as unknown as Iso3166CountryLookup<Uppercase<AsString<T>>>;
}

/**
 * Looks up the Alpha2 component of a [ISO3166-1](https://en.wikipedia.org/wiki/ISO_3166-1)
 * standard.
 */
export function lookupCountryAlpha2<
    T extends Suggest<Iso3166_1_Alpha3 |
    Iso3166_1_CountryCode |
    Iso3166_1_CountryName
    >,
>(code: T) {
    const uc = uppercase(code);

    return (
        isNumberLike(code)
            ? lookupNumericCode(code, "alpha2")
            : isIso3166Alpha2(uc)
                ? lookupAlpha2Code(uc, "alpha2")
                : isIso3166Alpha3(uc)
                    ? lookupAlpha3Code(uc, "alpha2")
                    : isIso3166CountryName(code)
                        ? lookupName(code, "alpha2")
                        : undefined
    ) as unknown as T extends Iso3166_1_CountryName
        ? Iso3166Alpha2Lookup<T>
        : Iso3166Alpha2Lookup<Uppercase<AsString<T>>>;
}

/**
 * Looks up the Alpha3 component of a [ISO3166-1](https://en.wikipedia.org/wiki/ISO_3166-1)
 * standard.
 */
export function lookupCountryAlpha3<
    T extends Suggest<
        Iso3166_1_Alpha2
        | Iso3166_1_CountryCode
        | Iso3166_1_CountryName
    >,
>(token: T) {
    const uc = uppercase(token);

    return (
        isNumberLike(token)
            ? lookupNumericCode(token, "alpha3")
            : isIso3166Alpha2(uc)
                ? lookupAlpha2Code(uc, "alpha3")
                : isIso3166Alpha3(uc)
                    ? lookupAlpha3Code(uc, "alpha3")
                    : isIso3166CountryName(token)
                        ? lookupName(token as any, "alpha3")
                        : undefined
    ) as unknown as T extends Iso3166_1_CountryName
        ? Iso3166Alpha3Lookup<T>
        : Iso3166Alpha3Lookup<Uppercase<AsString<T>>>;
}

/**
 * Looks up the Alpha3 component of a [ISO3166-1](https://en.wikipedia.org/wiki/ISO_3166-1)
 * standard.
 */
export function lookupCountryCode<
    T extends Suggest<
        Iso3166_1_Alpha2
        | Iso3166_1_Alpha3
        | Iso3166_1_CountryName
    >,
>(token: T) {
    const uc = uppercase(token);

    return (
        isNumberLike(token)
            ? lookupNumericCode(token, "countryCode")
            : isIso3166Alpha2(uc)
                ? lookupAlpha2Code(uc, "countryCode")
                : isIso3166Alpha3(uc)
                    ? lookupAlpha3Code(uc, "countryCode")
                    : isIso3166CountryName(token)
                        ? lookupName(token as any, "countryCode")
                        : undefined
    ) as unknown as T extends Iso3166_1_CountryName
        ? Iso3166CodeLookup<T>
        : Iso3166CodeLookup<Uppercase<AsString<T>>>;
}
