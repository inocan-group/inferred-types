import {  
  AsString, 
  IsWideType, 
  Or,
} from "src/types/index";

type ProcessStr<
  TContent extends string,
  TComparator extends string
> = IsWideType<TComparator> extends true
  ? boolean
  : TContent extends `${string}${TComparator}${string}`
    ? true
    : false;


/**
 * Processes each node of the tuple
 * and then `or` the result to reach
 * single consensus
 */
type ProcessTuple<
  TContent extends readonly unknown[],
  TComparator, 
> = Or<{
  [K in keyof TContent]: [TContent[K]] extends [TComparator]
    ? true
    : false
}>;

type PreProcess<
  TContent,
  TComparator, 
> = TContent extends readonly unknown[]
  ? ProcessTuple<TContent, TComparator>
  : TContent extends (string | number)
    ? ProcessStr<AsString<TContent>, AsString<TComparator>>
    : false;

/**
 * **Contains**`<TContent, TComparator>`
 *
 * Checks whether `TContent` _contains_ a value of `TComparator`:
 * 
 * - when `TContent` is an array/tuple type then each item is compared to `TComparator`
 * - if `TContent` is a string or numeric type then it will report on whether `TComparator`
 * has been found as a string subset
 * 
 * **Related:** `NarrowlyContains`
 */
export type Contains<
  TContent extends string | number | readonly unknown[],
  TComparator,
> = [IsWideType<TContent>] extends [true]
    ? boolean
    : PreProcess<TContent, TComparator>;

