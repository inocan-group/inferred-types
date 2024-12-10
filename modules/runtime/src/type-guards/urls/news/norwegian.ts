import type { NorwegianNewsUrls } from "inferred-types/types";
import { NORWEGIAN_NEWS } from "inferred-types/constants";
import { isString } from "inferred-types/runtime";

const URL = NORWEGIAN_NEWS.flatMap(i => i.baseUrls);

/**
 * type guard which validates that the passed in `val` is a Norwegian news URL
 */
export function isNorwegianNewsUrl(val: unknown): val is NorwegianNewsUrls {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  );
}
