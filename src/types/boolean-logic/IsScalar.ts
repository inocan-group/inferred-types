import { Narrowable } from "../literals/Narrowable";
import { IsBoolean } from "./IsBoolean";
import { IsNull } from "./IsNull";
import { IsSymbol } from "./IsSymbol";
import { IsNumber, IfOr, IsString } from "src/types/boolean-logic";

/**
 * **IsScalar**`<T>`
 * 
 * Type utility which checks if a value is a _scalar_ value (aka, it is
 * an atomic value and doesn't _contain_ other types). In practical terms this just
 * means if it's a string, number, boolean, null, undefined, or symbol then it is
 * a **scalar**. Arrays and records of any type are _not_ scalars.
 * 
 * **Related:** `IsOptionalScalar`
 */
export type IsScalar<T> = IfOr<
  [IsString<T>, IsNumber<T>, IsBoolean<T>, IsNull<T>, IsSymbol<T>],
  true,
  false
>;
