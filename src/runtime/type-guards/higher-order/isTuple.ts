/* eslint-disable @typescript-eslint/no-explicit-any */
import { ShapeCallback } from "src/types/literals"
import { isDoneFn } from "../isDoneFn"
import { ShapeApi, isArray, isSameTypeOf, isShape } from "../.."
import { HandleDoneFn } from "src/types/functions"

type FromDefn<
  T extends readonly ShapeCallback[]
> = {
  [K in keyof T]: HandleDoneFn<ReturnType<T[K]>>
};

export const isTuple = <TDefn extends readonly ShapeCallback[]>(...tuple: TDefn) => {
  const results = tuple
    .map(i => i(ShapeApi))
    .map(i => isDoneFn(i) ? (i as any).done() : i);

  return <T>(v: T): v is T & FromDefn<TDefn> => {
    return isArray(v) && 
      v.length === results.length && 
      results.every(isShape) &&
      v.every((item, idx) => isSameTypeOf(results[idx])(item))
  }
}
