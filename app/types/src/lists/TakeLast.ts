

import {
  TakeFirst,
  Reverse
} from "@inferred-types/types";



/**
 * **TakeLast**`<TContent,TLen,[THandle]>`
 *
 * Takes the last `TLen` items from `TContent` and discards the rest.
 *
 * Note:
 * - by default if `TLen` is larger than the size of `TContent` this
 * is fine and instead of getting precisely `TLen` elements you'll get
 * `TLen` element when available otherwise just the full tuple length
 * of `TContent`
 * - if you want a precise length, then set `THandle` to "throw" and
 * an error will be thrown.
 */
export type TakeLast<
  TContent extends readonly unknown[],
  TLen extends number,
  THandle extends "ignore" | "throw" = "ignore"
> = TakeFirst<
  Reverse<TContent>,
  TLen,
  THandle
>;
