import { Narrowable } from "../literals";
import { IsString } from "./IsString";
import { Not } from "./Not";
import { IfAnd, IsStringLiteral } from "src/types/boolean-logic";

/**
 * **IfWideString**`<T,TRUE,FALSE>`
 * 
 * Type utility which maps to type `IF` when `T` is a _wide_ "string" type and 
 * maps to `ELSE` type otherwise.
 */
export type IfWideString<
  T extends Narrowable, //
  TRUE extends Narrowable,
  FALSE extends Narrowable
> = IfAnd<[IsString<T>, Not<IsStringLiteral<T>>], TRUE, FALSE>;

