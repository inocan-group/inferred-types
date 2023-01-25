/**
 * **KnownKeys**`<T>`
 * 
 * Separate the _known_ keys from other hinting known about an object.
 */
export type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K
} extends { [_ in keyof T]: infer U } ? U : never;
