import { BELGIUM_NEWS } from "inferred-types/dist/constants/index"
import { isString } from "inferred-types/dist/runtime/index"
import { BelgianNewsUrls } from "inferred-types/dist/types/index"

const URL = BELGIUM_NEWS.flatMap(i => i.baseUrls)

/**
 * type guard which validates that the passed in `val` is a Belgium news URL
 */
export const isBelgiumNewsUrl = (val: unknown): val is BelgianNewsUrls => {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  )
}
