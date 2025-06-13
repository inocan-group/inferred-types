import type {
    As,
    IsStringLiteral,
    IsUnion,
    RemoveNever,
    Shortest,
    UnionToTuple
} from "inferred-types/types";

type ProcessUnion<
    TStr extends string,
    TMatch extends readonly string[]
> = Shortest<
    As<RemoveNever<{
        [K in keyof TMatch]: TStr extends `${infer Before}${TMatch[K]}${string}`
            ? Before
            : never
    }>, readonly string[]>
>;

/**
 * **StripAfter**`<TStr, TBreak>`
 *
 * Receives a string `TStr` and truncates all characters in
 * the first occurrence of `TBreak` and all remaining chars.
 *
 * ### Example
 * ```ts
 * // "hello"
 * type T = StripAfter<"hello world", " ">;
 * ```
 */
export type StripAfter<
    TStr extends string,
    TBreak extends string,
> = As<
    IsStringLiteral<TStr> extends true
        ? IsStringLiteral<TBreak> extends true
            ? IsUnion<TBreak> extends true
                ? UnionToTuple<TBreak> extends readonly string[]
                    ? ProcessUnion<TStr, UnionToTuple<TBreak>>
                    : never
                : TStr extends `${infer Before}${TBreak}${string}`
                    ? Before
                    : TStr
            : string
        : string,
    string
>;
