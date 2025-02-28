import type {
    Narrowable,
    NarrowObject,
    StringKeys,
    Suggest,
    WithoutKeys,
} from "inferred-types/types";

/**
 * **withoutKeys**(obj,...keys)
 *
 * Reduces the key/value pairs in an object with the expressed
 * keys excluded.
 *
 * - this is an alias to the `omit()` utility
 *
 * **Related**: `omit`, `createOmission`
 */
export function withoutKeys<
    TObj extends NarrowObject<N>,
    N extends Narrowable,
    TKeys extends readonly StringKeys<TObj>[],
>(dict: TObj, ...exclude: Suggest<TKeys[number]>[]) {
    const obj: any = {};
    for (const [_, key] of Object.keys(dict).entries()) {
        if (!(exclude as string[]).includes(key)) {
            obj[key] = dict[key];
        }
    }

    return obj as WithoutKeys<TObj, TKeys[number]>;
}
