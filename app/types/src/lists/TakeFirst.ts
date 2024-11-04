import {
  IsGreaterThan,
  If,
  Throw,
  IsEqual,
  AfterFirst,
  Increment,
  First,
  IsGreaterThanOrEqual
} from "@inferred-types/types";


type Process<
  TContent extends readonly unknown[],
  TLen extends number,
  TIdx extends number = 0,
  TResult extends readonly unknown[] = []
> = [] extends TContent
? TResult
: If<
    IsGreaterThanOrEqual<TIdx,TLen>,
    TResult,
    Process<
      AfterFirst<TContent>,
      TLen,
      Increment<TIdx>,
      [
        ...TResult,
        First<TContent>
      ]
    >
  >;




/**
 * **TakeFirst**`<TContent,TLen,[THandle]>`
 *
 * Takes the first `TLen` items from `TContent` and discards the rest.
 *
 * Note:
 * - by default if `TLen` is larger than the size of `TContent` this
 * is fine and instead of getting precisely `TLen` elements you'll get
 * `TLen` element when available otherwise just the full tuple length
 * of `TContent`
 * - if you want a precise length, then set `THandle` to "throw" and
 * an error will be thrown.
 */
export type TakeFirst<
  TContent extends readonly unknown[],
  TLen extends number,
  THandle extends "ignore" | "throw" = "ignore"
> = If<
  IsGreaterThan<TLen, TContent["length"]>,
  // TLen greater than TContent length
  If<
    THandle extends "ignore" ? true : false,
    TContent,
    Throw<"invalid-length", `TakeFirst<TContent,TLen> was called where the length of TLen(${TLen}) was greater than the length of the content (${TContent["length"]})!`>
  >,
  If<
    IsEqual<TLen, TContent["length"]>,
    TContent,
    Process<TContent,TLen>
  >
>;
