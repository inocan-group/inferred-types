import { ToNumericArray, Tuple } from "@inferred-types/types";

export const toNumericArray = <T extends Tuple>(arr: T) => {
  return arr.map(i => Number(i)) as unknown as ToNumericArray<T>;
};
