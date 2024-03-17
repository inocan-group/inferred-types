import type {AnyObject, AsRecord, IfLength, Keys} from "src/types/index";

/**
 * **IsEmptyObject**`<T>`
 * 
 * Boolean type util which detects whether `T` _is_ an object
 * but _has no properties_.
 */
export type IsEmptyObject<T> = T extends AnyObject
  ? IfLength<Keys<AsRecord<T>>, 0, true, false>
  : false;
