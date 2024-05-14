
import { Container, If, IsContainer, Narrowable } from "src/types/index";
import { isObject } from "../type-guards/isObject";
import { isArray } from "../type-guards/isArray";

export function ifContainer<
  TVal extends Narrowable,
  TIf extends Narrowable,
  TElse extends Narrowable
>(
  value: TVal,
  ifContainer: <V extends TVal & Container>(val: V) => TIf,
  notContainer: <V extends Exclude<TVal, Container>>(val: V) => TElse
): If<IsContainer<TVal>, TIf, TElse>  {
  return (
    isObject(value) || isArray(value)
    ? ifContainer(value)
    : notContainer(value as Exclude<TVal, Container>)
  ) as unknown as If<IsContainer<TVal>, TIf, TElse>;
}
