import { IfContains, Chars, RemoveNever, Concat } from "..";

type Process<
  TContent extends readonly string[],
  TDrop extends readonly string[],
> = RemoveNever<{
  [K in keyof TContent]: IfContains<
    TDrop, TContent[K],
    never,
    TContent[K]
  >
}>;

/**
 * **DropChars**`<TContent,TDrop>`
 * 
 * Removes all characters found in `TDrop` from the string content
 * in `TContent`.
 */
export type DropChars<
  TContent extends string,
  TDrop extends string
> = Process<Chars<TContent>, Chars<TDrop>> extends readonly string[]
? Concat<Process<Chars<TContent>, Chars<TDrop>>>
: "";


