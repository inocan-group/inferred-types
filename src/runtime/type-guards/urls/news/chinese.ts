import { CHINESE_NEWS } from "src/constants/index"
import { isString } from "../../isString"
import { ChineseNewsUrls } from "src/types/string-literals"

const URL = CHINESE_NEWS.flatMap(i => i.baseUrls)

/**
 * type guard which validates that the passed in `val` is a Chinese news URL
 */
export const isChineseNewsUrl = (val: unknown): val is ChineseNewsUrls => {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  )
}
