import { IfFalse, IfTrue, IsBoolean } from "../..";

/**
 * **IsMaybeTrue**`<T>`
 * 
 * Type utility which checks for the narrow type of `true` but 
 * only converts what it knows at design time. Valid return 
 * types are: 
 * 
 * - `true` - known to be of `true` type
 * - `false` - known to be of `false` type (aka, "false" or non-boolean)
 * - `boolean` - can't determine true/false at design time
 */
export type IsMaybeTrue<T> = IsBoolean<T> extends true
  ? IfTrue<T, true, IfFalse<T, false, boolean>>
  : false;
