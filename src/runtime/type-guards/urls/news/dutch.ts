import { DUTCH_NEWS } from "inferred-types"
import { isString } from "../../isString"
import { DutchNewsUrls } from "src/types/string-literals"


const URL = DUTCH_NEWS.flatMap(i => i.baseUrls)

/**
 * type guard which validates that the passed in `val` is a Dutch news URL
 */
export const isDutchNewsUrl = (val: unknown): val is DutchNewsUrls => {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  )
}
