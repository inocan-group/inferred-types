/**
 * **StringKeys**`<T>`
 *
 * Creates a union type of all the _string_ keys in `T`.
 */
export type StringKeys<T extends object> = {
  [K in keyof T]: K extends string ? Readonly<K> : never;
}[keyof T];
