import { MergeObjects } from "src/types";
import { isDefined, keys, isString, exclude, intersection, unique } from "src/runtime";
export function mergeObjects<
  TDefault extends Record<string, any>,
  TOverride extends Record<string, any>
>(defVal: TDefault, override: TOverride) {
  const intersect = intersection(keys(defVal), keys(override));
  const distinct = unique(keys(defVal), keys(override));
  console.log({distinct, intersect});
  const defExtend = exclude(
    defVal, keys(override).filter(i => isString(i))
  );

  const merged = keys(override).reduce(
    (acc, key) => isDefined(override[key])
      ? { ...acc, [key]: override[key]}
      : { ...acc, [key]: key in defVal ? defVal[key] : undefined },
    {} as Record<keyof TOverride, any>
  );

  return {...defExtend, ...merged} as MergeObjects<TDefault, TOverride>;
}
