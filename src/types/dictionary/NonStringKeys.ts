import { AnyObject } from "src/types/index";

/**
 * **NonStringKeys**`<T>`
 * 
 * Builds a union type of the keys of `T` which are _not_
 * _string_ keys. This can be useful as _symbols_ can also 
 * be seen as valid keys and these keys are often used for
 * "identity" purposes.
 * 
 * **Related:** `StringKeys`
 */
export type NonStringKeys<T extends AnyObject> = {
  [K in keyof T]: K extends string ? never : Readonly<K>;
}[keyof T];
