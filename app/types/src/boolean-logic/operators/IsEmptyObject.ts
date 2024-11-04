import type {AsRecord,  Dictionary,  IsNumericLiteral,  Keys} from "src/types/index";

/**
 * **IsEmptyObject**`<T>`
 * 
 * Boolean type util which detects whether `T` _is_ an object
 * but _has no properties_.
 */
export type IsEmptyObject<T> = T extends Dictionary
  ? Keys<AsRecord<T>>["length"] extends 0 ? true : false
  : false;

export type IsNonEmptyObject<T> = T extends Dictionary
  ? Keys<AsRecord<T>>["length"] extends 0 
    ? false 
    : IsNumericLiteral<Keys<AsRecord<T>>["length"]> extends true
      ? true
      : false
  : false;
