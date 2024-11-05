import { ITALIAN_NEWS } from "inferred-types/dist/constants/index"
import { isString } from "inferred-types/dist/runtime/index"
import { ItalianNewsUrls } from "inferred-types/dist/types/index"

const URL = ITALIAN_NEWS.flatMap(i => i.baseUrls)

/**
 * type guard which validates that the passed in `val` is a Italian news URL
 */
export const isItalianNewsUrl = (val: unknown): val is ItalianNewsUrls => {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  )
}
