import { Scalar, UnionToTuple } from "src/types";
import { 
  IsBoolean,
  IsNull,
  IsSymbol,
  IsNumber, 
  IfOr, 
  IsString, 
  IfNever,
  IfUnion
} from "src/types/boolean-logic";
import { IfSomeExtend } from "../branching/IfSomeExtend";

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
export type IsScalar<T> = IfNever<T, false, 
IfOr<
  [
    IsString<T>, 
    IsNumber<T>, 
    IsBoolean<T>, 
    IsNull<T>, 
    IsSymbol<T>
],
  true,
  IfUnion<
    T, 
    IfSomeExtend<UnionToTuple<T>, Scalar, boolean, false>, 
    false
  >
>>;
