
/**
 * **AsNumber**<T>
 * 
 * Attempts to narrow `T` to a number type where possible.
 * 
 * **Related:** `ToNumber`
 */
export type AsNumber<T> = T extends number
  ? T & number
  : number extends T
    ? T & number
    : never;

