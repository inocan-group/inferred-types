import { SWISS_NEWS } from "inferred-types/constants"
import { isString } from "inferred-types/runtime"
import { SwissNewsUrls } from "inferred-types/types"

const URL = SWISS_NEWS.flatMap(i => i.baseUrls)

/**
 * type guard which validates that the passed in `val` is a Swiss news URL
 */
export const isSwissNewsUrl = (val: unknown): val is SwissNewsUrls => {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  )
}
