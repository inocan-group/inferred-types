import { Retain } from "../Retain";
/**
 * **Include**`<T,K>`
 * 
 * In essence the _inverse_ of `Exclude`, this type utility will
 * ensure that the type `T` will _retain_ the key/value pairs 
 * which extend `K`.
 * 
 * ```ts
 * type Obj = { foo: 1, bar: number, baz: string };
 * // { foo: 1, bar: number }
 * type Retained = Retain<Obj, "foo" | "bar">;
 * ```
 * 
 * **Note:** in essence this is the _inverse_ of `Exclude<T,K>`
 */
export type Include<
  T, 
  K extends keyof T
> = Pick<T, Retain<keyof T, K>>;