import { isArray, isObject } from "src/runtime/index";
import { Container, IfContainer, Narrowable } from "src/types/index";

export function ifContainer<
  TVal extends Narrowable,
  IF extends Narrowable,
  ELSE extends Narrowable
>(
  value: TVal,
  ifContainer: <V extends TVal & Container>(val: V) => IF,
  notContainer: <V extends Exclude<TVal, Container>>(val: V) => ELSE
): IfContainer<TVal, IF, ELSE>  {
  return (
    isObject(value) || isArray(value)
    ? ifContainer(value)
    : notContainer(value as Exclude<TVal, Container>)
  ) as IfContainer<TVal, IF, ELSE>;
}
