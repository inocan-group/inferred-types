import type { NewsUrls } from "inferred-types/types";
import {
  isAustralianNewsUrl,
  isBelgiumNewsUrl,
  isCanadianNewsUrl,
  isDanishNewsUrl,
  isDutchNewsUrl,
  isFrenchNewsUrl,
  isGermanNewsUrl,
  isIndianNewsUrl,
  isItalianNewsUrl,
  isJapaneseNewsUrl,
  isMexicanNewsUrl,
  isNorwegianNewsUrl,
  isSouthKoreanNewsUrl,
  isSpanishNewsUrl,
  isSwissNewsUrl,
  isTurkishNewsUrl,
  isUkNewsUrl,
  isUsNewsUrl,
} from "runtime/type-guards";
/**
 * Type guard which identifies whether the `val` passed in is a URL pointing to a leading
 * worldwide news organization.
 *
 * **Note:** _there is no way to make this all inclusive so we've simply added the most popular
 * new organizations for most countries in western EU, North America, and have added notables such
 * as China, India, Japan, South Korea, and Australia as well._
 */
export function isNewsUrl(val: unknown): val is NewsUrls {
    return isAustralianNewsUrl(val) || isBelgiumNewsUrl(val) || isCanadianNewsUrl(val) || isDanishNewsUrl(val) || isDutchNewsUrl(val) || isFrenchNewsUrl(val) || isGermanNewsUrl(val) || isIndianNewsUrl(val) || isItalianNewsUrl(val) || isJapaneseNewsUrl(val) || isMexicanNewsUrl(val) || isNorwegianNewsUrl(val) || isSouthKoreanNewsUrl(val) || isSpanishNewsUrl(val) || isSwissNewsUrl(val) || isTurkishNewsUrl(val) || isUkNewsUrl(val) || isUsNewsUrl(val);
}
