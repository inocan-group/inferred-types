import { Tuple, Length, ToNumber, AfterFirst, First } from "src/types";

type Convert<
  TList extends Tuple<`${number}` | number>,
  TResults extends Tuple<number> = []
> = [] extends TList
  ? TResults
  : Convert<
      AfterFirst<TList>,
      [
        ...TResults,
        ToNumber<First<TList> >
      ]
    >;



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
> = Length<TList> extends 0
? readonly number[]
: Readonly<Convert<{
  [K in keyof TList]: K
}>>;
