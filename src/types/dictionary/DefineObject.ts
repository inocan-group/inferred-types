import { FromDefn } from "../literals";
import {  ShapeCallback, SimpleToken } from "../runtime-types";

/**
 * **DefineObject**
 *
 * A dictionary which _defines_ the type of a dictionary.
 *
 * - values can be a `SimpleToken` or the `ShapeApi`
 *
 *   **Example:**
 *   ```ts
 *   const myObject: DefineObject = {
 *     foo: "string",
 *     bar: "Opt<number>",
 *     baz: p => p.string().zipCode()
 *   }
 *   ```
 *
 * - typically used though a function of type `DefineObjectApi`
 */
export type DefineObject = Record<string, SimpleToken | ShapeCallback>;

/**
 * **DefineObjectApi**
 *
 * Provides a function which takes a `DefineObject` and converts it to the
 * type that it defines.
 *
 * **Example:**
 * ```ts
 * const api: DefineObjectApi = ...;
 * // { foo: string; bar: string | undefined; baz: ZipCode }
 * const myObject = api({
 *   foo: "string",
 *   bar: "Opt<number>",
 *   baz: p => p.string().zipCode()
 * });
 * ```
 */
export type DefineObjectApi = <T extends DefineObject>(defn: T) => FromDefn<T>;




