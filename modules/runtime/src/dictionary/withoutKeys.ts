import type {
    Expand,
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
    const TObj extends NarrowObject<N>,
    N extends Narrowable,
    const TKeys extends readonly Suggest<StringKeys<TObj>[number]>[],
>(dict: TObj, ...exclude: TKeys) {
    const obj: any = {};
    for (const [_, key] of Object.keys(dict).entries()) {
        if (!(exclude).includes(key as any)) {
            obj[key] = dict[key];
        }
    }

    return obj as Expand<WithoutKeys<TObj, TKeys>>;
}
