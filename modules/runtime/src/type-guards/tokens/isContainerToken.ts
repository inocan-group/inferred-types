import type {
  ArrayToken,
  ContainerToken,
  MapToken,
  ObjectToken,
  RecordToken,
  SetToken,
  TupleToken,
  UnionSetToken,
  UnionToken,
  WeakMapToken,
} from "inferred-types/types";
import { isString } from "inferred-types/runtime";

export function isObjectToken(val: unknown): val is ObjectToken {
  return isString(val) && val.startsWith("<<obj::");
}

export function isRecordToken(val: unknown): val is RecordToken {
  return isString(val) && val.startsWith("<<rec::") && val.endsWith(">>");
}

export function isTupleToken(val: unknown): val is TupleToken {
  return isString(val) && val.startsWith("<<tuple::");
}

export function isArrayToken(val: unknown): val is ArrayToken {
  return isString(val) && val.startsWith("<<arr::");
}

export function isMapToken(val: unknown): val is MapToken {
  return isString(val) && val.startsWith("<<map::");
}

export function isSetToken(val: unknown): val is SetToken {
  return isString(val) && val.startsWith("<<set::");
}

export function isWeakMapToken(val: unknown): val is WeakMapToken {
  return isString(val) && val.startsWith("<<weak::");
}

/**
 * **isUnionToken**`(val)`: **val** is `UnionToken`
 */
export function isUnionToken(val: unknown): val is UnionToken {
  return isString(val) && val.startsWith("<<union::[ ");
}

/**
 * **isUnionSetToken**`(val)`: **val** is `UnionSetToken`
 */
export function isUnionSetToken(val: unknown): val is UnionSetToken {
  return isString(val) && val.startsWith("<<union-set::");
}

/**
 * **isContainerToken**`(val)`: **val** is `ContainerToken`
 */
export function isContainerToken(val: unknown): val is ContainerToken {
  return isString(val) && (
    isObjectToken(val)
    || isRecordToken(val)
    || isTupleToken(val)
    || isArrayToken(val)
    || isMapToken(val)
    || isSetToken(val)
    || isWeakMapToken(val)
    || isUnionSetToken(val)
    || isUnionToken(val)
  );
}
