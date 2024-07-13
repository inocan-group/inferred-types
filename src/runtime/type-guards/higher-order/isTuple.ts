
import {
  ShapeCallback,
  HandleDoneFn
} from "src/types/index"
import {
  isDoneFn,
  ShapeApiImplementation,
  isArray,
  isSameTypeOf,
  isShape
 } from "src/runtime/index"

type FromDefn<
  T extends readonly ShapeCallback[]
> = {
  [K in keyof T]: HandleDoneFn<ReturnType<T[K]>>
};

export const isTuple = <TDefn extends readonly ShapeCallback[]>(...tuple: TDefn) => {
  const results = tuple
    .map(i => i(ShapeApiImplementation))
    .map(i => isDoneFn(i) ? (i as any).done() : i);

  return <T>(v: T): v is T & FromDefn<TDefn> => {
    return isArray(v) &&
      v.length === results.length &&
      results.every(isShape) &&
      v.every((item, idx) => isSameTypeOf(results[idx])(item))
  }
}
