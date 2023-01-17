import { IndexOf } from "src/types/lists/IndexOf";
import { Narrowable } from "src/types/Narrowable";
import { Never } from "../runtime/Never";
import { isArray, isNull, isObject } from "../type-guards";

export function indexOf<
TList extends Narrowable,
TIdx extends string | number | null
>(list: TList, idx: TIdx) {
  return (
    isNull(idx)
    ? list
    : isArray(list)
      ? Number(idx) in list ? list[Number(idx)] : Never
      : isObject(list) 
        ? String(idx) in list ? list[String(idx)] : Never
        : Never
  ) as IndexOf<TList,TIdx>;
}
