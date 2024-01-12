import {  
  AfterFirst,
  First,
  IfAllLiteral,
  IfEqual,
  IfUnion,
  Last,
  Pop,
  Shift,
  Slice,
} from "src/types";

type SplitOnce<
  TRemaining extends string,
  TSep extends string,
  TAnswer extends readonly string[] = []
> = TRemaining extends `${infer HEAD}${TSep}${infer TAIL}`
? SplitOnce<
    TAIL,
    TSep,
    [...TAnswer, HEAD]
  >
: [...TAnswer, TRemaining];

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

export type Cleanup<T extends readonly string[]> = IfEqual<
  Last<T>, "",
  Slice<T,0,-1>,
  T
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
> = IfAllLiteral<
  [ TStr, TSep ],
  // Both TStr and TSep are literals so we _can_ split type
  IfUnion<
    TSep,
    _SplitOnUnion<
      SplitOnce<TStr, "">, 
      TSep,
      TUnionPolicy
    >,
    Cleanup<
      SplitOnce<TStr,TSep>
    >
  >,
  // We must resort to a wide type since either TStr or TSep are wide
  readonly string[]
>;
