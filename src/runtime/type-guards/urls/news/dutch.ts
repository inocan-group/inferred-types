import { DUTCH_NEWS } from "inferred-types/dist/constants/index"
import { isString } from "inferred-types/dist/runtime/index"
import { DutchNewsUrls } from "inferred-types/dist/types/index"


const URL = DUTCH_NEWS.flatMap(i => i.baseUrls)

/**
 * type guard which validates that the passed in `val` is a Dutch news URL
 */
export const isDutchNewsUrl = (val: unknown): val is DutchNewsUrls => {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  )
}
