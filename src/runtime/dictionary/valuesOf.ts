import { AsRecord, Narrow, Narrowable, ObjectKey, Values } from "src/types/index";

/**
 * **valuesOf**(obj) -> readonly values[]
 * 
 * Runtime utility to convert an object into a tuple of 
 * values while preserving as much type information as
 * possible.
 */
export const valuesOf = <
  TObj extends Record<ObjectKey, N> | object,
  N extends Narrowable
>(obj: TObj): Values<AsRecord<TObj>> => {
  const values = [];
  for (const k of Object.keys(obj)) {
    values.push(obj[k as keyof typeof obj]);
  }

  return values as Values<AsRecord<TObj>>
}
