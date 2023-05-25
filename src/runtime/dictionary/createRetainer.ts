/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Narrowable } from "src/types";
import { retain } from "src/runtime";

/**
 * **createRetainer**(...keys)(obj)
 * 
 * A higher order function which is _configured_ to "retain" a number of
 * keys in future objects. This partial application of the utility can then be reused
 * as many times as desired to retain a subset of these future objects.
 * 
 * **Related:** `retain`
 */
export function createOmission<
  TKeys extends readonly (string|symbol)[]
>(...removeKeys: TKeys) {
  return <
    TObj extends Record<string|symbol, N>,
    N extends Narrowable
  >(obj: TObj) => retain(obj, ...removeKeys);
}
