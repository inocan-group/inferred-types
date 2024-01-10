import { IsReadonlyObject } from "src/types";

export type IfReadonlyObject<
  T,
  IF,
  ELSE
> = IsReadonlyObject<T> extends true ? IF : ELSE;
