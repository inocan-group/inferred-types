import { Narrowable } from "src/types/index";


export const rec = <
  N extends Narrowable, 
  TObj extends Record<string, N>
>(
  obj: TObj
) => {
  // 
};
