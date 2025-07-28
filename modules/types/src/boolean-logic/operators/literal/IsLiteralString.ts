import { And, DefineModifiers, HasModifier, IsAny, IsNever, IsUnion, UnionToTuple } from "inferred-types/types";

export type LiteralStringModifiers = DefineModifiers<["allow-union"]>;

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
        ? And<{
            [K in keyof UnionToTuple<T>]: UnionToTuple<T>[K] extends string
                ? string extends UnionToTuple<T>[K]
                    ? false
                    : true
                : false
        }>
        : false
: T extends string
    ? string extends T
        ? false
        : true
: false;
