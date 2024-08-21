
import {
  As,
  Add,
  Chars,
  Concat,
  FixedLengthArray,
  IsPositiveNumber,
  Throw,
  If,
  IsNumericLiteral,
  IsGreaterThan,
  IsGreaterThanOrEqual,
  TakeFirst,
  IsNegativeNumber,
  Abs,
} from "src/types/index";

export type RemoveStart<
  TList extends readonly unknown[],
  TStart extends number,
> = TStart extends 0
? TList
: IsPositiveNumber<TStart> extends true
  ? TList extends [
      ...FixedLengthArray<unknown, TStart>,
      ...(infer REST)
    ]
      ? REST
      : Throw<"invalid-start-index">
: TList extends [
    ...FixedLengthArray<unknown, Add<TList["length"], TStart>>,
    ...(infer REST)
  ]
    ? REST
    : Throw<"invalid-start-index">;

export type TruncateAtLen<
  TList extends readonly unknown[],
  TLen extends number
> = IsNegativeNumber<TLen> extends true
? If<
    IsGreaterThan<Abs<TLen>, TList["length"]>,
    never,
    TakeFirst<TList, Add<TList["length"],TLen>>
  >
: If<
    IsGreaterThanOrEqual<TLen, TList["length"]>,
    TList,
    TakeFirst<TList, TLen>
  >;



export type Process<
  TList extends readonly unknown[],
  TStart extends number,
  TLen extends number | undefined
> = TList extends readonly unknown[]
? RemoveStart<
    TList,
    TStart
  > extends readonly unknown[]
    ? If<
        IsNumericLiteral<TLen>,
        TruncateAtLen<
          RemoveStart<
            TList,
            TStart
          >,
          As<TLen, number>
        >,
        // no length specified
        RemoveStart<
          TList,
          TStart
        >
      >


    : RemoveStart<
        TList,
        TStart
      >
: never

type PreProcess<
TList extends readonly unknown[],
TStart extends number,
TLen extends number | undefined = undefined,
> = TList extends string
? Chars<TList> extends readonly string[]
? Concat<
    As<
      Process<
        Chars<TList>,
        TStart,
        TLen
      >,
      readonly string[]
    >
  >
: never
: TList extends readonly unknown[]
? Process<TList,TStart,TLen>
: never;


/**
 * **Slice**`<TList, TStart, TLen>`
 *
 * Provides a slice of a tuple or a string.
 *
 * - negative indexes for `TEnd` can be used
 * - `TStart` defaults to 0
 * - `TLen` defaults to the all the remaining elements
 * but can be any amount; if you use negative values this
 * will drop that many values off the end of the tuple
 */
export type Slice<
  TList extends readonly unknown[] | string,
  TStart extends number,
  TLen extends number | undefined = undefined,
> = TList extends string
? Concat<As<PreProcess<Chars<TList>, TStart, TLen>, readonly string[]>>
: TList extends readonly unknown[]
? PreProcess<TList, TStart, TLen> extends readonly unknown[]
? PreProcess<TList, TStart, TLen>
: never
: never;



