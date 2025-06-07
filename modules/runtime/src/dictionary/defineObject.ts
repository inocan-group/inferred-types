import type {
    DefineObject,
    Dictionary,
    Err,
    FromDefineObject,
    KeysWithError,
    MakeKeysOptional,
    Some,
    Values,
} from "inferred-types/types";
import { asType } from "inferred-types/runtime";

type Returns<
    T extends DefineObject,
    P extends readonly (keyof T & string)[]
> = P["length"] extends 0
    ? FromDefineObject<T>
    : MakeKeysOptional<T, P> extends DefineObject
        ? FromDefineObject<MakeKeysOptional<T, P>>
        : never;

type HandleError<T> = T extends Dictionary
    ? Some<Values<T>, "extends", Error> extends true
        ? Err<
            `invalid-token/object`,
            `At least one key in the defined object have errors`,
            { keys: KeysWithError<T>; obj: T }
        >
        : T
    : never;

/**
 * **defineObject**`(defn, ...[optional]) -> (object type)`
 *
 * Defines an object **type** while preserving a runtime-token
 * which _identifies_ the type.
 *
 * ### Example
 *
 * ```ts
 * const person = defineObject(
 *   {
 *      firstName: "string",
 *      lastName: "string",
 *      address: "string | object"
 *    },
 *    "lastName", "address"
 * )
 * ```
 *
 * - the _type_ of `person` will be:
 *
 *   ```ts
 *   type person = {
 *       firstName: string,
 *       lastName?: string,
 *       address?: object | string
 *   }
 *   ```
 *
 * - but the runtime value will be a string literal token _representing_
 * that type.
 *
 */
export function defineObject<
    T extends DefineObject,
    P extends readonly (keyof T & string)[],
>(
    defn: T,
    ..._optProps: P
): HandleError<Returns<T, P>> {
    return asInputToken(defn);
}
