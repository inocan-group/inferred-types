import { IfLiteral, IfNegativeNumber, IfNever, NumberLike } from "src/types/index";

/**
 * **IsNegativeNumber**`<T>`
 * 
 * A boolean utility which returns true when `T` is a numerically
 * negative value. This includes string literal representations of
 * a number.
 */
export type IsNegativeNumber<T> = IfNever<
  T, 
  false,
  IfLiteral<
    T, 
    T extends NumberLike
      ? IfNegativeNumber<T,true,false>
      : false,
    boolean
  >
>;
