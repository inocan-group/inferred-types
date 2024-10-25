import { GERMAN_NEWS } from "src/constants/index"
import { isString } from "../../isString"
import { GermanNewsUrls } from "src/types/string-literals"

const URL = GERMAN_NEWS.flatMap(i => i.baseUrls)

/**
 * type guard which validates that the passed in `val` is a German news URL
 */
export const isGermanNewsUrl = (val: unknown): val is GermanNewsUrls => {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  )
}
