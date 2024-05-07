import { AfterFirst, IfLength, Length,  Tuple } from "src/types/index";

/**
 * **Last**`<TList, [TEmpty]>`
 * 
 * Returns the _last_ element in a list of elements.
 * 
 * - by default `TEmpty` is _never_ but this can be changed.
 */
export type Last<
  TContent extends Tuple,
  TEmpty = never
> = IfLength<
  TContent, 1,
  // If only one array element then return it
  TContent[0],
  IfLength<
    TContent, 0,
    // no array element results in `never` type
    TEmpty,
    // otherwise 
    AfterFirst<TContent> extends readonly unknown[]
      ? TContent[Length<AfterFirst<TContent>>] extends TContent[number]
        ? TContent[Length<AfterFirst<TContent>>]
        : never
      : never
  >
>;

