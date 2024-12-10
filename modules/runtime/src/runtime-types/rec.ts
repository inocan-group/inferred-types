import type { Narrowable } from "inferred-types/types";

export function rec<
  N extends Narrowable,
  TObj extends Record<string, N>,
>(_obj: TObj) {
  //
}
