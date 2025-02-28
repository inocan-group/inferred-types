import type { ItalianNewsUrls } from "inferred-types/types";
import { ITALIAN_NEWS } from "inferred-types/constants";
import { isString } from "inferred-types/runtime";

const URL = ITALIAN_NEWS.flatMap(i => i.baseUrls);

/**
 * type guard which validates that the passed in `val` is a Italian news URL
 */
export function isItalianNewsUrl(val: unknown): val is ItalianNewsUrls {
    return isString(val) && val.startsWith("https://") && (
        URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
    );
}
