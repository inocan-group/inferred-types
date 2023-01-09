
import { IsUndefined } from "../boolean-logic";
import { IfLiteral } from "../boolean-logic/IsLiteral";
import { AnyFunction } from "../functions/function-types";


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
  : T extends boolean ? IfLiteral<T, `${T}`, `${boolean}`>
  : T extends null ? "null"
  : IsUndefined<T> extends true ? "undefined"
  : T extends string[] ? "string[]"
  : T extends number[] ? "number[]"
  : T extends boolean[] ? "boolean[]"
  : T extends AnyFunction[] ? "Function[]"
  : "other";
