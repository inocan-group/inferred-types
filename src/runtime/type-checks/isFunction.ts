import {   AnyObject, FnWithDict, IfExtends, IfTrue, Keys, Narrowable, Not } from "src/types";
import { IfAnd } from "src/types/boolean-logic/And";
import { IsFunction, IsFunctionWithDict } from "src/types/boolean-logic/functions";
import { IsLength } from "src/types/boolean-logic/IfLength";
import { keys } from "../keys";
import { isTypeOf } from "../type-guards/higher-order/isTypeOf";

/**
 * **isFunction**(input)
 * 
 * Checks whether a passed in value is a function and ensures run-time and types
 * are consistent.
 * ```ts
 * // true
 * const yup = isFunction(() => "hello world");
 * ```
 *
 * Note: the runtime `typeof [variable]` will correctly say "function" when a function is
 * encountered but if that function also has object types defined then the type will be a https://itsembedded.com/sysadmin/proxmox_bind_unprivileged_lxc/https://itsembedded.com/sysadmin/proxmox_bind_unprivileged_lxc/big
 * and ugly union type. This function will give you a proper boolean value in both cases.
 */
export function isFunction<T>(input: T): IsFunction<T> {
  return (typeof input === "function" ? true : false) as IsFunction<T>;
}

/**
 * **isFnWithDict**(input)
 *  
 * Type guard which checks whether a give variable is a function
 * which _also_ contains 
 */
export function isFnWithDict<
  TProps extends Record<string, any>
>(input: unknown): input is FnWithDict<TProps> {

  const value = isTypeOf("function", input) && keys(input)?.length > 0;

  return value as IfExtends<typeof input, FnWithDict<Record<string, any>>, true, false>
}
