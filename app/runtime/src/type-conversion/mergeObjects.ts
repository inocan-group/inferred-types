import { Dictionary, MergeObjects, NarrowObject, Narrowable } from "@inferred-types/types";
import { sharedKeys } from "@inferred-types/runtime";
import { withoutKeys } from "@inferred-types/runtime";


export function mergeObjects<
  D extends Narrowable,
  O extends Narrowable,
  TDefault extends NarrowObject<D>,
  TOverride extends NarrowObject<O>,
>(
  defVal: TDefault,
  override: TOverride
) {
  const intersectingKeys = sharedKeys(defVal, override) as string[];
  const defUnique = withoutKeys(defVal, ...intersectingKeys as readonly string[]) as unknown as string[];
  const overrideUnique = withoutKeys(defVal, ...intersectingKeys as readonly string[]);

  const merged = {
    ...(intersectingKeys.reduce(
      (acc, key) => typeof override[key] === "undefined"
        ? { ...acc, [key]: defVal[key] }
        : { ...acc, [key]: override[key] },
      {} as Dictionary
    )),
    ...defUnique,
    ...overrideUnique,
  };

  return merged as unknown as MergeObjects<TDefault, TOverride>
}
