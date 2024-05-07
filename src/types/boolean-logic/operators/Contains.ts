import {  
  AsString, 
  DoesExtend, 
  If, 
  IfAnd,
  IfUnion,  
  IsLiteral, 
  IsString, 
  IsWideType, 
  Narrowable,
  Or,
  UnionToTuple,
} from "src/types/index";


type Process<
  TContent,
  TComparator, 
> = TComparator extends readonly unknown[]
? Or<{
    [K in keyof TComparator]: Process<TContent, TComparator[K]>
  }>
: IfAnd<
    [IsWideType<TContent>,IsWideType<TComparator>],
    boolean,
    IfAnd<
      [IsLiteral<TContent>, IsLiteral<TComparator>], 
        AsString<TContent> extends `${string}${AsString<TComparator>}${string}`
          ? true
          : false,
        IfAnd<
          [IsLiteral<TComparator>, IsLiteral<TContent>],
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
  TContent,
  TComparator, 
> = TContent extends (readonly unknown[])
? Or<{
    [K in keyof TContent]: Process<
      TContent[K],
      IfUnion<TComparator, UnionToTuple<TComparator>, TComparator>
    >
  }>
: TContent extends Narrowable
  ? Process<
      TContent,
      IfUnion<TComparator, UnionToTuple<TComparator>, TComparator>
    >
  : false;
