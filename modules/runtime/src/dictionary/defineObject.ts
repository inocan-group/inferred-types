import type {
    DefineObject,
    FromDefineObject,
    MakeKeysOptional
} from "inferred-types/types";

type Returns<
    T extends DefineObject,
    P extends readonly (keyof T & string)[]
> = P["length"] extends 0
    ? FromDefineObject<T>
    : MakeKeysOptional<T, P> extends DefineObject
        ? FromDefineObject<MakeKeysOptional<T, P>>
        : never;

/**
 * Takes an object definition where the values are one of the following
 * types:
 *      - `SimpleToken` representations of a type
 *      - a `ShapeCallback` which returns a type, or
 *      - an `InputToken` representation of a type.
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
): Returns<T, P> {
    return defn as unknown as Returns<T, P>;
}
