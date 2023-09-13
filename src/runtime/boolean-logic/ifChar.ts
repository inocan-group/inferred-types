import { IfChar, Narrowable } from "../../types/base";
import { Never } from "src/constants";

type Callback<T extends string, R> = <V extends T>(v: V) => R;

const def_if = <V extends string>(v: V) => v;
const def_else = () => Never;

export function ifChar<
  T extends string,
  IF extends Narrowable,
  ELSE extends Narrowable
>(
  ch: T,
  callback_if_match: Callback<T,IF> = def_if as Callback<T,IF>,
  callback_not_match: Callback<T,ELSE> = def_else as Callback<T,ELSE>
) {
  return (
    ch.length === 1
    ? callback_if_match(ch)
    : callback_not_match(ch)
  ) as IfChar<T, IF, ELSE>;
}
