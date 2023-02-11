/**
 * **NonStringKeys**`<T>`
 * 
 * Builds a union type of the keys of `T` which are _not_
 * string keys.
 * 
 * **Related:** `StringKeys`
 */
export type NonStringKeys<T extends object> = {
  [K in keyof T]: K extends string ? never : Readonly<K>;
}[keyof T];
