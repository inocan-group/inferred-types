import { AnyFunction } from "src/types/index";

/**
 * **AsFunction**<T>
 * 
 * Attempts to narrow `T` to a string type where possible.
 * 
 * **Related:** `ToString`
 */
export type AsFunction<T> = T & AnyFunction;

