import type { SouthKoreanNewsUrls } from "inferred-types/types";
import { SOUTH_KOREAN_NEWS } from "inferred-types/constants";
import { isString } from "inferred-types/runtime";

const URL = SOUTH_KOREAN_NEWS.flatMap(i => i.baseUrls);

/**
 * type guard which validates that the passed in `val` is a South Korean news URL
 */
export function isSouthKoreanNewsUrl(val: unknown): val is SouthKoreanNewsUrls {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  );
}
