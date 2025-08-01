import type { DefineModifiers, HasModifier, IsAny, IsNever, IsUnion } from "inferred-types/types";

export type LiteralStringModifiers = DefineModifiers<["allow-union"]>;

type IsEveryUnionMemberLiteralString<T> = T extends string
    ? string extends T
        ? false
        : true
    : false;

/**
 * **IsLiteralString**`<T>`
 *
 * Boolean operator which validates that `T` is a string literal type.
 *
 * - if you add the `"allow-union"` modifier to `U`
 *      - it will match on unions where every element of the union is a string literal
 *      - by default no union types will match
 */
export type IsLiteralString<
    T,
    U extends LiteralStringModifiers = null
> = [IsAny<T>] extends [true]
    ? false
    : [IsNever<T>] extends [true]
        ? false
        : [IsUnion<T>] extends [true]
            ? [HasModifier<"allow-union", U, LiteralStringModifiers>] extends [true]
                ? IsEveryUnionMemberLiteralString<T>
                : false
            : T extends string
                ? string extends T
                    ? false
                    : true
                : false;
