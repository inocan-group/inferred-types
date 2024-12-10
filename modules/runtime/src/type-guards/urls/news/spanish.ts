import type { SpanishNewsUrls } from "inferred-types/types";
import { SPANISH_NEWS } from "inferred-types/constants";
import { isString } from "inferred-types/runtime";

const URL = SPANISH_NEWS.flatMap(i => i.baseUrls);

/**
 * type guard which validates that the passed in `val` is a Spanish news URL
 */
export function isSpanishNewsUrl(val: unknown): val is SpanishNewsUrls {
  return isString(val) && val.startsWith("https://") && (
    URL.includes(val as any) || URL.some(i => i.startsWith(`${i}/`))
  );
}
