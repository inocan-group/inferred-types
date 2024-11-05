import { FRENCH_NEWS } from "inferred-types/dist/constants/index"
import { isString } from "inferred-types/dist/runtime/index"
import { FrenchNewsUrls } from "inferred-types/dist/types/index"

const URL = FRENCH_NEWS.flatMap(i => i.baseUrls)

/**
 * type guard which validates that the passed in `val` is a French news URL
 */
export const isFrenchNewsUrl = (val: unknown): val is FrenchNewsUrls => {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  )
}
