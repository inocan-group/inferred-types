/* eslint-disable @typescript-eslint/ban-types */
import type { AnyObject,  Container, IfEqual, IfLiteral, IfStringLiteral, Keys, StrLen, ToString } from "..";


/**
 * Utility type which returns the length of:
 * 
 * - an _array_ (provides the number of elements)
 * - an _object_ (provides the number of keys)
 * - a _string_ (provides the number of chars)
 * - a _number_ (it will provide the number of digits)
 * 
 * ```ts
 * type Three = Length<[ "a", "b", "c" ]>;
 * ```
 */
export type Length<T extends Container | string | number> = 
T extends string 
  ? IfStringLiteral<
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

