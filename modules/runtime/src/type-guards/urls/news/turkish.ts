import type { TurkishNewsUrls } from "inferred-types/types";
import { TURKISH_NEWS } from "inferred-types/constants";
import { isString } from "inferred-types/runtime";

const URL = TURKISH_NEWS.flatMap(i => i.baseUrls);

/**
 * type guard which validates that the passed in `val` is a Turkish news URL
 */
export function isTurkishNewsUrl(val: unknown): val is TurkishNewsUrls {
    return isString(val) && val.startsWith("https://") && (
        URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
    );
}
