import type {
    As,
    IsUnion,
    IsWideType,
    Join,
    RemoveNever,
    UnionToTuple
} from "inferred-types/types";

type OnlyString<T extends readonly unknown[]> = As<RemoveNever<{
    [K in keyof T]: T[K] extends string
        ? T[K]
        : [T[K]] extends [number | boolean]
            ? `${T[K]}`
            : never
}>, readonly string[]>;

/**
 * **AsString**<T>
 *
 * Attempts to narrow `T` to a string type where possible.
 *
 * - will convert any string, boolean, or numeric value
 * to a string value
 * - union types which include a variant which is `T` can be
 *
 * **Related:** `ToString`
 */
export type AsString<T> = [T] extends [string]
    ? T & string
    : [T] extends [number]
        ? `${T}`
        : [T] extends [boolean]
            ? `${T}`
            : [string] extends [T]
                ? string
                : [T] extends [string[]]
                    ? [IsWideType<T>] extends [true]
                        ? never
                        : Join<T>
                    : [IsUnion<T>] extends [true]
                        ? OnlyString<UnionToTuple<T>>[number]
                        : never;
