import { AnyObject } from "src/types/base-types";
import { RemoveFromList } from "../RemoveFromList";

/**
 * **RemoveStrings**`<T>`
 * 
 * Extracts string values from an array, retains the rest.
 */
export type RemoveStrings<
  T extends unknown[] | readonly unknown[] | AnyObject
> = T extends unknown[]
  ? RemoveFromList<T, "extends", string>
  : T extends readonly unknown[]
  ? Readonly<RemoveFromList<T, "extends", string>>
  : T extends AnyObject
  ? unknown
  : never;
