import { IsNumber } from "runtime/type-guards/isNumber";
import { Narrowable } from "../literals/Narrowable";
import { IsBoolean } from "./boolean";
import { IsNull } from "./IsNull";
import { IsSymbol } from "./IsSymbol";
import { IsUndefined } from "./IsUndefined";
import { IfOr } from "./Or";
import { IsString } from "./IsString";

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
export type IsScalar<T extends Narrowable> = IfOr<
  [IsString<T>, IsNumber<T>, IsBoolean<T>, IsNull<T>, IsSymbol<T>],
  true,
  false
>;

/**
 * **IsOptionalScalar**`<T>`
 * 
 * Boolean type utility which tests for a _scalar_ value or _undefined_.
 * 
 * **Related:** `IsScalar`
 */
export type IsOptionalScalar<T extends Narrowable> = IfOr<
  [IsString<T>, IsNumber<T>, IsBoolean<T>, IsNull<T>, IsSymbol<T>, IsUndefined<T>],
  true,
  false
>;

/**
 * **IfScalar**`<T, IF, ELSE>`
 *
 * Branch type utility which returns `IF` when `T` is a scalar value 
 * (aka, string, number, or boolean) and `ELSE` otherwise
 */
export type IfScalar<
  T extends Narrowable,
  IF extends Narrowable,
  ELSE extends Narrowable
> = IsScalar<T> extends true ? IF : ELSE;


/**
 * **IfOptionalScalar**`<T, IF, ELSE>`
 *
 * Branch type utility which returns `IF` when `T` is a scalar value _or_ `undefined`
 * and `ELSE` otherwise
 */
export type IfOptionalScalar<
  T extends Narrowable,
  IF extends Narrowable,
  ELSE extends Narrowable
> = IsScalar<T> extends true ? IF : ELSE;
