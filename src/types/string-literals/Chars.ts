import { IfLength, IfNotStringLiteral, IfStringLiteral } from "src/types/index";

type Process<
  TStr extends string,
  TResult extends readonly string[] = []
> = IfStringLiteral<
  TStr,
  IfLength<
    TStr, 0, 
    TResult,
    TStr extends `${infer Char}${infer Rest}`
      ? Process<
          Rest,
          [...TResult, Char]
        >
      : never
  >,
  string
>;


/**
 * **Chars**`<TStr>`
 * 
 * Takes a literal string and converts it to an array of characters.
 */
export type Chars<TStr extends string> = IfNotStringLiteral<
  TStr, 
  readonly string[],
  Process<TStr> extends readonly string[]
    ? Process<TStr>
    : never
>;
