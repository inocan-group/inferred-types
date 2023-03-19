/* eslint-disable @typescript-eslint/ban-types */
import type { AnyObject, Concat, Container, ErrorCondition, IfEqual, IfLiteral, IsEqual, Keys, StrLen, ToString } from "src/types";


/**
 * Utility type which returns the length of:
 * 
 * - an _array_
 * - an _object_ (where length is the number of keys)
 * - a _string_
 * - a _number_ (it will provide the number of digits)
 * 
 * ```ts
 * type Three = Length<[ "a", "b", "c" ]>;
 * ```
 */
export type Length<T extends Container | string | number> = 
T extends string 
  ? IfLiteral<
      T, 
      StrLen<T>,
      number
    >
  : T extends number
    ? IfLiteral<T, StrLen<ToString<T>>, number>
    : T extends readonly unknown[] 
      ? T["length"]
      : T extends unknown[] 
        ? number 
        : T extends AnyObject
          ? IfEqual<T, {}, 0, Keys<T>["length"]>
          : number;

