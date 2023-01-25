import { Concat } from "runtime/lists/Concat";
import { AnyObject, IsUndefined } from "../boolean-logic";
import { IfRef } from "../boolean-logic/IfRef";
import { IfLiteral } from "../boolean-logic/IsLiteral";
import { AnyFunction } from "../functions/function-types";
import { Narrowable } from "../literals/Narrowable";

/**
 * **ToString**
 * 
 * Converts any type into a string representation.
 * This utility works as advertised but is in early stages
 * so expect it to be refined over time.
 */
export type ToString<T extends Narrowable> = T extends string
  ? T
  : T extends number ? IfLiteral<T, `${T}`, `${number}`>
  : T extends boolean ? IfLiteral<T, `${T}`, `${boolean}`>
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
  : T extends any[] ? "any[]"
  : "unknown";
