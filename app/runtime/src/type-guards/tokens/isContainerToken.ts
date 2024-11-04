import {
  ArrayToken,
  ContainerToken,
  MapToken, ObjectToken, RecordToken, SetToken, TupleToken, UnionSetToken, UnionToken, WeakMapToken } from "src/types/index";
import { isString } from "src/runtime/index"

export const isObjectToken = (val: unknown): val is ObjectToken => {
  return isString(val) && val.startsWith("<<obj::");
}

export const isRecordToken = (val: unknown): val is RecordToken => {
  return isString(val) && val.startsWith("<<rec::") && val.endsWith(">>");
}

export const isTupleToken = (val: unknown): val is TupleToken => {
  return isString(val) && val.startsWith("<<tuple::");
}

export const isArrayToken = (val: unknown): val is ArrayToken => {
  return isString(val) && val.startsWith("<<arr::");
}

export const isMapToken = (val: unknown): val is MapToken => {
  return isString(val) && val.startsWith("<<map::");
}

export const isSetToken = (val: unknown): val is SetToken => {
  return isString(val) && val.startsWith("<<set::");
}

export const isWeakMapToken = (val: unknown): val is WeakMapToken => {
  return isString(val) && val.startsWith("<<weak::");
}

/**
 * **isUnionToken**`(val)`: **val** is `UnionToken`
 */
export const isUnionToken = (val: unknown): val is UnionToken => {
  return isString(val) && val.startsWith("<<union::[ ");
}

/**
 * **isUnionSetToken**`(val)`: **val** is `UnionSetToken`
 */
export const isUnionSetToken = (val: unknown): val is UnionSetToken => {
  return isString(val) && val.startsWith("<<union-set::")
}

/**
 * **isContainerToken**`(val)`: **val** is `ContainerToken`
 */
export const isContainerToken = (val: unknown): val is ContainerToken => {
  return isString(val) && (
    isObjectToken(val) ||
    isRecordToken(val) ||
    isTupleToken(val) ||
    isArrayToken(val) ||
    isMapToken(val) ||
    isSetToken(val) ||
    isWeakMapToken(val) ||
    isUnionSetToken(val) ||
    isUnionToken(val)
  )
}
