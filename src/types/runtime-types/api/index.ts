import { TypeApiBoolean } from "./boolean";
import { TypeApiNumber } from "./number";
import { TypeApiNumericLiteral } from "./numericLiteral";
import { TypeApiString } from "./string";
import { TypeApiStringLiteral } from "./stringLiteral";

/**
 * **TypeApi**
 * 
 * A builder API surface to create a runtime `Type` definition.
 */
export type TypeApi = {
  /** a _wide_ string type */
  string: TypeApiString;
  /** 
   * **stringLiteral**(literals,options)
   * 
   * A _narrow_ string literal value.
   * ```ts
   * // "foo" | "bar" | "baz"
   * const t1 = type(d => d.stringLiteral(["foo", "bar", "baz"]));
   * // `Hi ${string}`
   * const t2 = type(d => d.stringLiteral(s => s.startsWith("Hi ")));
   * ```
   */
  stringLiteral: TypeApiStringLiteral;
  number: TypeApiNumber;
  numericLiteral: TypeApiNumericLiteral;
  boolean: TypeApiBoolean;
};
