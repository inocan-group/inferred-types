/* eslint-disable @typescript-eslint/no-explicit-any */
import { LOWER_ALPHA_CHARS } from "src/constants";
import { IfChar, IfExtends, Narrowable, UpperAlphaChar, ValueCallback } from "src/types";

type Convert<T, IF, ELSE> = IfExtends<T, UpperAlphaChar, IF, ELSE>;

// type IterateChars<
//   T extends readonly string[],
//   IF,
//   ELSE,
//   Results extends readonly string[] = []
// > = [] extends T
//   ? Concat<Results>
//   : IterateChars<
//       AfterFirst<T>,
//       IF,
//       ELSE,
//       [ ...Results, ToString<Convert<First<T>, IF, ELSE>>]
//     >;

// type CallbackValue<
//   T extends string,
//   IF,
//   ELSE
// > = IfLength<T,1,T, IterateChars<Split<T>, IF, ELSE>>;

// type Index<
//   T extends readonly string[],
//   IF,
//   ELSE,
//   Results extends readonly string[] = []
// > = [] extends T
//   ? Results
//   : Index<
//       AfterFirst<T>,
//       IF,
//       ELSE,
//       [
//         ...Results,
//         ToString<Convert<First<T>, IF, ELSE>>
//       ]
//     >;

// type Returns<
//   T extends string,
//   IF,
//   ELSE
// > = IsChar<T> extends true
//   ? Convert<T, IF, ELSE>
//   : Index<Split<T>, IF, ELSE>;



/**
 * **ifUppercaseChar**(ch, callbackForMatch, callbackForNoMatch)
 * 
 * Tests whether a passed in _character_ is an uppercase character and uses appropriate callback to
 * mutate the value.
 * 
 * **Related:** `ifUppercase()`
 */
export function ifUppercaseChar<
  T extends string,
  IF extends Narrowable,
  ELSE extends Narrowable
>(
  /** the character to be tested */
  ch: T & IfChar<T>,
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
