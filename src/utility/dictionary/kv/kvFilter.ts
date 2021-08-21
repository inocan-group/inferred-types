// import { Mutable, Narrowable } from "~/types";
// import { dictToKv, kvToDict } from "~/utility";

// export type DictFilterCallback<T extends {}, R extends boolean> = (k: {
//   key: string;
//   value: Mutable<T>[keyof T];
// }) => R;

// export function dictFilter<T extends {}>(
//   obj: T,
//   filter: DictFilterCallback<T, boolean>
// ) {
//   return kvToDict(dictToKv(obj, false));
// }

export function dictFilter() {
  throw new Error("not implemented");
}
