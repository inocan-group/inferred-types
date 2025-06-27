import type { JapaneseNewsUrls } from "inferred-types/types";
import { JAPANESE_NEWS } from "inferred-types/constants";
import { isString } from "inferred-types/runtime";

const URL = JAPANESE_NEWS.flatMap(i => i.baseUrls);

/**
 * type guard which validates that the passed in `val` is a Japanese news URL
 */
export function isJapaneseNewsUrl(val: unknown): val is JapaneseNewsUrls {
    return isString(val) && val.startsWith("https://") && (
        URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
    );
}
