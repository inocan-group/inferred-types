import { Narrowable , TypeGuard } from "inferred-types/dist/types/index";

/**
 * **TypeTuple**`<TType>`
 *
 * The Tuple containing:
 *  - a type _representation_
 *  - a type guard to validate
 *  - (optionally) a textual description of the type
 *
 * This provides a simple shorthand way of defining a type in a way
 * which can be used in the tooling for `Type` and `TypeDefn` but does
 * not represent a full-fledged `Type<T>`.
 */
export type TypeTuple<
  TType extends Narrowable = Narrowable,
  TDesc extends string = string
> = [
  type: TType,
  guard: TypeGuard<TType>,
  desc: TDesc
];
