import { Filter, If, IsUnion, TupleToUnion, UnionToTuple } from "../..";
import { IfEquals } from "./IfEqual";
import { IfNever } from "./IfNever";

type Narrow<
  TContent,
  THandle
> = If<
  IsUnion<TContent>,
  TupleToUnion<Filter<UnionToTuple<TContent>, THandle>>,
  TContent
>


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
> = IfNever<
  THandle,
  IfNever<TContent, TMapTo, TContent>,
  IfEquals<
    TSpecificity, "extends",
    [TContent] extends [THandle]
      ? TMapTo
      : Narrow<TContent,THandle>,
    IfEquals<
      [TContent], [THandle],
      TMapTo,
      Narrow<TContent,THandle>
    >
  >
>
