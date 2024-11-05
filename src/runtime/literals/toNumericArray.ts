import { ToNumericArray, Tuple } from "inferred-types/dist/types/index";

export const toNumericArray = <T extends Tuple>(arr: T) => {
  return arr.map(i => Number(i)) as unknown as ToNumericArray<T>;
};
