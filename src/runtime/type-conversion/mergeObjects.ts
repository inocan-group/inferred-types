import {  NarrowObject, Narrowable } from "src/types/index";
import { sharedKeys, withoutKeys } from "src/runtime/index";

export function mergeObjects<
  D extends Narrowable,
  O extends Narrowable,
  TDefault extends NarrowObject<D>,
  TOverride extends NarrowObject<O>,
>(
  defVal: TDefault, 
  override: TOverride
) {
  const intersectingKeys = sharedKeys(defVal,override);

  const defUnique = withoutKeys(defVal, ...intersectingKeys as readonly string[]);
  const overrideUnique = withoutKeys(defVal, ...intersectingKeys as readonly string[]);

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
