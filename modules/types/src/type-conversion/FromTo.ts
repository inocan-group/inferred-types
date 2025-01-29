/**
 * An object type which semantically is meant to express the
 * movement from one type to another.
 *
 * - it can be used to express any type movement but the most
 * common scenario is to move from one string literal to another
 * so both TFrom and TTo _default_ to `string`.
 */
export interface FromTo<
  TFrom = string,
  TTo = string,
> { from: TFrom; to: TTo }
