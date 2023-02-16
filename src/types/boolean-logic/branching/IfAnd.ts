/* eslint-disable no-use-before-define */
import { LogicFunction } from "../functions/LogicFunction";
import { And } from "./combinators/And";

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
  IF = true,
  ELSE = false,
  TParams extends readonly unknown[] = readonly unknown[],
> = And<TConditions> extends true ? IF : ELSE;