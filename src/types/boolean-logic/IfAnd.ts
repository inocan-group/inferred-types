import { LogicFunction } from "../functions/LogicFunction";
import { Narrowable } from "../literals/Narrowable";
import { And } from "./And";

/**
 * **IfAnd**`<TConditions[], [IF], [ELSE], [TParams]>`
 * 
 * Takes an array of _conditions_ and if all of them evaluate to `true`
 * then the `IF` type is returned otherwise the `ELSE` type.
 * 
 * By default `IF` is **true** and `ELSE` is **false**.
 */
export type IfAnd<
  TConditions extends readonly (boolean | LogicFunction<TParams>)[],
  IF extends Narrowable = true,
  ELSE extends Narrowable = false,
  TParams extends readonly unknown[] = readonly [],
> = And<TConditions> extends true ? IF : ELSE; 
  
