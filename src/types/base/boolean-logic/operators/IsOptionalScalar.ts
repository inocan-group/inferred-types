import { 
  IfNever, 
  IfOr, 
  IsScalar, 
  IsUndefined,
  IfUnion,
  IfSomeExtend,
  UnionToTuple,
  Scalar
} from "../..";


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
    IfSomeExtend<
      UnionToTuple<T>, Scalar | undefined, 
      boolean, false
    >, 
    false
  >
>>;
