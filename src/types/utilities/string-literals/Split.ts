import {  
  IfStringLiteral, 
  IsEqual, 
  Tuple, 
  Last, 
  Pop, 
  IfAnd, 
  IfEqual, 
  IfUnion, 
  AfterFirst, 
  First, 
  Shift
} from "src/types";

type _Split<
  T extends string,
  SEP extends string,
  ANSWER extends readonly string[] = []
> = T extends `${infer HEAD}${SEP}${infer TAIL}`
  ? _Split<TAIL, SEP, [...ANSWER, HEAD]>
  : [...ANSWER, T];

type AppendToLastBlock<
  TContent extends string,
  TBlocks extends readonly string[]
> = Pop<TBlocks> extends readonly string[]
  ? Last<TBlocks> extends string
    ? [...Pop<TBlocks>, `${Last<TBlocks>}${TContent}`]
    : TBlocks
  : TBlocks;

type AddNewBlock<
  TSep extends string,
  TBlocks extends readonly string[],
  TUnionPolicy extends "retain" | "omit"
> = TUnionPolicy extends "retain"
  ? [...TBlocks, TSep]
  : [...TBlocks, ""];

type _SplitOnUnion<
  TContent extends readonly string[],
  TSep extends string,
  TUnionPolicy extends "retain" | "omit",
  TBlocks extends readonly string[] = [""]
> = [] extends TContent
  ? Shift<TBlocks>
  : _SplitOnUnion<
      AfterFirst<TContent>,
      TSep,
      TUnionPolicy,
      First<TContent> extends TSep
        ? AddNewBlock<
            First<TContent>, 
            TBlocks, 
            TUnionPolicy
          >
        : AppendToLastBlock<First<TContent>,TBlocks>
    >;

type Cleanup<
  TList extends Tuple<string>,
  TSep extends string,
> = IfAnd<[
      IsEqual<Last<TList>, "">,
      IsEqual<TSep, "">
    ],
    Pop<TList>,
    IfEqual<TList, [""], [], TList>
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
> = IfStringLiteral<
  TStr,
  IfUnion<
    TSep,
    // separator is a union type
    _SplitOnUnion<
      Cleanup<_Split<TStr, "">, "">, 
      TSep,
      TUnionPolicy
    >,
    IfStringLiteral<
      TSep,
      // separator is a literal so split
      Cleanup<_Split<TStr,TSep>, TSep>,
      // a wide separator can not determine the letters at design time
      string[]
    >
  >,
  // while the separator may have been a literal, the evaluated string
  // is not and a wide `TStr` is not able to be split at design time
  // and therefore can only return a generic type
  string[]
>;


