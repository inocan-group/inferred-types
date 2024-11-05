import { JAPANESE_NEWS } from "inferred-types/dist/constants/index"
import { isString } from "inferred-types/dist/runtime/index"
import { JapaneseNewsUrls } from "inferred-types/dist/types/index"

const URL = JAPANESE_NEWS.flatMap(i => i.baseUrls)

/**
 * type guard which validates that the passed in `val` is a Japanese news URL
 */
export const isJapaneseNewsUrl = (val: unknown): val is JapaneseNewsUrls => {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  )
}
