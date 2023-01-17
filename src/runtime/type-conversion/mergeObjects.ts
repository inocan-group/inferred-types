import { MergeObjects } from "src/types";
import { exclude } from "../dictionary/exclude";
import { keys } from "../keys";
import { isDefined } from "../type-guards/isDefined";

export function mergeObjects<
  TDefault extends Record<string, any>,
  TOverride extends Record<string, any>
>(defVal: TDefault, override: TOverride) {
  const intersect = intersection(keys(TDefault), keys(TOverride));
  const distinct = unique(keys(TDefault), keys(TOverride));
  const defExtend = exclude(
    defVal, distinctKeys(defVal, override)
  );

  const intersection = keys(override).reduce(
    (acc, key) => isDefined(override[key])
      ? { ...acc, [key]: override[key]}
      : { ...acc, [key]: key in defVal ? defVal[key] : undefined },
    {} as Record<keyof TOverride, any>
  );

  return {...defExtend, ...intersection} as MergeObjects<TDefault, TOverride>;
}
