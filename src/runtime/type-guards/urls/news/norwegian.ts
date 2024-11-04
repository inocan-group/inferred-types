import { NORWEGIAN_NEWS } from "inferred-types"
import { isString } from "../../isString"
import { NorwegianNewsUrls } from "src/types/string-literals"

const URL = NORWEGIAN_NEWS.flatMap(i => i.baseUrls)

/**
 * type guard which validates that the passed in `val` is a Norwegian news URL
 */
export const isNorwegianNewsUrl = (val: unknown): val is NorwegianNewsUrls => {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  )
}
