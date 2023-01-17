import { Get } from "../dictionary/Get";
import { AfterFirst } from "./AfterFirst";
import { RemoveNever } from "./extractors";
import { First } from "./First";

type GetEachAcc<
  T extends any[] | readonly any[], 
  TKey extends string | number | null, 
  Processed extends readonly any[] = []
> = //
[] extends T
  ? Processed
  : GetEachAcc<AfterFirst<T>, TKey, [...Processed, Get<First<T>, TKey>]>;

/**
* **GetEach**`<TList, TKey>`
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
  TRetainNever extends boolean = false
> = TKey extends null
  ? TList
  : TRetainNever extends false
    ? RemoveNever<GetEachAcc<TList, TKey>>
    : GetEachAcc<TList, TKey>;
