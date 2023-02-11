import { Narrowable } from "../literals/Narrowable";
import { IsBoolean } from "./IsBoolean";

export type IfBoolean<
  T extends Narrowable, 
  TRUE, 
  FALSE,
> = IsBoolean<T> extends true ? TRUE : FALSE;

