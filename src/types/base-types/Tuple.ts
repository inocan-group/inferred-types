
/**
 * **Tuple**`<[T]>`
 * 
 * A **Tuple** is any readonly array of properties. Without a generic specified
 * it is `readonly Narrowable[]` which serves as a very useful base for many generic
 * types. 
 */
export type Tuple<T = unknown> = readonly T[];
