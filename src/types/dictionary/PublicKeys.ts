/**
 * **PublicKeys**`<T>`
 *
 * Builds a union type of all keys which are "public" where a public
 * key is any key which _does not_ start with the `_` character.
 */
export type PublicKeys<T extends object> = {
  [K in keyof T]: K extends `_${string}` ? never : K;
}[keyof T];
