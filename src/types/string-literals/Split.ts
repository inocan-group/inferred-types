import {  
  AfterFirst,
  And,
  First,
  HasWideValues,
  IfLength,
  IfStringLiteral,
  IfUnion,
  IsStringLiteral,
  UnionToTuple,
} from "src/types/index";

type SplitOnce<
  TStr extends string,
  TSep extends string,
  TPolicy extends "retain" | "omit" = "omit",
  TAnswer extends readonly string[] = []
> = [TStr] extends [`${infer HEAD}${TSep}${infer TAIL}`]
? SplitOnce<
    TAIL,
    TSep,
    TPolicy,
    TPolicy extends "retain"
    ? [...TAnswer, HEAD]
    : [...TAnswer, HEAD]
  >
: [...TAnswer, TStr];

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

type ReSplitEachResult<
  TInputs extends readonly string[],
  TSep extends string,
  TPolicy extends "retain" | "omit",
  TOutputs extends readonly string[] = []
> = [] extends TInputs
? TOutputs
: ReSplitEachResult<
    AfterFirst<TInputs>,
    TSep,
    TPolicy,
    [
      ...TOutputs,
      ...SplitOnce<First<TInputs>, TSep>,
    ]
  >;

type UnionSplit<
  TResults extends readonly string[],
  TSeparators extends readonly string[],
  TPolicy extends "retain" | "omit" = "omit",
> = [] extends TSeparators
? TResults
: UnionSplit<
    ReSplitEachResult<
      TResults,
      First<TSeparators>,
      TPolicy
    > extends readonly string[]
    ? ReSplitEachResult<
        TResults,
        First<TSeparators>,
        TPolicy
      >
    : never,
    AfterFirst<TSeparators>,
    TPolicy
  >


type _Split<
TStr extends string,
TSep extends string = "",
TUnionPolicy extends "retain" | "omit" = "omit"
> = IfUnion<
TSep,
// union type
UnionToTuple<TSep> extends readonly string[]
? UnionSplit<[TStr],UnionToTuple<TSep>,TUnionPolicy>
: never
,
// not a union type
  And<[IsStringLiteral<TStr>, IsStringLiteral<TSep>]> extends true
  ? SplitOnce<TStr,TSep>
  : HasWideValues<SplitOnce<TStr,TSep>> extends true
      ? string[]
      : SplitOnce<TStr,TSep>
>;




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
  TUnionPolicy extends "retain" | "omit" = "omit"
> = TSep extends ""
? SplitChars<TStr>
: _Split<TStr,TSep,TUnionPolicy>;


// IfAllLiteral<
//   [ TStr, TSep ],
//   // Both TStr and TSep are literals so we _can_ split type
//   IfUnion<
//     TSep,
//     // union type
//     // TODO: this is not currently working
//     UnionToTuple<TSep> extends readonly string[]
//      ? UnionSplit<[TStr],UnionToTuple<TSep>,TUnionPolicy>
//      : never
//     ,
//     // not a union type
//     Cleanup<
//       SplitOnce<TStr,TSep>
//     >
//   >,
//   // We must resort to a wide type since either TStr or TSep are wide
//   readonly string[]
// >;


