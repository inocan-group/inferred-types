import { KV, Tuple } from "../base-types";

/**
 * **AsRecord**`<T>`
 * 
 * Receives a `Record`, `object`, or `Tuple` and ensures the type 
 * is a `Record` type for all object-like types and just passes 
 * Tuples through "as is".
 */
export type AsRecord<
  T extends KV | object
> = T extends Tuple
? T
: T extends KV
? T
: T extends object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ? T extends any[]
    ? never
    : NonNullable<unknown>
  : never;
