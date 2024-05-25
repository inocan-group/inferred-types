 
import { LOWER_ALPHA_CHARS } from "src/constants/index";
import { AfterFirst, If, Extends, LowerAlphaChar } from "src/types/index";


type _Index<
  T extends readonly string[],
  IF,
  ELSE,
  Results extends readonly unknown[] = []
> = [] extends T
  ? Results
  : _Index<
      AfterFirst<T>,
      IF,
      ELSE,
      [
        ...Results,
        If<Extends<T, LowerAlphaChar>, IF, ELSE>
      ]
    >;

type Returns<
  T extends string | readonly string[],
  IF,
  ELSE
> = T extends string 
  ? If<Extends<T, LowerAlphaChar>, IF, ELSE> 
  : T extends readonly string[]
    ? _Index<T, IF, ELSE>
    : never;


/**
 * **ifLowercaseChar**(ch)
 * 
 * Tests whether a passed in character is lowercase and then uses the appropriate callback to
 * mutate the value.
 */
export function ifLowercaseChar<
  T extends string,
  IF,
  ELSE
>(
  ch: T,
  callbackForMatch: <V extends T>(v: V) => IF,
  callbackForNoMatch: <V extends T>(v: V) => ELSE
  ): Returns<T, IF, ELSE> {
    if (ch.length !== 1) {
      throw new Error(`call to ifUppercaseChar received ${ch.length} characters but is only valid when one character is passed in!`);
    }
    return (
      LOWER_ALPHA_CHARS.includes(ch as any)
      ? callbackForMatch(ch)
      : callbackForNoMatch(ch)
    ) as Returns<T, IF, ELSE>;
  }
