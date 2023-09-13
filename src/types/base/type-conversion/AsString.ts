
/**
 * **AsString**<T>
 * 
 * Attempts to narrow `T` to a string type where possible.
 * 
 * **Related:** `ToString`
 */
export type AsString<T> = T extends string
  ? T & string
  : string extends T
    ? T & string
    : never;

