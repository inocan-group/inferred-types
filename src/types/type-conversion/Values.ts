/* eslint-disable @typescript-eslint/ban-types */
import { AnyObject, IfEqual, ObjValues } from "src/types";


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
  T extends AnyObject | readonly unknown[]
> = T extends readonly unknown[]
  ? readonly [...T]
  : T extends AnyObject
    ? IfEqual<T, {}, readonly [],  ObjValues<T>>
    : readonly [];

