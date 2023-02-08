import { AnyObject } from "../../..";
import { RemoveFromList } from "../RemoveFromList";

/**
 * **RemoveNever**`<T>`
 * 
 * Type utility which removes any `never` values from an array/tuple or
 * object properties.
 */
export type RemoveNever<
  T extends any[] | readonly any[] | AnyObject
> = T extends any[]
  ? RemoveFromList<T, "extends", never >
  : T extends readonly any[]
    ? Readonly<RemoveFromList<T, "extends", never >>
    : T extends AnyObject
      ? any
      : never;
