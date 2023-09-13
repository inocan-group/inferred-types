import { HasKeys } from "../..";

export type IfHasKeys<
  TVal,
  IF,
  ELSE
> = HasKeys<TVal> extends true ? IF : ELSE;
