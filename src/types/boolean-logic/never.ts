import { Narrowable } from "../Narrowable";

/**
 * **IfNever**`<T,IsNever,NotNever>`
 * 
 * Type utility which transforms type `T` based on whether it extends the _never_
 * type.
 */
export type IfNever<
  T,
  IsNever extends Narrowable,
  NotNever extends Narrowable = T
> = T extends never ? IsNever : NotNever;

/**
 * **IfNotNever**`<T,NotNever,Never>`
 * 
 * Boolean type test which tests whether `T` extends _never_.
 */
export type IfNotNever<
T,
NotNever extends Narrowable = T,
Never extends Narrowable = never
> = T extends never ? Never : NotNever;
