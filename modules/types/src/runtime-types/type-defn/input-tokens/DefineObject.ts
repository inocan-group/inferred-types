import type {
    FromDefn,
    InputToken
} from "inferred-types/types";

/**
 * **DefineObject**
 *
 * A dictionary which defines the _type_ of a dictionary.
 *
 * - values can be:
 *     - a string based `InputToken`
 *     - another `DefineObject` definition
 *     - a tuple of
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
 * - typically used `FromDefn` or `FromDefineObject` utilities
 */
export type DefineObject = {
    [key: string]: InputToken;
};

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
