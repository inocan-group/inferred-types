import { Keys } from "../dictionary/Keys";
import { IfLength } from "./IfLength";

/**
 * **IsEmptyObject**`<T>`
 * 
 * Boolean type util which detects whether `T` _is_ an object
 * but _has no properties_.
 */
export type IsEmptyObject<T> = T extends object
  ? IfLength<Keys<T>, 0, true, false>
  : false;