import type { NewsUrls } from "inferred-types/types";
import { isAustralianNewsUrl } from "./australian";
import { isBelgiumNewsUrl } from "./belgium";
import { isCanadianNewsUrl } from "./canadian";
import { isDanishNewsUrl } from "./danish";
import { isDutchNewsUrl } from "./dutch";
import { isFrenchNewsUrl } from "./french";
import { isGermanNewsUrl } from "./german";
import { isIndianNewsUrl } from "./indian";
import { isItalianNewsUrl } from "./italian";
import { isJapaneseNewsUrl } from "./japanese";
import { isMexicanNewsUrl } from "./mexican";
import { isNorwegianNewsUrl } from "./norwegian";
import { isSouthKoreanNewsUrl } from "./south-korean";
import { isSpanishNewsUrl } from "./spanish";
import { isSwissNewsUrl } from "./swiss";
import { isTurkishNewsUrl } from "./turkish";
import { isUkNewsUrl } from "./uk";
import { isUsNewsUrl } from "./us";
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
