import { AUSTRALIAN_NEWS } from "inferred-types/constants"
import { isString } from "inferred-types/dist/runtime/index"
import { AustralianNewsUrls } from "inferred-types/types"

const URL = AUSTRALIAN_NEWS.flatMap(i => i.baseUrls)

/**
 * type guard which validates that the passed in `val` is a Australian news URL
 */
export const isAustralianNewsUrl = (val: unknown): val is AustralianNewsUrls => {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  )
}
