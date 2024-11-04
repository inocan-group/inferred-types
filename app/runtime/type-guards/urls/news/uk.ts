import { UK_NEWS } from "inferred-types"
import { isString } from "../../isString"
import { UkNewsUrls } from "src/types/string-literals"

const URL = UK_NEWS.flatMap(i => i.baseUrls)

/**
 * type guard which validates that the passed in `val` is a UK news URL
 */
export const isUkNewsUrl = (val: unknown): val is UkNewsUrls => {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  )
}
