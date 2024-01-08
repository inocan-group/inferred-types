import {  IsErrorOptions, ErrorCondition, IsError } from "src/types/index";

/**
 * **IfError**`<TType,TOptions,IF,[ELSE]>`
 * 
 * Branching utility which returns type `IF` when `TType` is either an 
 * `ErrorCondition` or the type of `never`. In all other cases the
 * type `ELSE` is returned.
 * 
 * - type of `ELSE` is defaulted to `TType` for convenience but can be set
 * to any type which is appropriate.
 * 
 * **Related:** `IfNotError`, `IfErrorCondition`
 */
export type IfError<
TType,
TOptions extends IsErrorOptions,
IF,
ELSE = Exclude<TType, ErrorCondition>
> = IsError<TType,TOptions> extends true
? IF
: ELSE;
