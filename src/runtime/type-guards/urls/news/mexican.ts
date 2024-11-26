import { MEXICAN_NEWS } from "inferred-types/constants"
import { isString } from "inferred-types/dist/runtime/index"
import { MexicanNewsUrls } from "inferred-types/types"

const URL = MEXICAN_NEWS.flatMap(i => i.baseUrls)

/**
 * type guard which validates that the passed in `val` is a Mexican news URL
 */
export const isMexicanNewsUrl = (val: unknown): val is MexicanNewsUrls => {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  )
}
