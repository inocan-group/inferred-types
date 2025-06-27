import type { UsNewsUrls } from "inferred-types/types";
import { US_NEWS } from "inferred-types/constants";
import { isString } from "inferred-types/runtime";

const URL = US_NEWS.flatMap(i => i.baseUrls);

/**
 * type guard which validates that the passed in `val` is a US news URL
 */
export function isUsNewsUrl(val: unknown): val is UsNewsUrls {
    return isString(val) && val.startsWith("https://") && (
        URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
    );
}
