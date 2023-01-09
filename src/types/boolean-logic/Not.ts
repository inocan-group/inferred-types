import { IfSoftTrue } from "./boolean";

/**
 * **Not**`<T>`
 * 
 * A boolean negation; turns true to false and visa-versa. If the type
 * is `boolean` it remains boolean.
 */
export type Not<T extends boolean> = IfSoftTrue<
  T, 
  false, 
  true,
  boolean,
  never
>;
