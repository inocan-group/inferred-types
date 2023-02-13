import { Alpha } from "../string-literals";


/**
 * A `PrivateKey` must start with a `_` character and then follow with
 * an alphabetic character
 */
export type PrivateKey = `_${Alpha}${string}`;

/**
 * **PrivateKeys**`<T>`
 * 
 * Keys on an object which have a `_` character as first part of the
 * name are considered private and this utility will create a union
 * of all the keys in this category.
 */
export type PrivateKeys<T extends object> = {
  [K in keyof T]: K extends `_${string}` ? K : never;
}[keyof T];
