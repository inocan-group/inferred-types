import { Dictionary, Err, IsNull, NestedSplit, ObjectKey, StripLeading } from "inferred-types/types"

type InvalidType<T extends string, V> = Err<
    `invalid-type/${T}`,
    `Call to GetKeyType<T> was invalid;  T [${T} type] was not a container type supported`,
    { T: V }
>

type InvalidToken<
    T extends string,
    V extends string
> = Err<
    `invalid-token/${T}`,
    `Call to GetKeyType<T> was either an invalid token [${V}]; or the token's TYPE is not a supported container [${T}].`
>

/**
 * **GetTokenKeyType**`<T>`
 *
 * Infers the _key_ type from a `Container` type.
 *
 * - works with Record/Dictionary's, Map's, and WeakMap's
 * - also works with string based `InputToken`'s
 *
 * - non-container types -- _or a `Set`_ -- will return a **InvalidType** or **InvalidToken**
 * error (based on whether a string token was attempted or it was just some other type)
 *
 */
export type GetKeyType<T> = T extends unknown[]
? number
: Dictionary extends T
? ObjectKey
: object extends T
? IsNull<T> extends true
    ? InvalidType<"null", T>
    : PropertyKey
: T extends Map<infer K, any>
? K
: T extends WeakMap<infer K, any>
? K
: T extends Record<infer K, any>
? K
: T extends Set<any>
    ? InvalidType<"Set<any>", T>
: T extends string
    ? T extends `Record<${infer Rest}`
        ? TakeKeyValueGeneric<Rest> extends Error
            ? InvalidType<""


: InvalidType<"scalar">;
