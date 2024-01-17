import { IsReadonlyObject } from "src/types/index";

export type IfReadonlyObject<
  T,
  IF,
  ELSE
> = IsReadonlyObject<T> extends true ? IF : ELSE;
