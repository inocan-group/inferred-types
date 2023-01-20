import { AnyObject } from "../boolean-logic/object";
import { ObjValues } from "./ObjValues";

/**
 * **Values**`<T>`
 * 
 * Receives either an object or readonly array and:
 * 
 * - if **readonly array** it proxies it through
 * - if **object** then it converts the values of the object to a readonly array
 * 
 * **Related:** `ObjValues`
 */
export type Values<
  T extends AnyObject | readonly any[]
> = T extends readonly any[]
  ? readonly [...T]
  : ObjValues<T>;
