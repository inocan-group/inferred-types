import type { UkNewsUrls } from "inferred-types/types";
import { UK_NEWS } from "inferred-types/constants";
import { isString } from "inferred-types/runtime";

const URL = UK_NEWS.flatMap(i => i.baseUrls);

/**
 * type guard which validates that the passed in `val` is a UK news URL
 */
export function isUkNewsUrl(val: unknown): val is UkNewsUrls {
    return isString(val) && val.startsWith("https://") && (
        URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
    );
}
