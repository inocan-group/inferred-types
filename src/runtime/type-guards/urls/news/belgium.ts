import { BELGIUM_NEWS } from "inferred-types/constants"
import { isString } from "inferred-types/runtime"
import { BelgianNewsUrls } from "inferred-types/types"

const URL = BELGIUM_NEWS.flatMap(i => i.baseUrls)

/**
 * type guard which validates that the passed in `val` is a Belgium news URL
 */
export const isBelgiumNewsUrl = (val: unknown): val is BelgianNewsUrls => {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  )
}
