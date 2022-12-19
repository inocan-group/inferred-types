import { AnyFunction } from "src/runtime";
import { Narrowable } from "../Narrowable";

export type IfFunction<
  T,
  TRUE extends Narrowable,
  FALSE extends Narrowable,
> = T extends AnyFunction ? TRUE : FALSE;