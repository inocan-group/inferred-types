import { IfContains, Chars, RemoveNever, Concat } from "src/types/index";

type Process<
  TContent extends readonly string[],
  TDrop extends readonly string[],
> = RemoveNever<{
  [K in keyof TContent]: IfContains<
    TDrop, TContent[K],
    never, // filter out
    TContent[K]
  >
}>;

type P2<
  TContent extends string,
  TDrop extends string
> = Process<
Chars<TContent> extends readonly string[]
? Chars<TContent>
: never, 
Chars<TDrop> extends readonly string[]
? Chars<TDrop>
: never
> extends readonly string[]
? 
Process<
  Chars<TContent> extends readonly string[]
  ? Chars<TContent>
  : never, 
  Chars<TDrop> extends readonly string[]
  ? Chars<TDrop>
  : never
>
: "";

/**
 * **DropChars**`<TContent,TDrop>`
 * 
 * Removes all characters found in `TDrop` from the string content
 * in `TContent`.
 */
export type DropChars<
  TContent extends string,
  TDrop extends string
> = Concat<
  P2<TContent, TDrop> extends readonly unknown[]
  ? P2<TContent, TDrop>
  : never
>;
  


