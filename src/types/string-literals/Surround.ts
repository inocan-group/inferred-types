import { AfterFirst, AsArray, Concat, First } from "src/types/index";

type _Surround<
  TContent extends readonly string[],
  TPrefix extends string,
  TPostfix extends string,
  TResults extends readonly string[] = []
> = [] extends TContent
? TResults
: _Surround<
    AfterFirst<TContent>, 
    TPrefix, 
    TPostfix, 
    [...TResults, Concat<[TPrefix, First<TContent>, TPostfix]>]
  >;


/**
 * **Surround**`<TContent,TPrefix,TPostfix>`
 * 
 * Receives content -- either a string or an array of strings -- and then
 * proceeds to _surround_ the content with the prefix and postfix content.
 * 
 * ```ts
 * // "(hi)"
 * type T1 = Surround<"hi", "(", ")">;
 * // [ "<one>", "<two>" ]
 * type T2 = Surround<["one","two"], "<",">">;
 * ```
 */
export type Surround<
  TContent extends string | readonly string[],
  TPrefix extends string,
  TPostfix extends string
> = TContent extends readonly string[]
? _Surround<AsArray<TContent>, TPrefix, TPostfix>
: First<_Surround<AsArray<TContent>, TPrefix, TPostfix>>;
