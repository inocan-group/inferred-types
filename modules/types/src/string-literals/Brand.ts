import type { Scalar } from "inferred-types/types";

export type Branded<T extends Scalar, B extends string> = T & {
  __brand: B;
};
