import type {
    And,
    IsLiteralLike,
    IsStringLiteral,
} from "inferred-types/types";

/**
 * **AllLiteral**`<TTuple>`
 *
 * A boolean operator which tests whether all properties in
 * the tuple `TTuple` are _literal_ types.
 */
export type AllLiteral<T extends readonly unknown[]> = And<{
    [K in keyof T]: IsLiteralLike<T[K]> extends true
            ? true
            : false
}>;
