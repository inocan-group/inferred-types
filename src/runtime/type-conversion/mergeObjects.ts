import { AnyObject } from "src/types";
import { sharedKeys, withoutKeys } from "../dictionary";

export function mergeObjects<
  TDefault extends AnyObject,
  TOverride extends AnyObject
>(
  defVal: TDefault, 
  override: TOverride
) {
  const intersectingKeys = sharedKeys(defVal,override) as (string & keyof TDefault & keyof TOverride)[];

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
