import { SOUTH_KOREAN_NEWS } from "inferred-types"
import { isString } from "../../isString"
import { SouthKoreanNewsUrls } from "src/types/string-literals"

const URL = SOUTH_KOREAN_NEWS.flatMap(i => i.baseUrls)

/**
 * type guard which validates that the passed in `val` is a South Korean news URL
 */
export const isSouthKoreanNewsUrl = (val: unknown): val is SouthKoreanNewsUrls => {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  )
}
