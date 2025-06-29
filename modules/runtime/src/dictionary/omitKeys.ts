import type {
    AnyObject,
    Narrowable,
    NarrowObject,
    Suggest,
    WithoutKeys,
} from "inferred-types/types";

/**
 * **omitKeys**(obj, excluding)
 *
 * Runtime utility which _excludes_ certain **keys** from an object.
 *
 * - this utility is meant to mimic the type utility `Omit<T,U>` provided
 * by Typescript in runtime
 * - attempts will be made to extract the narrowest possible type from
 * the passed in object.
 *
 * ```ts
 * // { baz: 3 }
 * const obj = omit({ foo: 1, bar: 2: baz: 3 }, "foo", "bar");
 * ```
 *
 * **Related:** `createOmission`, `withoutKeys`, `retainKeys`
 */
export function omitKeys<
    TObj extends NarrowObject<N> | AnyObject,
    N extends Narrowable,
    TKeys extends readonly string[],
>(
    obj: TObj,
    ...removeKeys: Suggest<TKeys[number]>[]
) {
    const keys = Object.keys(obj);

    return keys.reduce(
        (acc, key) => removeKeys.includes(key as any)
            ? acc
            : {
                ...acc,
                [key]: obj[key as keyof TObj],
            },
        {},
    ) as WithoutKeys<TObj, TKeys[number]>;
}
