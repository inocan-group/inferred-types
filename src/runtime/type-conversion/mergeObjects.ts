import {  KV, MergeObjects, NarrowObject, Narrowable } from "src/types/index";
import { sharedKeys } from "../dictionary/sharedKeys";
import { withoutKeys } from "../dictionary/withoutKeys";


export function mergeObjects<
  D extends Narrowable,
  O extends Narrowable,
  TDefault extends NarrowObject<D>,
  TOverride extends NarrowObject<O>,
>(
  defVal: TDefault, 
  override: TOverride
) {
  const intersectingKeys = sharedKeys(defVal,override) as string[];
  const defUnique = withoutKeys(defVal, ...intersectingKeys as readonly string[]) as string[];
  const overrideUnique = withoutKeys(defVal, ...intersectingKeys as readonly string[]);

  const merged = {
    ...(intersectingKeys.reduce(
      (acc, key) => typeof override[key] === "undefined"
        ? {...acc, [key]: defVal[key]}
        : {...acc, [key]: override[key]},
      {} as KV
    )),
    ...defUnique,
    ...overrideUnique,
  };

  return merged as MergeObjects<TDefault,TOverride>
}
