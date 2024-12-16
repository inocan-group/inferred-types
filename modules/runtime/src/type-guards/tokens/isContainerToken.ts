import type {
  TT_Container,
  TypeToken,
} from "inferred-types/types";
import { isTypeToken } from "inferred-types/runtime";

export function isObjectToken(val: unknown): val is TypeToken<"obj"> {
  return isTypeToken(val, "obj");
}

export function isRecordToken(val: unknown): val is TypeToken<"rec"> {
  return isTypeToken(val, "rec");
}

export function isTupleToken(val: unknown): val is TypeToken<"tuple"> {
  return isTypeToken(val, "tuple");
}

export function isArrayToken(val: unknown): val is TypeToken<"arr"> {
  return isTypeToken(val, "arr");
}

export function isMapToken(val: unknown): val is TypeToken<"map"> {
  return isTypeToken(val, "map");
}

export function isSetToken(val: unknown): val is TypeToken<"set"> {
  return isTypeToken(val, "set");
}

/**
 * **isContainerToken**`(val)`: **val** is `ContainerToken`
 */
export function isContainerToken(val: unknown): val is TT_Container {
  return isObjectToken(val)
    || isRecordToken(val)
    || isTupleToken(val)
    || isArrayToken(val)
    || isMapToken(val)
    || isSetToken(val);
  // || isWeakMapToken(val)
}
