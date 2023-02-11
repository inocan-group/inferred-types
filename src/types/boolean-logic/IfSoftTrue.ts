import { Narrowable } from "../literals/Narrowable";
import { IsBoolean } from "./IsBoolean";

/**
 * **IfSoftTrue**`<T, IF, ELSE, MAYBE, UNKNOWN>`
 * 
 * Type utility which transforms the type based on `T`'s boolean state:
 * 
 * - `true` - converts to the `IF` type
 * - `false` - converts to the `ELSE` type
 * - `boolean` - converts to the `MAYBE` state (which is union of `IF` and `ELSE` by default)
 * - `Not(boolean)` - converts to the `UNKNOWN` state which by default is `Exclude<T, boolean>`
 * 
 * **Related:** `IfTrue`
 */
export type IfSoftTrue<
  T extends Narrowable,
  IF extends Narrowable,
  ELSE extends Narrowable,
  MAYBE extends Narrowable = IF | ELSE,
  UNKNOWN extends Narrowable = Exclude<T, boolean>
> = //
  T extends true 
    ? IF
    : T extends false
      ? ELSE
      : IsBoolean<T> extends true ? MAYBE : UNKNOWN;
