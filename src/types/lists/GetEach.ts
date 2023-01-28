import { ErrorCondition } from "../../runtime/literals/ErrorCondition";
import { Get } from "../dictionary/Get";
import { AfterFirst } from "./AfterFirst";
import { ConvertSet } from "./ConvertSet";
import { RemoveErrors } from "./extractors";
import { First } from "./First";

export type GetEachErrHandling = "report" | "ignore" | "to-never";

type GetEachAcc<
  T extends any[] | readonly any[], 
  TKey extends string | number | null, 
  Processed extends readonly any[] = []
> = //
[] extends T
  ? Processed
  : GetEachAcc<AfterFirst<T>, TKey, [...Processed, Get<First<T>, TKey>]>;

type ConvertToNever = [ErrorCondition<"invalid-dot-path">, never];

/**
* **GetEach**`<TList, TKey, [THandleErrors]>`
* 
* Type utility which receives a list of types -- `TList` -- and then _gets_ a 
* key `TKey` (using dot syntax) from each element in the array.
* 
* - if a given element is not an object then `never` is returned
* - if a given element is an object and `undefined` extends that properties type 
* then `undefined` is set otherwise `never`.
* - by default all `never` values are removed from the resultant type but you can
* change this behavior by changing `TRetainNever` to **true**
* 
* ```ts
* // ["Bob", "Wendy"]
* type T = GetEach<[
*    { name: "Bob", age: 12 },
*    { name: "Wendy", age: 24 }
* ], "name">
* ```
*/
export type GetEach<
  TList extends any[] | readonly any[], 
  TKey extends string | number | null,
  THandleErrors extends GetEachErrHandling = "ignore"
> = TKey extends null
  ? TList
  : THandleErrors extends "ignore"
    ? RemoveErrors<GetEachAcc<TList, TKey>, "invalid-dot-path">
    : THandleErrors extends "report"
      ? GetEachAcc<TList, TKey>
      : THandleErrors extends "to-never"
        ? ConvertSet<GetEachAcc<TList, TKey>, ConvertToNever>
        : never;
