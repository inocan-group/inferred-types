import { AnyObject, RemoveFromList } from "src/types";

/**
 * **RemoveNever**`<T>`
 * 
 * Type utility which removes any `never` values from an array/tuple or
 * object properties.
 */
export type RemoveNever<
  T extends unknown[] | readonly unknown[] | AnyObject
> = T extends unknown[]
  ? RemoveFromList<T, "extends", never >
  : T extends readonly unknown[]
    ? Readonly<RemoveFromList<T, "extends", never >>
    : T extends AnyObject
      ? unknown
      : never;
