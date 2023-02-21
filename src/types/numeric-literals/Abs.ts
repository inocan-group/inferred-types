import { IfLiteral } from "src/types/boolean-logic";
import { ToNumber, ToString } from "src/types/type-conversion";
import { StripLeading } from "../string-literals";

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
export type Abs<T extends number | `${number}`> = IfLiteral<
  T,
  T extends string
    ? StripLeading<T,"-">
    : ToNumber<StripLeading<ToString<T>,"-">>
  ,
  never
>;
