import { IfOr } from "../branching";
import { IsBoolean } from "./IsBoolean";
import { IsNull } from "./IsNull";
import { IsNumber } from "./IsNumber";
import { IsString } from "./IsString";
import { IsSymbol } from "./IsSymbol";
import { IsUndefined } from "./IsUndefined";

/**
 * **IsOptionalScalar**`<T>`
 * 
 * Boolean type utility which tests for a _scalar_ value or _undefined_.
 * 
 * **Related:** `IsScalar`
 */
export type IsOptionalScalar<T> = IfOr<
  [IsString<T>, IsNumber<T>, IsBoolean<T>, IsNull<T>, IsSymbol<T>, IsUndefined<T>],
  true,
  false
>;
