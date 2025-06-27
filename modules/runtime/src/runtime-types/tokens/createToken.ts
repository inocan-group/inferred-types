import type {
    AlphaChar,
    DefineTokenDetail,
    DynamicTokenApi,
    StaticTokenApi,
    TokenName,
    TokenType,
} from "inferred-types/types";
import { simpleType } from "./simpleToken";

function staticToken<TToken extends TokenName>(
    name: TToken,
): StaticTokenApi<TToken> {
    return (type, typeGuard) => {
        return {
            kind: "StaticToken",
            isStatic: true,
            name,
            type: simpleType(type),
            typeGuard,
        };
    };
}

function dynamicToken<
    TToken extends TokenName,
>(
    name: TToken,
): DynamicTokenApi<TToken> {
    return (resolver, tokenizer) => {
        return {
            kind: "DynamicToken",
            isStatic: false,
            name,
            resolver,
            tokenizer,
        };
    };
}

/**
 * **creeateToken**`(name,baseType,params,parser)`
 *
 * Creates a token to be used in a `Grammar`.
 */
export function createToken<
    TToken extends `${AlphaChar}${string}`,
    TParams extends TokenType,
>(
    /** the token's name */
    token: TToken,
    /** whether the token is a static type or has dynamic variants */
    kind: TParams,
): DefineTokenDetail<TToken, TParams> {
    return (
        kind === "static"
            ? staticToken(token)
            : dynamicToken(token)
    ) as DefineTokenDetail<TToken, TParams>;
}
