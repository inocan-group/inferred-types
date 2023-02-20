import { IsBoolean } from "src/types/boolean-logic";

export type IfBoolean<
  T, 
  TRUE = T & boolean,
  FALSE = Exclude<T, boolean>,
> = IsBoolean<T> extends true ? TRUE : FALSE;
