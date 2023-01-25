import { Mutable, Narrowable, SimplifyObject,  Scalar, MergeScalars, MergeTuples } from "src/types";
import { keys } from "runtime/dictionary/keys";
import { isObject } from "../type-guards/isObject";
import { isUndefined } from "../type-guards";

export function mergeScalars<
  TDefault extends Scalar | undefined,
  TOverride extends Scalar | undefined,
>(def: TDefault, override: TOverride): MergeScalars<TDefault,TOverride> {
  return (
    isUndefined(override) ? def : override
  ) as MergeScalars<TDefault,TOverride>;
}

export function mergeTuples<
  TDefault extends readonly any[],
  TOverride extends readonly any[]
>(defaults: TDefault, overrides: TOverride): MergeTuples<TDefault,TOverride> {
  const extendedDefaults = defaults.length > overrides.length
    ? defaults.slice(overrides.length - defaults.length)
    : [];
  const withOverrides = overrides.reduce(
    (acc, override, idx) => {
      const defaultValue = defaults[idx];
      return [
        ...acc, 
        isUndefined(override) 
          ? defaultValue 
          : override
      ];
    },
    []
  );

  return [...withOverrides, ...extendedDefaults] as unknown as MergeTuples<TDefault,TOverride>;
}

/**
 * **mergeWithDefaults**(val, defaultVal)
 *
 * Merges two values together where the second property is considered the
 * the "default value". This means that in any cases where the primary value
 * is _undefined_ it will be replaced by the default value. The merging will
 * also recurse into object types to do matching at a property-by-property
 * level.
 *
 * As much as is possible, this utility will maintain strong and narrow types
 * across the merge process.
 */
export const mergeWithDefaults = <
  TValue extends Narrowable,
  TDefaultValue extends Narrowable
>(
  val: TValue ,
  defVal: TDefaultValue 
): SimplifyObject<Mutable<Merge<TValue, TDefaultValue>>> => {
  const result =
    val === undefined
      ? defVal // value is undefined; use default value
      : isObject(defVal) && isObject(val)
      ? // value and and default value are objects; recurse via default values
        keys(defVal as Record<string, any>).reduce((acc, key) => {
          const v = (val as Record<string, any>)[key];
          const dv = (defVal as Record<string, any>)[key];

          return { ...acc, [key]: mergeWithDefaults(v, dv) };
        }, {} as Record<string, any>)
      : val;

  return result as SimplifyObject<Mutable<Merge<TValue, TDefaultValue>>>;
};


