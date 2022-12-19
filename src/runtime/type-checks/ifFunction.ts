import { IfFunction } from "src/types/boolean-logic/functions";
import { Narrowable } from "src/types/Narrowable";
import { AnyFunction } from "./isFunction";

export function ifFunction<
  T extends Narrowable,
  TRUE extends Narrowable,
  FALSE extends Narrowable
>(
  thing: T, 
  isFn: <Fn extends Narrowable & AnyFunction>(fn: Fn & T) => TRUE, 
  notFn: <NotFn extends Exclude<T, AnyFunction>>(fn: NotFn) => FALSE
): IfFunction<T, TRUE, FALSE> {
  return (
    typeof thing === "function"
    ? isFn(thing as any)
    : notFn(thing as any) as FALSE
  ) as IfFunction<T, TRUE, FALSE>;
}