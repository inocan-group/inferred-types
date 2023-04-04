import { HasKeys } from "src/types";

export type IfHasKeys<
  TVal,
  IF,
  ELSE
> = HasKeys<TVal> extends true ? IF : ELSE;
