import type { VueRef } from "inferred-types/types";
import { isObject } from "inferred-types/runtime";

export function isVueRef(val: unknown): val is VueRef {
  if (isObject(val)) {
    const keys = Object.keys(val);

    return !!["dep", "__v_isRef"].every(i => keys.includes(i));
  }

  return false;
}
