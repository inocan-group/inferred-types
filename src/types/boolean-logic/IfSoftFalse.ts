import { Narrowable } from "../literals/Narrowable";
import { IsBoolean } from "./IsBoolean";

/**
 * **IfSoftFalse**`<T, IF, ELSE, MAYBE, UNKNOWN>`
 * 
 * Type utility which transforms the type based on `T`'s boolean state:
 * 
 * - `false` - converts to the `IF` type
 * - `true` - converts to the `ELSE` type
 * - `boolean` - converts to the `MAYBE` state (which is union of `IF` and `ELSE` by default)
 * - `Not(boolean)` - converts to the `UNKNOWN` state which by default is `Exclude<T, boolean>`
 */
export type IfSoftFalse<
  T extends boolean,
  TRUE extends Narrowable,
  FALSE extends Narrowable,
  MAYBE extends Narrowable = TRUE | FALSE,
  UNKNOWN extends Narrowable = Exclude<T, boolean>
> = //
  T extends false 
    ? TRUE
    : T extends true
      ? FALSE
      : IsBoolean<T> extends true ? MAYBE : UNKNOWN;
