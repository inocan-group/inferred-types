import type {
  HandleDoneFn,
  ShapeCallback,
} from "inferred-types/types";
import {
  isArray,
  isDoneFn,
  isSameTypeOf,
  isShape,
  ShapeApiImplementation,
} from "inferred-types/runtime";

type FromDefn<
  T extends readonly ShapeCallback[],
> = {
  [K in keyof T]: HandleDoneFn<ReturnType<T[K]>>
};

export function isTuple<TDefn extends readonly ShapeCallback[]>(...tuple: TDefn) {
  const results = tuple
    .map(i => i(ShapeApiImplementation))
    .map(i => isDoneFn(i) ? (i as any).done() : i);

  return <T>(v: T): v is T & FromDefn<TDefn> => {
    return isArray(v)
      && v.length === results.length
      && results.every(isShape)
      && v.every((item, idx) => isSameTypeOf(results[idx])(item));
  };
}
