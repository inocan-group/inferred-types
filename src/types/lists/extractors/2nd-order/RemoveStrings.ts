import { AnyObject } from "../../..";
import { RemoveFromList } from "../RemoveFromList";

/**
 * **RemoveStrings**`<T>`
 * 
 * Extracts string values from an array, retains the rest.
 */
export type RemoveStrings<
  T extends any[] | readonly any[] | AnyObject
> = T extends any[]
  ? RemoveFromList<T, "extends", string>
  : T extends readonly any[]
  ? Readonly<RemoveFromList<T, "extends", string>>
  : T extends AnyObject
  ? any
  : never;
