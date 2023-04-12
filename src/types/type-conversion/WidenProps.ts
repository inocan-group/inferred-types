import { AnyObject } from "src/types/base-types";
import { IsIndexable } from "src/types";
import { Widen } from "./Widen";

/**
 * **WidenProps**`<T>`
 * 
 * Type utility which widens the properties of an object.
 */
export type WidenProps<T extends AnyObject> = IsIndexable<T> extends true
  ? { [K in keyof T]: Widen<T[K]> }
  : T;
