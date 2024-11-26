import { CANADIAN_NEWS } from "inferred-types/constants"
import { isString } from "inferred-types/dist/runtime/index"
import { CanadianNewsUrls } from "inferred-types/types"

const URL = CANADIAN_NEWS.flatMap(i => i.baseUrls)

/**
 * type guard which validates that the passed in `val` is a Canadian news URL
 */
export const isCanadianNewsUrl = (val: unknown): val is CanadianNewsUrls => {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  )
}
