import { And, DefineModifiers, HasModifier, IsAny, IsNever, IsUnion, UnionToTuple } from "inferred-types/types";

export type LiteralNumberModifiers = DefineModifiers<["allow-union"]>;

/**
 * **IsLiteralNumber**`<T>`
 *
 * Boolean operator which validates that `T` is a **literal** `number` type.
 *
 * - if you add the `"allow-union"` modifier to `U`
 *      - it will match on unions where every element of the union is a string literal
 *      - by default no union types will match
 */
export type IsLiteralNumber<
    T,
    U extends LiteralNumberModifiers = null
> = [IsAny<T>] extends [true]
? false
: [IsNever<T>] extends [true]
? false
: [IsUnion<T>] extends [true]
    ? [HasModifier<"allow-union", U, LiteralNumberModifiers>] extends [true]
        ? And<{
            [K in keyof UnionToTuple<T>]: UnionToTuple<T>[K] extends number
                ? number extends UnionToTuple<T>[K]
                    ? false
                    : true
                : false
        }>
        : false
: T extends number
    ? number extends T
        ? false
        : true
: false;
