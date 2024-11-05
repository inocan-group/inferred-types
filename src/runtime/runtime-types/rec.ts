import { Narrowable } from "inferred-types/dist/types/index";


export const rec = <
  N extends Narrowable,
  TObj extends Record<string, N>
>(
  _obj: TObj
) => {
  //
};
