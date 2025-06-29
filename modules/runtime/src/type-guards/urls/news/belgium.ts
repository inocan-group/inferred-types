import type { BelgianNewsUrls } from "inferred-types/types";
import { BELGIUM_NEWS } from "inferred-types/constants";
import { isString } from "inferred-types/runtime";

const URL = BELGIUM_NEWS.flatMap(i => i.baseUrls);

/**
 * type guard which validates that the passed in `val` is a Belgium news URL
 */
export function isBelgiumNewsUrl(val: unknown): val is BelgianNewsUrls {
    return isString(val) && val.startsWith("https://") && (
        URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
    );
}
