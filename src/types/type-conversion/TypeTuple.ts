import { Narrowable } from "../Narrowable";
import { TypeGuard } from "../TypeGuard";

/**
 * **TypeTuple**`<TType>`
 * 
 * The pairing of:
 *  - a type _representation_
 *  - a type guard to validate
 *  - a textual description of the type
 * 
 * This provides a simple shorthand way of defining a type in a way
 * which can be used in the tooling for `Type` and `TypeDefn` but does
 * not represent a full-fledged `Type<T>`.
 */
export type TypeTuple<TType extends Narrowable, TDesc extends string> = [
  type: TType,
  guard: TypeGuard<TType>,
  desc: TDesc
];
