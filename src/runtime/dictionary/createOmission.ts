/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Narrowable } from "src/types";
import { omit } from "src/runtime";

/**
 * **createOmission**(...keys)(obj)
 * 
 * A higher order function which is _configured_ to exclude a number of
 * key values. This partial application of the utility can then be reused
 * as many times as desired to exclude certain 
 * 
 * **Related:** `omit`
 */
export function createOmission<
  TKeys extends readonly (string|symbol)[]
>(...removeKeys: TKeys) {
  return <
    TObj extends Record<string|symbol, N>,
    N extends Narrowable,
  >(obj: TObj) => omit(obj, ...removeKeys);
}
