import { GERMAN_NEWS } from "inferred-types/constants"
import { isString } from "inferred-types/runtime"
import { GermanNewsUrls } from "inferred-types/types"

const URL = GERMAN_NEWS.flatMap(i => i.baseUrls)

/**
 * type guard which validates that the passed in `val` is a German news URL
 */
export const isGermanNewsUrl = (val: unknown): val is GermanNewsUrls => {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  )
}
