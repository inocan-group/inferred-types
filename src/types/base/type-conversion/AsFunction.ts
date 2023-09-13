import { AnyFunction } from "..";

/**
 * **AsString**<T>
 * 
 * Attempts to narrow `T` to a string type where possible.
 * 
 * **Related:** `ToString`
 */
export type AsFunction<T> = T extends AnyFunction
  ? T & AnyFunction
  : never;

