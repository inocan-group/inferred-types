import { NORWEGIAN_NEWS } from "inferred-types/dist/constants/index"
import { isString } from "inferred-types/dist/runtime/index"
import { NorwegianNewsUrls } from "inferred-types/dist/types/index"

const URL = NORWEGIAN_NEWS.flatMap(i => i.baseUrls)

/**
 * type guard which validates that the passed in `val` is a Norwegian news URL
 */
export const isNorwegianNewsUrl = (val: unknown): val is NorwegianNewsUrls => {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  )
}
