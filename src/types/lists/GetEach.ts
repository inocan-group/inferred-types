
import { 
  Filter,
  Get,
  IfReadonlyArray,
  IfValidDotPath,
  IndexOf, 
  Mutable, 
} from "src/types/index";


/**
* **GetEach**`<TList, TKey, [THandleErrors]>`
* 
* Type utility which receives a list of types -- `TList` -- and then _gets_ a 
* key `TKey` (using dot syntax) from each element in the array.
* 
* - if a given element is not an object then it is excluded from the result set
* - values which evaluate to _undefined_ are also removed from the result set 
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
  TKey extends string | number,
> = Filter<{
      [K in keyof TList]: TKey extends keyof TList[K]
        ? IndexOf<TList[K], TKey> extends undefined
          ? never
          : IndexOf<TList[K], TKey>
        : IfValidDotPath<
            TList[K], TKey,
            // valid
            IfReadonlyArray<
              TList, 
              Get<TList[K], TKey, never>, 
              Mutable<Get<TList[K], TKey, never>> 
            >,
            // invalid
            never
          >
    }, never>;
