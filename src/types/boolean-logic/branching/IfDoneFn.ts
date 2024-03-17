import { AsDoneFn, Fn } from "src/types/index";


/**
 * **IfDoneFn**`<T, [TIf], [TElse]>`
 * 
 * Branching utility which checks `T` has a property "done" which is a function.
 * If so then the `TIf` type is returned, otherwise `TElse`.
 * 
 * - `TIf` _by default_ will return the return value of the done function
 * - `TElse` _by default_ will return the value `T`
 */
export type IfDoneFn<
  T,
  TIf = ReturnType<AsDoneFn<T>["done"]>,
  TElse = T
> = T extends { done: Fn } 
? TIf
: TElse;
