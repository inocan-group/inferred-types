import { ErrorCondition } from "../errors/ErrorCondition";
import { Get } from "src/types/dictionary";
import { AfterFirst, First, IndexOf, IndexOf } from "src/types/lists";
import { ConvertSet } from "./ConvertSet";
import { RemoveErrors, RemoveNever } from "./extractors";
import { IfContainer } from "src/types/boolean-logic";
import { ToContainer, ToString } from "src/types/type-conversion";


export type GetEachErrHandling = "report-errors" | "ignore-errors" | "to-never";

type GetEachAcc<
  T extends readonly unknown[], 
  TKey extends string | number | null, 
  Processed extends readonly unknown[] = []
> = //
[] extends T
  ? Processed
  : GetEachAcc<
      AfterFirst<T>, 
      TKey, 
      [
        ...Processed, 
        IfContainer<
          T,
          Get<ToContainer<First<T>>, TKey>,
          // First<T> not container
          TKey
        >
      ]
    >;


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
  TList extends readonly unknown[], 
  TKey extends string | number | null,
  // THandleErrors extends GetEachErrHandling = "ignore-errors"
> = TKey extends null
  ? TList // return list "as is"
  : RemoveNever<{
      [K in keyof TList]: IfContainer<
        TList[K],
        IndexOf<ToContainer<TList[K]>, TKey>,
        never
      >
    }> & readonly unknown[];
  
  
  // THandleErrors extends "ignore-errors"
  //   ? RemoveErrors<GetEachAcc<TList, TKey>, "invalid-dot-path">
  //   : THandleErrors extends "report-errors"
  //     ? GetEachAcc<TList, TKey>
  //     : THandleErrors extends "to-never"
  //       ? ConvertSet<GetEachAcc<TList, TKey>, ConvertToNever>
  //       : never;
