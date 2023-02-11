import { Narrowable } from "../literals/Narrowable";
import { IsBoolean } from "./IsBoolean";

/**
 * **IsSoftTrue**`<T>`
 * 
 * Type utility which checks for the narrow type of `true` but 
 * only converts what it knows at design time. Valid return 
 * types are: 
 * 
 * - `true` - known to be of `true` type
 * - `false` - known to be of `false` type
 * - `boolean` - can't determine true/false at design time
 * - `Exclude<T, boolean>` - not a boolean type
 */
export type IsSoftTrue<T extends Narrowable> = IsBoolean<T> extends true
  ? true
  : T extends false
    ? false
    : T extends boolean
      ? boolean
      : Exclude<T, boolean>;
