import {  
  AfterFirst,
  First,
  IfEqual,
  IfLength,
  IfStringLiteral,
  IfUnion,
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
// finish up
? IfEqual<
    TStr, "",
    TOutputs,
    [...TOutputs, TStr]
  >
// work to be done
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

type MutateSplitResults<
    TInput extends readonly string[],
    TSplit extends string,
    TUnionPolicy extends UnionPolicy,
    TOutput extends readonly string[] = []
> = [] extends TInput 
? TOutput
: MutateSplitResults<
    AfterFirst<TInput>,
    TSplit,
    TUnionPolicy,
    [
      ...TOutput,
      // First<TInput> extends string
      ...(SplitOnce<First<TInput>,TSplit, TUnionPolicy> extends readonly string[]
        ? SplitOnce<First<TInput>,TSplit, TUnionPolicy>
        : []
      )
      // ? ...SplitOnce<First<TInput>,TSplit, TUnionPolicy>
      // : []
    ]
  >;

/**
 * Iterates over all of the separators provided
 */
type ProcessSeparators<
  TInputs extends readonly string[],
  TIndexBy extends readonly string[],
  TUnionPolicy extends UnionPolicy = "omit",
  TResults extends readonly string[] = [],
> = [] extends TIndexBy
?  TResults
:  ProcessSeparators<
      MutateSplitResults<TInputs, First<TIndexBy>,TUnionPolicy>,
      AfterFirst<TIndexBy>,
      TUnionPolicy,
      [
        ...TResults,
        
      ]
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
  TUnionPolicy extends UnionPolicy = "omit"
> = IfUnion<
  TSep,
  UnionToTuple<TSep> extends readonly string[]
  ? ProcessSeparators<[TStr], UnionToTuple<TSep>, TUnionPolicy>
  : string
  ,
  IfEqual<TSep, "",
    SplitChars<TStr>,
    SplitOnce<TStr,TSep, TUnionPolicy>
  >
>

