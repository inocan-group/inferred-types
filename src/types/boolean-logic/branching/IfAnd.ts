/* eslint-disable no-use-before-define */
import { And, LogicFunction } from "src/types/index";

/**
 * **IfAnd**`<TConditions[], [IF], [ELSE], [TParams]>`
 * 
 * Takes an array of _conditions_ and if all of them evaluate to `true`
 * then the `IF` type is returned otherwise the `ELSE` type.
 * 
 * - By default, `IF` is **true** and `ELSE` is **false**.
 * - If `TParams` is passed in -- as a tuple of values -- and a function 
 * is encountered in the conditions tuple then `TParams` will be used as
 * parameters passed into the function.
 */
export type IfAnd<
  TConditions extends (readonly (boolean | LogicFunction<TParams>)[])
| (boolean | LogicFunction<TParams>)[],
  IF = true,
  ELSE = false,
  TParams extends readonly unknown[] = readonly unknown[],
> = [And<TConditions>] extends [true] 
? IF 
: [And<TConditions>] extends [false] 
  ? ELSE 
  : [And<TConditions>] extends [boolean] ? IF | ELSE : ELSE ;
