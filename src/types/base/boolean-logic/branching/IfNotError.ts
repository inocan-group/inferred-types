import { ErrorCondition, IsError, IsErrorOptions } from "src/types";


/**
 * **IfNotError**`<TType,TOptions,[IF],[ELSE]>`
 * 
 * Branching utility which returns type `IF` when `T` is neither a _never_
 * value nor a `ErrorCondition`. Otherwise returns `ELSE`.
 * 
 * - type of `
 * - type of `ELSE` is defaulted to `T` for convenience but can be set
 * to any type which is appropriate.
 * 
 * **Related:** `IfError`, `IfErrorCondition`
 */
export type IfNotError<
  TType,
  TOptions extends IsErrorOptions,
  IF = Exclude<TType, ErrorCondition>,
  ELSE = TType & ErrorCondition
> = IsError<TType, TOptions> extends false ? IF : ELSE;
