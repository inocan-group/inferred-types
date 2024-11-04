 
import { 
  AnyFunction, 
  AnyObject,  
  IsVueRef, 
  IsUndefined, 
  Narrowable, 
  Concat, 
  If, 
  IsNumericLiteral, 
  IsBooleanLiteral
} from "src/types/index";

/**
 * **ToString**
 * 
 * Converts _any_ type into a string representation.
 * This utility works as advertised but is in early stages
 * so expect it to be refined over time.
 * 
 * **Related:** `AsString`
 */
export type ToString<T> = T extends string
  ? T
  : T extends number ? If<IsNumericLiteral<T>, `${T}`, `${number}`>
  : T extends boolean ? If<IsBooleanLiteral<T>, `${T}` , `${boolean}`>
  : T extends null ? "null"
  : IsUndefined<T> extends true ? "undefined"
  : T extends AnyObject ? If<
      IsVueRef<T>,
      T,
      Concat<["Ref<", T extends { value: Narrowable } ? ToString<T["value"]> : "", ">"]>,
      T extends { name: string} ? `Object(${T["name"]})` : "Object"
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
