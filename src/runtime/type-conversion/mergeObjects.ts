// import type { MergeObjects } from "src/types";
import { 
  keys, 
  intersection, 
  withKeys,
  unique 
} from "../index";
export function mergeObjects<
  TDefault extends Record<string, any>,
  TOverride extends Record<string, any>,
  TDeref extends (keyof TDefault & keyof TOverride & (string | number)) | null
>(
  defVal: TDefault, 
  override: TOverride,
  deref: TDeref = null as TDeref
) {
  /** top-level properties which are contained in both */
  const intersect = intersection(keys(defVal), keys(override), deref);
  /** unique properties to each  */
  const [ defUnique, overUnique ] = unique(keys(defVal), keys(override), deref);

  const du = withKeys(defVal, defUnique);
  const ou = withKeys(defVal, overUnique);

  return {...du, ...ou};

  // const defExtend = exclude(
  //   defVal, keys(override).filter(i => isString(i))
  // );

  // const merged = keys(override).reduce(
  //   (acc, key) => isDefined(override[key])
  //     ? { ...acc, [key]: override[key]}
  //     : { ...acc, [key]: key in defVal ? defVal[key] : undefined },
  //   {} as Record<keyof TOverride, any>
  // );

  // return {...defExtend, ...merged} as MergeObjects<TDefault, TOverride>;
}
