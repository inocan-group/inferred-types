import type { DanishNewsUrls } from "inferred-types/types";
import { DANISH_NEWS } from "inferred-types/constants";
import { isString } from "inferred-types/runtime";

const URL = DANISH_NEWS.flatMap(i => i.baseUrls);

/**
 * type guard which validates that the passed in `val` is a Danish news URL
 */
export function isDanishNewsUrl(val: unknown): val is DanishNewsUrls {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  );
}
