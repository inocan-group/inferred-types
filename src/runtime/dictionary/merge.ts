import { Mutable, Narrowable, SimplifyObject, TypeDefault } from "src/types";
import { keys } from "../keys";
import { isObject } from "../runtime";

/**
 * **merge**(val, defaultVal)
 *
 * Merges two values together where the second property is considered the
 * the "default value". This means that in any cases where the primary value
 * os _undefined_ it will be replaced by the default value. The merging will
 * also recurse into object types to do matching at a property-by-property
 * level.
 *
 * As much as is possible, this utility will maintain strong and narrow types
 * across the merge process.
 */
export const merge = <T extends Narrowable, D extends Narrowable>(
  val: T,
  defVal: D
): SimplifyObject<Mutable<TypeDefault<T, D>>> => {
  const result =
    val === undefined
      ? // value is undefined; use default value
        defVal
      : isObject(defVal) && isObject(val)
      ? // value and and default value are objects; recurse via default values
        keys(defVal as Record<string, any>).reduce((acc, key) => {
          const v = (val as Record<string, any>)[key];
          const dv = (defVal as Record<string, any>)[key];

          return { ...acc, [key]: merge(v, dv) };
        }, {} as Record<string, any>)
      : val;

  return result as SimplifyObject<Mutable<TypeDefault<T, D>>>;
};
