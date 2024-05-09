import {  
  AsString, 
  DoesExtend, 
  If, 
  IfAnd,
  IsString, 
  IsStringLiteral, 
  IsTuple, 
  IsUnion, 
  IsWideType, 
  Narrowable,
  Or,
  UnionToTuple,
} from "src/types/index";


type IsWide<
  TContent,
  TComparator
> = IsWideType<TContent> extends true
? IsWideType<TComparator> extends true
  ? true
  : false
: false;

type _IsLiteral<
  T
> = IsStringLiteral<T> extends true
? true
: IsTuple<T> extends true
? true
: false;

type Process<
  TContent,
  TComparator, 
> = TComparator extends readonly unknown[]
? Or<{
  [K in keyof TComparator]: Process<TContent, TComparator[K]>
}>
: If<
    IsWide<TContent,TComparator>,
    boolean,
    IfAnd<
      [
        _IsLiteral<TContent>, 
        _IsLiteral<TComparator>
      ], 
        AsString<TContent> extends `${string}${AsString<TComparator>}${string}`
          ? true
          : false,
        IfAnd<
          [
            _IsLiteral<TContent>,
            _IsLiteral<TComparator>
          ],
          If<DoesExtend<TContent,TComparator>, true, false>,
          IfAnd<
            [ IsString<TContent>, IsWideType<TContent> ],
            If<
              IsString<TComparator>, 
              boolean,
              If<DoesExtend<TContent,TComparator>, boolean, false>
            >,
            If<DoesExtend<TContent,TComparator>, true, false>
          >
        >
    >
>

/**
 * Processes each node of the tuple
 * and then `or` the result to reach
 * single consensus
 */
type ProcessTuple<
  TContent extends readonly unknown[],
  TComparator, 
> = {
  [K in keyof TContent]: [TContent[K]] extends [TComparator]
    ? true
    : false
};

type PreProcess<
TContent,
TComparator, 
> = TContent extends readonly unknown[]
  ? ProcessTuple<TContent, TComparator>
  : TContent extends (string | number)
    ? ProcessStr<AsString<TContent>, TComparator>
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
> = PreProcess<TContent, TComparator>;
