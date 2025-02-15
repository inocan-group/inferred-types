import { And, As, NumberLike } from "inferred-types/types";

export type TypeReplaceStrategy = "narrow" | "medium" | "wide";


export type Replacer<
  TContent,
  TFind,
  TReplace,
  TStrategy extends TypeReplaceStrategy
> = TStrategy extends "wide"
  ? TReplace
  : TStrategy extends "narrow"
  ? TReplace extends string
  ? And<[
    TFind extends boolean ? true : false,
    TContent extends boolean ? true : false
  ]> extends true
  ? `${As<TContent, boolean>}`
  : And<[
    TFind extends number ? true : false,
    TContent extends number ? true : false
  ]> extends true
  ? `${As<TContent, number>}`

  : TReplace
  : TReplace
  // strategy is "medium"
  : string extends TReplace
  //
  ? TContent extends NumberLike
  ? `${number}`
  : TContent extends boolean
  ? `${boolean}`
  : TReplace


  : TReplace
  ;


/**
 * **TypeReplace**`<TContent, TFind, TReplace>`
 *
 * Replaces instances of `TFind` type found in `TContent` with
 * `TReplace` type.
 */
export type TypeReplace<
  TContent,
  TFind,
  TReplace,
  TStrategy extends TypeReplaceStrategy = "narrow"
> = TContent extends string | number | null | undefined
  ? TContent extends TFind
  ? Replacer<TContent, TFind, TReplace, TStrategy>
  : TContent
  : TContent extends readonly unknown[]
  ? {
    [K in keyof TContent]: TContent[K] extends TFind
    ? Replacer<TContent[K], TFind, TReplace, TStrategy>
    : TypeReplace<TContent[K], TFind, TReplace>;
  }
  : TContent;


