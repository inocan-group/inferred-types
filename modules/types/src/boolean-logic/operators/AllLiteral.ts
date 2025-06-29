import type {
    And,
    IsBooleanLiteral,
    IsNumericLiteral,
    IsObjectLiteral,
    IsStringLiteral,
    IsTuple,
} from "inferred-types/types";

/**
 * **AllLiteral**`<TTuple>`
 *
 * A boolean operator which tests whether all properties in
 * the tuple `TTuple` are _literal_ types.
 */
export type AllLiteral<T extends readonly unknown[]> = And<{
    [K in keyof T]: IsStringLiteral<T[K]> extends true
        ? true
        : IsNumericLiteral<T[K]> extends true
            ? true
            : IsTuple<T[K]> extends true
                ? true
                : IsBooleanLiteral<T[K]> extends true
                    ? true
                    : IsObjectLiteral<T[K]> extends true
                        ? true
                        : false
}>;
