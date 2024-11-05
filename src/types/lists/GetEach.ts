
import {
  Get,
  IsReadonlyArray,
  IsValidDotPath,
  IndexOf,
  Mutable,
  RemoveNever,
  TypedFunction,
  FnProps,
} from "inferred-types/dist/types/index";
/**
 * extract props from functions
 */
type F<T> = T extends TypedFunction
  ? FnProps<T>
  : T;

type Process<
  TList extends readonly unknown[],
  TKey extends string
>= RemoveNever<{
  [K in keyof TList]: [TKey] extends [keyof F<TList[K]>]
    ? [IndexOf<F<TList[K]>, TKey>] extends [undefined]
      ? never
      : IndexOf<F<TList[K]>, TKey>
    : [IsValidDotPath<F<TList[K]>, TKey>] extends [true]
      ? Mutable<Get<F<TList[K]>, TKey, never>> // valid
  :  never // TKey does not extends TList[K]
}>;


/**
* **GetEach**`<TList, TKey, [THandleErrors]>`
*
* Type utility which receives a list of types -- `TList` -- and then _gets_ a
* key `TKey` (using dot syntax) from each element in the array.
*
* - if a given element is not an object then it is excluded from the result set
* - values which evaluate to _undefined_ are also removed from the result set
* - if either `null` or "" are used for `TKey` then this simply proxies `TList`
* through
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
  TKey extends string | null,
> = TKey extends null
? TList
: TKey extends ""
? TList
: IsReadonlyArray<TList> extends true
  ? Readonly<Process<[...TList], Exclude<TKey, null>>>
  : Process<TList, Exclude<TKey, null>>;

