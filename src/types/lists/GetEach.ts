
import { 
  Get,
  IfReadonlyArray,
  IfValidDotPath,
  IndexOf, 
  Mutable, 
  RemoveNever, 
} from "..";


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
  ? TList // return list "as is" when key is null
    : RemoveNever<{
      [K in keyof TList]: TKey extends keyof TList[K]
        ? IndexOf<TList[K], TKey>
        : IfValidDotPath<
            TList[K], TKey,
            // valid
            IfReadonlyArray<TList, Get<TList[K], TKey>, Mutable<Get<TList[K], TKey>> >,
            // invalid
            never
          >
    }>;
