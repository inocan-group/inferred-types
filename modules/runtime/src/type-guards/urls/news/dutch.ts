import type { DutchNewsUrls } from "inferred-types/types";
import { DUTCH_NEWS } from "inferred-types/constants";
import { isString } from "inferred-types/runtime";

const URL = DUTCH_NEWS.flatMap(i => i.baseUrls);

/**
 * type guard which validates that the passed in `val` is a Dutch news URL
 */
export function isDutchNewsUrl(val: unknown): val is DutchNewsUrls {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  );
}
