import { ITALIAN_NEWS } from "src/constants/index"
import { isString } from "../../isString"
import { ItalianNewsUrls } from "src/types/string-literals"

const URL = ITALIAN_NEWS.flatMap(i => i.baseUrls)

/**
 * type guard which validates that the passed in `val` is a Italian news URL
 */
export const isItalianNewsUrl = (val: unknown): val is ItalianNewsUrls => {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  )
}
