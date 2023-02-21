import { IfLiteral, IfEquals, DoesExtend } from "src/types/boolean-logic";
import { ErrorCondition } from "src/types/errors";
import { Concat, NumericChar } from "src/types/string-literals";
import { ToString, ToNumber } from "src/types/type-conversion";
import { Digitize } from "./Digitize";

type _NextDigit<T> = T extends "0" ? 1
: T extends "1" ? 2
: T extends "2" ? 3
: T extends "3" ? 4
: T extends "4" ? 5
: T extends "5" ? 6
: T extends "6" ? 7
: T extends "7" ? 8
: T extends "8" ? 9
: T extends "9" ? 0
: never;

type _OneDigit<T> = any;
type _TwoDigit<T> = any;

type _Inc<
  T extends readonly number[],
  TResults extends readonly number[] = []
> = ;


/**
 * **Increment**`<T>`
 * 
 * Increments the value of a numeric literal by one. 
 * 
 * - Note: can also receive a string literal which extends `${number}`
 */
export type Increment<T extends number | string> = IfLiteral<
  T,
  T extends string
    ? T extends `${number}` 
      ? ToString<Increment<ToNumber<T>>> // increment a string literal of a number
      : ErrorCondition<
          "invalid-string-literal", 
          Concat<["Increment<T> allows for string literals to be passed in but only if they are of the type `${number}` and T was ",T]>, 
          "Increment<T>"
        >
    : T extends number ? _Inc<Digitize<T>> : never,
  ErrorCondition<"invalid-wide-type", "Increment<T> requires a literal value to be able to modify the type, a wide value was passed in!", "Increment<T>">
>;

