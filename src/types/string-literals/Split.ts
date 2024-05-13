import {  
  AfterFirst,
  BeforeLast,
  Chars,
  Filter,
  First,
  If,
  IfUnion,
  IsStringLiteral,
  IsWideType,
  Last,
  TupleToUnion,
  UnionToTuple,
} from "src/types/index";

type UnionPolicy = "omit" | "include";


type UnionSplit<
  TContent extends readonly string[],
  TSep extends string,
  TUnionPolicy extends UnionPolicy,
  TResult extends readonly string[] = []
> = [] extends TContent
? TResult
: UnionSplit<
    AfterFirst<TContent>, // advance to next character
    TSep,
    TUnionPolicy,
    First<TContent> extends TSep
      ? // split mark
        [
          ...TResult,
          ...(
            TUnionPolicy extends "omit"
              ? [""]
              : [First<TContent>]
          )
        ]
      : // add to existing
        [
          ...BeforeLast<TResult>,
          `${Last<TResult,"">}${First<TContent>}`
        ]
>;

type LiteralSplit<
  TContent extends string,
  TSep extends string,
  TUnionPolicy extends UnionPolicy = "omit",
  TResults extends readonly string[] = []
> = TContent extends `${infer Block}${TSep}${infer Rest}`
? LiteralSplit<
    Rest,
    TSep,
    TUnionPolicy,
    [
      ...TResults,
      TUnionPolicy extends "omit" ? Block : `${Block}${TSep}`
    ]
  >
: Filter<[...TResults, TContent], "">;

type Process<
  TContent extends string,
  TSep extends string | readonly string[],
  TUnionPolicy extends UnionPolicy = "omit"
> = IsWideType<TContent> extends true
? string
: TSep extends readonly string[]
    ? TupleToUnion<TSep> extends string
      ? UnionSplit<Chars<TContent>,TupleToUnion<TSep>,TUnionPolicy>
      : never
    : TSep extends string
      ? LiteralSplit<TContent,TSep,TUnionPolicy>
      : never;

type PreProcess<TContent extends string,
TSep extends string | readonly string[],
TUnionPolicy extends UnionPolicy = "omit"
> = IfUnion<
  TSep,
  UnionToTuple<TSep> extends readonly string[]
  ? Process<TContent, UnionToTuple<TSep>, TUnionPolicy>
  : never,
  Process<TContent,TSep,TUnionPolicy>
>


/**
 * **Split**`<TContent,TSep,[TPolicy]>`
 * 
 * Type conversion utility which receives a string `TContent`,
 * and _splits_ it into multiple string elements based on `TSep`.
 * 
 * - `TSep` can be a _string_, a _union_ of string literals, or a tuple of strings
 * - typically you want to have the `TSep` _omitted_ from the result elements
 * but you can opt to include them by changing `TPolicy` to "include"
 */
export type Split<
  TContent extends string,
  TSep extends string | readonly string[],
  TPolicy extends UnionPolicy = "omit"
> = If<
  IsStringLiteral<TContent>,
  PreProcess<TContent,TSep,TPolicy>,
  string
>
