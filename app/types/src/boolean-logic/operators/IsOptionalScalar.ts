import { 
  IsNever, 
  IsScalar, 
  IsUndefined,
  IsUnion
} from "src/types/index";

type Process<T> = [IsNever<T>] extends [true]
? false
: [IsScalar<T>] extends [true]
  ? true
  : [IsUndefined<T>] extends [true]
    ? true
    : [IsUnion<T>] extends [true]
      ? boolean
      : false;


/**
 * **IsOptionalScalar**`<T>`
 * 
 * Boolean type utility which tests for a _scalar_ value or _undefined_.
 * 
 * **Related:** `IsScalar`
 */
export type IsOptionalScalar<T> = Process<T> extends boolean
? Process<T>
: never;
