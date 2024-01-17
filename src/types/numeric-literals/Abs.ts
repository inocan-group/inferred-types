import { IfLiteral,  NumberLike, AsNumber, StripLeading } from "src/types/index";


/**
 * **Abs**`<T>`
 * 
 * Converts any literal numeric into the **absolute value** of the number.
 * 
 * - you can pass in a numeric string literal and it perform ABS func while
 * preserving string literal type
 * - wide numeric types are not allowed and will resolve to `never`; use `AbsMaybe`
 * if you want to allow wide types through
 */
export type Abs<T extends NumberLike> = IfLiteral<
  T,
  T extends `${number}`
  ? StripLeading<`${T}`, "-">
  : AsNumber<StripLeading<`${T}`, "-">>,
  number
>;
