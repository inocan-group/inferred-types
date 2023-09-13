/* eslint-disable @typescript-eslint/no-explicit-any */
import { IfRef,  Narrowable,  VueRef } from "../../types/base";
import { isRef } from "src/runtime";

/**
 * **ifRef**(value, if, else)
 * 
 * tests the `value` passed in to see if it's a VueJS `Ref<T>` value and then provides 
 * two optional callback hooks to modify the value based on whether it is or is not.
 * 
 * - the default callbacks, if not provided by caller, return the "real" value of the property;
 * which means that it dereferences the `value` prop if it is a **Ref<T>** but otherwise just
 * return the base value passed in.
 */
export function ifRef<
  T extends Narrowable,
  IF extends <V extends VueRef & T>(ref: V) => any = <V extends VueRef & T>(ref: V) => V["value"],
  ELSE extends <V extends Exclude<T, VueRef>>(value: V ) => any = <V extends Exclude<T, VueRef>>(value: V ) => V
>(
  value: T,
  ifRef?: IF,
  notRef?: ELSE
): IfRef<T,ReturnType<IF>, ReturnType<ELSE>> {
  const if_cb = ifRef || ((v) => v.value) as IF;
  const else_cb = notRef || (v => v) as ELSE;

  return isRef(value)
    ? if_cb(value)
    : else_cb(value as Exclude<T, VueRef>);
}
