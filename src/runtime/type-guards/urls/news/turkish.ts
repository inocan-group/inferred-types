import { TURKISH_NEWS } from "inferred-types/dist/constants/index"
import { isString } from "inferred-types/dist/runtime/index"
import { TurkishNewsUrls } from "inferred-types/dist/types/index"

const URL = TURKISH_NEWS.flatMap(i => i.baseUrls)

/**
 * type guard which validates that the passed in `val` is a Turkish news URL
 */
export const isTurkishNewsUrl = (val: unknown): val is TurkishNewsUrls => {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  )
}
