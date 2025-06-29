import type { ChineseNewsUrls } from "inferred-types/types";
import { CHINESE_NEWS } from "inferred-types/constants";
import { isString } from "inferred-types/runtime";

const URL = CHINESE_NEWS.flatMap(i => i.baseUrls);

/**
 * type guard which validates that the passed in `val` is a Chinese news URL
 */
export function isChineseNewsUrl(val: unknown): val is ChineseNewsUrls {
    return isString(val) && val.startsWith("https://") && (
        URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
    );
}
