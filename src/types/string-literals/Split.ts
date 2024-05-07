import {  
  AfterFirst,
  AsString,
  BeforeLast,
  Chars,
  Filter,
  First,
  IfLength,
  IfOr,
  IfUnion,
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
> = IfOr<
[IsWideType<TContent>, IsWideType<TSep>],
string,

TSep extends readonly string[]
  ? UnionSplit<Chars<TContent>,TupleToUnion<TSep>,TUnionPolicy>
  : IfLength<
      TSep, 1, 
      UnionSplit<Chars<TContent>,AsString<TSep>,TUnionPolicy>,
      LiteralSplit<TContent,AsString<TSep>,TUnionPolicy>
    >
>;

export type Split<
  TContent extends string,
  TSep extends string | readonly string[],
  TUnionPolicy extends UnionPolicy = "omit"
> = IfUnion<
  TSep,
  UnionToTuple<TSep> extends readonly string[]
  ? Process<TContent, UnionToTuple<TSep>, TUnionPolicy>
  : never,
  Process<TContent,TSep,TUnionPolicy>
>
