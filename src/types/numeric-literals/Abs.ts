import { IfLiteral, IfString } from "src/types/boolean-logic";
import { ToNumber, ToString } from "src/types/type-conversion";
import { StripLeading } from "../string-literals";

/**
 * **Abs**`<T>`
 * 
 * Converts any literal numeric into the **absolute value** of the number.
 * 
 * - you can pass in a numeric string literal and it perform ABS func while
 * preserving string literal type
 * - 
 */
export type Abs<T extends number | `${number}`> = IfLiteral<
  T,
  IfString<
    T,
    StripLeading<T,"-">,
    ToNumber<StripLeading<ToString<T>,"-">>
  >,
  number
>;
