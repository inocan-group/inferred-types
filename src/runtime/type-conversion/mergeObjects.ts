import { AnyObject } from "src/types";
import { sharedKeys, withoutKeys } from "src/runtime";

export function mergeObjects<
  TDefault extends AnyObject,
  TOverride extends AnyObject
>(
  defVal: TDefault, 
  override: TOverride
) {
  const intersectingKeys = sharedKeys(defVal,override);

  const defUnique = withoutKeys(defVal, ...intersectingKeys);
  const overrideUnique = withoutKeys(defVal, ...intersectingKeys);

  return {
    ...(intersectingKeys.reduce(
      (acc, key) => typeof override[key] === "undefined"
        ? {...acc, [key]: defVal[key]}
        : {...acc, [key]: override[key]},
      {}
    )),
    ...defUnique,
    ...overrideUnique,
  };
}
