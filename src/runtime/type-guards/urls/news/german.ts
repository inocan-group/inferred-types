import { GERMAN_NEWS } from "inferred-types/dist/constants/index"
import { isString } from "inferred-types/dist/runtime/index"
import { GermanNewsUrls } from "inferred-types/dist/types/index"

const URL = GERMAN_NEWS.flatMap(i => i.baseUrls)

/**
 * type guard which validates that the passed in `val` is a German news URL
 */
export const isGermanNewsUrl = (val: unknown): val is GermanNewsUrls => {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  )
}
