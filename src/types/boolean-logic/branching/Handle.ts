import { 
  IsNever, 
  IsEqual, 
  Filter, 
  If, 
  IsUnion, 
  TupleToUnion, 
  UnionToTuple 
} from "src/types/index";

type Narrow<
  TContent,
  THandle
> = IsUnion<TContent> extends true
  ? UnionToTuple<TContent> extends readonly unknown[]
    ? Filter<UnionToTuple<TContent>, THandle> extends readonly unknown[]
      ? TupleToUnion<Filter<UnionToTuple<TContent>, THandle>>
      : never
  : never
: TContent;


/**
 * **Handle**`<TContent,THandle,TMapTo,[TSpecificity]>`
 * 
 * Maps `TContent` when it _extends_ / _equals (based on `TSpecificity`) the type
 * of `THandle` to `TMapTo`, otherwise it just proxies the value through.
 * 
 * - `TSpecificity` defaults to _extends_ but can be set to _equals_
 * 
 * **Related:** `THandle`
 */
export type Handle<
  TContent,
  THandle,
  TMapTo,
  TSpecificity extends "extends" | "equals" = "extends"
> = If<
  IsNever<THandle>,
  If<IsNever<TContent>, TMapTo, TContent>,
  If<
    IsEqual<TSpecificity, "extends">,
    [TContent] extends [THandle]
      ? TMapTo
      : Narrow<TContent,THandle>,
    If<
      IsEqual<[TContent], [THandle]>,
      TMapTo,
      TContent
    >
  >
>
