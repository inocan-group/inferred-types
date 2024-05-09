import {   NumberLike, AsNumber, StripLeading, IsStringLiteral, If, Or,  AsString } from "src/types/index";

type Process<T extends `${number}`> = If<
  IsStringLiteral<T>,
  StripLeading<T, "-">,
  string
>;


/**
 * **Abs**`<T>`
 * 
 * Converts any literal numeric into the **absolute value** of the number.
 * 
 * - you can pass in a numeric string literal and it perform ABS func while
 * preserving string literal type
 */
export type Abs<T extends NumberLike> = T extends number
? AsNumber<Process<AsString<T>>>
: T extends `${number}`
  ? Process<T>
  : never;

