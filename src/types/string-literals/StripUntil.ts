import { AfterFirst, First, Shift,Chars } from "src/types/index";


type Process<
  TChars extends readonly string[],
  TOp extends "is" | "not",
  TComparator extends string,
  TResult extends string
> = [] extends TChars
? TResult
: First<TChars> extends TComparator
  ? TOp extends "is"
    ? Process<
        AfterFirst<TChars>,
        TOp,
        TComparator,
        Shift<TResult>
      >
    : TResult
  : TOp extends "is"
    ? TResult
    : Process<
        AfterFirst<TChars>,
        TOp,
        TComparator,
        Shift<TResult>
      >;



export type StripUntil<
  TContent extends string,
  TComparator extends string,
> = Process<Chars<TContent>,"not",TComparator, TContent>;




export type StripWhile<
  TContent extends string,
  TComparator extends string
> = Process<Chars<TContent>,"is",TComparator, TContent>;
