import { Include } from "./Include";
/**
 * **Retain<T, K>**
 * 
 * Reduces the type system to just the key/values which are represented in `K`.
 * The `L` generic can largely be ignored unless you need _literal_ equality.
 * 
 * ```ts
 * type Obj = { foo: 1, bar: number, baz: string };
 * // { foo: 1, bar: number }
 * type Retained = Retain<Obj, "foo" | "bar">;
 * ```
 * 
 * **Note:** in essence this is the _opposite_ of `Exclude<T,K>`
 */
export type Retain<T, K extends keyof T> = Pick<T, Include<keyof T, K>>;