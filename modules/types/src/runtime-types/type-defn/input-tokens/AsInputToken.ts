import type {
    As,
    AsStaticTemplate,
    IsAny,
    IsEqual,
    IsFalse,
    IsLiteralLikeArray,
    IsNever,
    IsNull,
    IsTrue,
    IsUndefined,
    IsUnion,
    IsVariadicArray,
    Join,
    ToStringLiteral,
    UnionToTuple
} from "inferred-types/types";

type AsUnion<
    T extends readonly unknown[]
> = Join<{
    [K in keyof T]: AsInputToken<T[K]>
}, " | ">;

/**
 * **AsInputToken**`<T>`
 *
 * Converts any type `T` into the _string based_ `InputToken` representing that type.
 */
export type AsInputToken<T> = [IsAny<T>] extends [true]
    ? "any"
    : [IsNever<T>] extends [true]
        ? "never"
        : [T] extends [string]
            ? [string] extends [T]
                ? "string"
                : [IsUnion<T>] extends [true]
                    ? AsUnion<UnionToTuple<T>>
                    : `'${AsStaticTemplate<T>}'` // literal
            : [T] extends [number]
                ? [number] extends [T]
                    ? "number"
                    : [IsUnion<T>] extends [true]
                        ? AsUnion<UnionToTuple<T>>
                        : `${T}`
                : [T] extends [boolean]
                    ? [IsTrue<T>] extends [true]
                        ? "true"
                        : [IsFalse<T>] extends [true]
                            ? "false"
                            : "boolean"
                    : [IsNull<T>] extends [true]
                        ? "null"
                        : [IsUndefined<T>] extends [true]
                            ? "undefined"
                            : [T] extends [void]
                                ? "void"
                                : [IsEqual<T, unknown>] extends [true]
                                    ? "unknown"
                                    : [IsLiteralLikeArray<T>] extends [true]
                                        ? [IsVariadicArray<As<T, any[]>>] extends [true]
                                            ? "variadic"
                                            : ToStringLiteral<T>

                                        : [T] extends [(infer Type)[]]
                                            ? [IsUnion<Type>] extends [true]
                                                ? AsUnion<UnionToTuple<Type>> extends infer U extends string
                                                    ? `(${U})[]`
                                                    : never
                                                : AsInputToken<Type> extends string
                                                    ? `${AsInputToken<Type>}[]`
                                                    : never

                                            : "xxx";
