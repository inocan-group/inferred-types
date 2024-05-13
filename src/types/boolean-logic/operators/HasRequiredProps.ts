import { KV } from "src/types/base-types/KV";
import { Keys, ObjectKey, RequiredProps } from "../..";

/**
 * **HasRequiredProps**`<T>`
 * 
 * Receives an object and returns true/false based on whether
 * the type has required properties or not.
 */
export type HasRequiredProps<
  T extends object
> = T extends KV
? Keys<RequiredProps<T>> extends readonly ObjectKey[]
  ? Keys<RequiredProps<T>>["length"] extends 0
    ? false
    : true
  : false
: false;
