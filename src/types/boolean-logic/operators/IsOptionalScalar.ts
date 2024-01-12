import { 
  IfNever, 
  IfOr, 
  IsScalar, 
  IsUndefined,
  IfUnion,
} from "src/types";


/**
 * **IsOptionalScalar**`<T>`
 * 
 * Boolean type utility which tests for a _scalar_ value or _undefined_.
 * 
 * **Related:** `IsScalar`
 */
export type IsOptionalScalar<T> = IfNever<T, false, IfOr<
  [
    IsScalar<T>, IsUndefined<T>
  ],
  true,
  IfUnion<
    T, 
    boolean, 
    false
  >
>>;
