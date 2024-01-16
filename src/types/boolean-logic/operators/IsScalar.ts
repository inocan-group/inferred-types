import { 
  Scalar,
  IsBoolean,
  IsNull,
  IsSymbol,
  IsNumber, 
  IfOr, 
  IsString, 
  IfNever,
  IfUnion,
  IfExtends,
} from "src/types";




/**
 * **IsScalar**`<T>`
 * 
 * Type utility which checks if a value is a _scalar_ value (aka, it is
 * an atomic value and doesn't _contain_ other types). In practical terms this just
 * means if it's a string, number, boolean, null, or symbol then it is
 * a **scalar**. Arrays and records of any type are _not_ scalars.
 * 
 * - Typically this resolves at design-time to true/false, however, in some
 * cases a union type can not resolve until runtime and a `boolean` value will
 * be returned. 
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
    IfExtends<
      T, Scalar, 
      true, 
      boolean
    >,
    false
  >
>>;

