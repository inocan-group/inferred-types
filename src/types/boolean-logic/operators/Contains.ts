import { 
  AfterFirst, 
  AsString, 
  First, 
  IfAnd, 
  IfStringLiteral, 
  IfUnion, 
  IsString, 
  Narrowable,
} from "src/types/index";

/**
 * **Contains**`<TContent, TContains>`
 *
 * Checks whether a list -- `TContent` -- contains a value of `TContains`.
 * 
 * **Related:** `NarrowlyContains`
 */
export type Contains<
  TContent extends (readonly unknown[]) | Narrowable,
  TContains, 
> = TContent extends readonly unknown[]
? [] extends TContent
  ? false
  : First<TContent> extends TContains
  ? true
  : [] extends AfterFirst<TContent>
  ? false
  : Contains<AfterFirst<TContent>, TContains>
: IfUnion<
    TContent,
    // treat a union for TContent in same manner as Tuple value
    "union",
    // not a union type
    IfAnd<
      // when we have string literals for both generics we can
      // look for a substring
      [IsString<TContent>, IsString<TContains>],
      IfStringLiteral<
        TContent,
        AsString<TContent> extends `${string}${AsString<TContains>}${string}`
          ? true
          : TContent extends TContains
            ? true
            : false,
        boolean
      >
    >
>
