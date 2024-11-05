import { SOUTH_KOREAN_NEWS } from "inferred-types/dist/constants/index"
import { isString } from "inferred-types/dist/runtime/index"
import { SouthKoreanNewsUrls } from "inferred-types/dist/types/index"

const URL = SOUTH_KOREAN_NEWS.flatMap(i => i.baseUrls)

/**
 * type guard which validates that the passed in `val` is a South Korean news URL
 */
export const isSouthKoreanNewsUrl = (val: unknown): val is SouthKoreanNewsUrls => {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  )
}
