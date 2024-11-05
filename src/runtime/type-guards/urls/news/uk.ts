import { UK_NEWS } from "inferred-types/dist/constants/index"
import { isString } from "inferred-types/dist/runtime/index"
import { UkNewsUrls } from "inferred-types/dist/types/index"

const URL = UK_NEWS.flatMap(i => i.baseUrls)

/**
 * type guard which validates that the passed in `val` is a UK news URL
 */
export const isUkNewsUrl = (val: unknown): val is UkNewsUrls => {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  )
}
