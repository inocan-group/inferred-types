/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyFunction, AnyObject,IfLiteral, IfRef, IsUndefined, Narrowable, Concat} from "src/types";

/**
 * **ToString**
 * 
 * Converts any type into a string representation.
 * This utility works as advertised but is in early stages
 * so expect it to be refined over time.
 */
export type ToString<T> = T extends string
  ? T
  : T extends number ? IfLiteral<T, `${T}`, `${number}`>
  : T extends boolean ? IfLiteral<T, `${T}` , `${boolean}`>
  : T extends null ? "null"
  : IsUndefined<T> extends true ? "undefined"
  : T extends AnyObject ? IfRef<
      T,
      Concat<["Ref<", T extends { value: Narrowable } ? ToString<T["value"]> : "", ">"]>,
      "Object"
    >
  : T extends symbol ? "symbol"
  : T extends string[] ? "string[]"
  : T extends number[] ? "number[]"
  : T extends boolean[] ? "boolean[]"
  : T extends AnyFunction[] ? "Function[]"
  : T extends AnyObject[] ? "Object[]"
  : T extends unknown[] ? "unknown[]"
  : T extends any[] ? "any[]"
  : "unknown";
