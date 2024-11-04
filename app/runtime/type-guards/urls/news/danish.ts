import { DANISH_NEWS } from "inferred-types"
import { isString } from "../../isString"
import { DanishNewsUrls } from "src/types/string-literals"

const URL = DANISH_NEWS.flatMap(i => i.baseUrls)

/**
 * type guard which validates that the passed in `val` is a Danish news URL
 */
export const isDanishNewsUrl = (val: unknown): val is DanishNewsUrls => {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  )
}
