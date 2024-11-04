import { INDIAN_NEWS } from "inferred-types"
import { isString } from "../../isString"
import { IndianNewsUrls } from "src/types/string-literals"

const URL = INDIAN_NEWS.flatMap(i => i.baseUrls)

/**
 * type guard which validates that the passed in `val` is a Indian news URL
 */
export const isIndianNewsUrl = (val: unknown): val is IndianNewsUrls => {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  )
}
