import { AUSTRALIAN_NEWS } from "inferred-types/dist/constants/index"
import { isString } from "inferred-types/dist/runtime/index"
import { AustralianNewsUrls } from "inferred-types/dist/types/index"

const URL = AUSTRALIAN_NEWS.flatMap(i => i.baseUrls)

/**
 * type guard which validates that the passed in `val` is a Australian news URL
 */
export const isAustralianNewsUrl = (val: unknown): val is AustralianNewsUrls => {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  )
}
