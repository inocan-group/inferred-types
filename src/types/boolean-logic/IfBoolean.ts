import { IsBoolean } from "./IsBoolean";

export type IfBoolean<
  T, 
  TRUE, 
  FALSE,
> = IsBoolean<T> extends true ? TRUE : FALSE;

