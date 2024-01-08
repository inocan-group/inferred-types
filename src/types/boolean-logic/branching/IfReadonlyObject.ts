import { IsReadonlyObject } from "../..";

export type IfReadonlyObject<
  T,
  IF,
  ELSE
> = IsReadonlyObject<T> extends true ? IF : ELSE;
