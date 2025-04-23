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
import { toJSON } from "inferred-types/runtime";

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
 * Takes an object definition where the values are an `InputToken`:
 *
 * The runtime type is left unchanged but the _type_ returned is that which
 * the token or callback expresses.
 */
export function defineObject<
    T extends DefineObject,
    P extends readonly (keyof T & string)[],
>(
    defn: T,
    ..._optProps: P
): HandleError<Returns<T, P>> {
    return toJSON(defn) as unknown as HandleError<Returns<T, P>>;
}
