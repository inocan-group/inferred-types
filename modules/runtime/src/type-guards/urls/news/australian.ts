import type { AustralianNewsUrls } from "inferred-types/types";
import { AUSTRALIAN_NEWS } from "inferred-types/constants";
import { isString } from "inferred-types/runtime";

const URL = AUSTRALIAN_NEWS.flatMap(i => i.baseUrls);

/**
 * type guard which validates that the passed in `val` is a Australian news URL
 */
export function isAustralianNewsUrl(val: unknown): val is AustralianNewsUrls {
    return isString(val) && val.startsWith("https://") && (
        URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
    );
}
