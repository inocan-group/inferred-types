import { NumberLike } from "src/types/numeric-literals";
import { Iso3166_1_Alpha2, Iso3166_1_Alpha3, Iso3166_1_CountryCode, Iso3166Country, Suggest } from "src/types/string-literals";
import { isIso3166Alpha2, isIso3166Alpha3, isNumber, isNumberLike } from "../type-guards";
import { ISO3166_1 } from "src/constants/ISO3166";
import { AsString } from "src/types/type-conversion";
import { uppercase } from "../literals";

const lookupAlpha2Code = (code: Iso3166_1_Alpha2): Iso3166_1_CountryCode => {

  return ISO3166_1.find(i => i["alpha2"]=== code)?.name as Iso3166_1_CountryCode;
}

const lookupAlpha3Code = (code: Iso3166_1_Alpha3): Iso3166_1_CountryCode => {

  return ISO3166_1.find(i => i["alpha3"]=== code)?.name as Iso3166_1_CountryCode;
}

const lookupNumericCode = (code: NumberLike): string | undefined => {
  let num: string = isNumber(code) ? `${code}` : code;
  if (num.length === 1) {
    num = `00${num}`
  } else if (num.length === 2) {
    num = `0${num}`;
  }

  return ISO3166_1.find(i => i["countryCode"] === num)?.name;
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
 */
export const lookupCountryName = <T extends Suggest<Iso3166_1_Alpha2 | Iso3166_1_Alpha3 | Iso3166_1_CountryCode>>(
  code: T
) => {
  const uc = uppercase(code);

  return (
    isNumberLike(code)
    ? lookupNumericCode(code)
    : isIso3166Alpha2(uc)
      ? lookupAlpha2Code(uc)
      : isIso3166Alpha3(uc)
      ? lookupAlpha3Code(uc)
      : undefined
  ) as unknown as Iso3166Country<Uppercase<AsString<T>>>;
}
