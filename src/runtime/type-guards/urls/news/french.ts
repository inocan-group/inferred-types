import { FRENCH_NEWS } from "src/constants/index"
import { isString } from "../../isString"
import { FrenchNewsUrls } from "src/types/string-literals"

const URL = FRENCH_NEWS.flatMap(i => i.baseUrls)

/**
 * type guard which validates that the passed in `val` is a French news URL
 */
export const isFrenchNewsUrl = (val: unknown): val is FrenchNewsUrls => {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  )
}