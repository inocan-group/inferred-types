import { Narrowable } from "inferred-types/types";


export const rec = <
  N extends Narrowable,
  TObj extends Record<string, N>
>(
  _obj: TObj
) => {
  //
};
