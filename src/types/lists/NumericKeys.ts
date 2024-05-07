import { Tuple, Length, ToNumber, AfterFirst, First, IfReadonlyArray } from "src/types/index";

type Recurse<
  TList extends Tuple,
  TResults extends Tuple = []
> = [] extends TList
  ? [] extends TResults
    ? number[]
    : TResults
  : Recurse<
      AfterFirst<TList>,
      [
        ...TResults,
        ToNumber<First<TList> >
      ]
    >;

type Convert<
  TList extends Tuple
> = Length<TList> extends 0
    ? number[]
    : Recurse<{
      [K in keyof TList]: K
    }>;
    
/**
 * **NumericKeys**<`TList`>
 * 
 * Will provide a readonly tuple of numeric keys for 
 * a given literal array and an empty array otherwise.
 * 
 * ```ts
 * type Arr = ["foo", "bar", "baz"];
 * // readonly [0, 1, 2]
 * type T = NumericKeys<Arr>;
 * ```
 * 
 * **Related:** `Keys`
 */
export type NumericKeys <
  TList extends Tuple
> = IfReadonlyArray<
  TList,
  TList["length"] extends 0
    ? number[]
    : Readonly<Convert<TList>>,
  Convert<TList>
>;

