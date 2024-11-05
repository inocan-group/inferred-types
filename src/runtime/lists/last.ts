import { Last, Tuple } from "inferred-types/dist/types/index";

export const last = <T extends Tuple>(list: T): Last<T> => {
  return [...list].pop() as Last<T>;
};
