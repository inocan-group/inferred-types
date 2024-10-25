import { TURKISH_NEWS } from "src/constants/index"
import { isString } from "../../isString"
import { TurkishNewsUrls } from "src/types/string-literals"

const URL = TURKISH_NEWS.flatMap(i => i.baseUrls)

/**
 * type guard which validates that the passed in `val` is a Turkish news URL
 */
export const isTurkishNewsUrl = (val: unknown): val is TurkishNewsUrls => {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  )
}
