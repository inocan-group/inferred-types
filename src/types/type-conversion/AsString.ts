/**
 * **AsString**<T>
 * 
 * Attempts to narrow `T` to a string type where possible.
 * 
 * - will convert any string, boolean, or numeric value
 * to a string value
 * - union types which include a variant which is `T` can be 
 * 
 * **Related:** `ToString`
 */
export type AsString<T> = T extends string
  ? T & string
  : T extends number
    ? `${T}`
    : T extends boolean
      ? `${T}`
      : string extends T
        ? string
        :  never
  ;

