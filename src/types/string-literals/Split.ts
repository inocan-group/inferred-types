import {  
  AfterFirst,
  IfEqual,
  IfLength,
  IfStringLiteral,
  IfUnion,
  IsLiteral,
  UnionToTuple,
} from "src/types/index";

type UnionPolicy = "omit" | "leading" | "trailing";

type Take<
  TStr extends string,
  TSep extends string,
> = TStr extends `${infer Content}${TSep}${infer Rest}`
? { content: Content; separator: TSep; rest: Rest}
: null;

type SplitOnce<
  TStr extends string,
  TSep extends string,
  TPolicy extends UnionPolicy = "omit",
  TOutputs extends readonly string[] = []
> = Take<TStr, TSep> extends null
? IfEqual<
    TStr, "",
    TOutputs,
    [...TOutputs, TStr]
  >
: Take<TStr, TSep> extends { content: string; separator: string; rest: string}
  ? SplitOnce<
      Take<TStr, TSep>["rest"],
      TSep,
      TPolicy,
      [
        ...TOutputs,
        Take<TStr, TSep>["content"]
      ]
    >
  : never;


type SplitChars<
  TStr extends string,
  TResult extends readonly string[] = []
> = IfStringLiteral<
  TStr,
  IfLength<
    TStr, 0, 
    TResult,
    TStr extends `${infer Char}${infer Rest}`
      ? SplitChars<
          Rest,
        [...TResult, Char]
      >
      : never
  >,
  string
>;


type ProcessEach<
  TContent extends readonly string[],
  TIndexBy extends readonly string[],
  TUnionPolicy extends UnionPolicy
> = {
[KIndex in keyof TIndexBy]: {
  [KOut in keyof TContent]: TContent[KOut] extends string
  ? TIndexBy[KIndex] extends string
    ? SplitOnce<
        TContent[KOut],
        TIndexBy[KIndex],
        TUnionPolicy
      >
    : never
  : never
}[number]
}[number];


type Process<
  TInputs extends readonly string[],
  TIndexBy extends readonly string[],
  TUnionPolicy extends UnionPolicy = "omit",
  TOutputs extends readonly string[] = [],
> = [] extends TInputs
? TOutputs
: Process<
    AfterFirst<TInputs>,
    TIndexBy,
    TUnionPolicy,
    [
      ...TOutputs,
      ...(
        ProcessEach<TOutputs,TIndexBy,TUnionPolicy> extends readonly string[] 
          ? ProcessEach<TOutputs,TIndexBy,TUnionPolicy> 
          : []
      )
    ]
  >
;


/**
 * **Split**`<TStr, [SEP]>`
 *
 * Splits a string `TStr` by a separator `SEP`. 
 * 
 * - the result is an array of string literals when `T` and `SEP` 
 * are string literals.
 * - if `T` _or_ `SEP` are wide string then the resultant type is just `string[]`
 * - if no `SEP` is provided then an empty string literal is used which has the
 * effect of converting the string into an array of characters.
 * 
 * **Note:** the `Chars` type utility wraps the functionality of having
 * no `SEP` character and may be more intuitive to viewers when seen.
 */
export type Split<
  TStr extends string,
  TSep extends string = "",
  TUnionPolicy extends UnionPolicy = "omit"
> = IfUnion<
  TSep,
  UnionToTuple<TSep> extends readonly string[]
  ? Process<[TStr], UnionToTuple<TSep>, TUnionPolicy>
  : string
  ,
  IfEqual<
    TSep, "",
    SplitChars<TStr>,
    IfEqual<
      TSep, TStr, ["",""],
      IsLiteral<TStr> extends true
      ? IsLiteral<TSep> extends true
        ? SplitOnce<TStr,TSep, TUnionPolicy>
        : string[]
      : string[]
    >
  >
>

