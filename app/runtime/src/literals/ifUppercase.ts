
import { LOWER_ALPHA_CHARS } from "inferred-types";
import { Extends, If, IsSingleChar, Narrowable,  UpperAlphaChar, ValueCallback } from "@inferred-types/types";

type Convert<T, IF, ELSE> = If<Extends<T, UpperAlphaChar>, IF, ELSE>;

/**
 * **ifUppercaseChar**(ch, callbackForMatch, callbackForNoMatch)
 *
 * Tests whether a passed in _character_ is an uppercase character and uses appropriate callback
 * to mutate the value.
 *
 * **Related:** `ifUppercase()`
 */
export function ifUppercaseChar<
  T extends string,
  IF extends Narrowable,
  ELSE extends Narrowable
>(
  /** the character to be tested */
  ch: T & IsSingleChar<T> extends true ? T : never,
  callbackForMatch: ValueCallback<T, IF>,
  callbackForNoMatch: ValueCallback<T, ELSE>
): Convert<T,IF,ELSE> {
  if(ch.length !== 1) {
    throw new Error(`Invalid string length passed to ifUppercaseChar(ch); this function requires a single character but ${ch.length} were received`);
  }
  return (
    LOWER_ALPHA_CHARS.includes(ch as any)
      ? callbackForMatch(ch)
      : callbackForNoMatch(ch)
  ) as Convert<T,IF,ELSE>;
}

