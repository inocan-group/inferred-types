import type { First, IsEqual, IsUnion, IsWideString, Or, UnionToTuple } from "inferred-types/types";

type Check<
    T extends string,
    K
> = [K] extends ["all"]
    ? Or<[
        IsEqual<T, `${string}`>,
        IsEqual<T, `${number}`>,
    ]>

    : [K] extends ["string"]
        ? IsEqual<T, `${string}`>
        : [K] extends ["number"]
            ? IsEqual<T, `${number}`>
            : false;

type FixUnion<
    T extends string
> = IsUnion<T> extends true
    ? First<UnionToTuple<T>> extends `${"true" | "false"}${infer Rest}`
        ? Rest
        : T
    : T;

/**
 * **StripLeadingTemplate**`<T, [K]>`
 *
 * Strips a dynamic segment (e.g., `${string}`, `${number}`, `${boolean}`)
 * out of `T` if it exists. Otherwise proxies `T` through.
 */
export type StripLeadingTemplate<
    T extends string,
    K extends "all" | "string" | "number" | "boolean" = "all"
> =
[IsWideString<T>] extends [true]
    ? string
    : [T] extends [`${infer First}${infer Rest}`]
        ? [Check<First, K>] extends [true]
            ? Rest
            : FixUnion<T>
        : "";
