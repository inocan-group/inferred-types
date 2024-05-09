import { 
  AsString,
  If, 
  IfNever,  
  IsStringLiteral, 
  IsWideType, 
  NumberLike, 
  StartsWith
} from "src/types/index";

type Process<
  T extends `${number}`
> = IfNever<
  T, 
  false,
  If<
    IsStringLiteral<T>,
    T extends `${number}`
      ? If<
          StartsWith<AsString<T>,"-">,
          true,
          false
        >
      : false,
      boolean
  >
>;

/**
 * **IsNegativeNumber**`<T>`
 * 
 * A boolean utility which returns true when `T` is a numerically
 * negative value. This includes string literal representations of
 * a number.
 */
export type IsNegativeNumber<
  T extends NumberLike
> = IsWideType<T> extends true
? boolean
: NumberLike extends T
? boolean
: T extends number
? Process<AsString<T>>
: T extends string
  ? Process<T>
  : never

