import type {
    AlphaChar,
    TokenSyntax,
    TypedFunction,
} from "inferred-types/types";

export type TokenName = `${AlphaChar}${string}`;

/**
 * How this token uses -- or doesn't use -- parameters to create
 * variants. The parameters, if they exist, represent the args
 * which the
 */
export type TokenParamsConstraint
    = | "none"
    | readonly unknown[];

export type TokenType = "static" | "dynamic";

export type TokenIsStatic<T extends TokenParamsConstraint> = T extends "none"
    ? true
    : false;

export type ResolvedTokenType<
    T = any,
    TG extends TypedFunction = TypedFunction,
> = [type: T, tg: TG];

/**
 * A **TokenResolver** is a higher order function.
 *
 * - the first call is made by a _syntax_ to provides it's context.
 * - the second call provides the **parameters** which allow a dynamic token
 * to isolate to a discrete variant state.
 *
 * This second call is responsible for returning the `type` and `typeGuard`
 * function which validates this variant state.
 */
export type TokenResolver = <
    TSyntax extends TokenSyntax,
>(syntax: TSyntax) => <TParams extends readonly string[]>(...params: TParams) => {
    type: unknown;
    typeGuard: (val: unknown) => boolean;
};

/**
 * **Tokenizer**
 *
 * A tokenizer provides an API surface to setting type variants which
 * the given token can represent.
 *
 * - A tokenizer always returns an array of strings which will represent
 * the token's eventual parameters for this variant
 */
export type Tokenizer = (
    ...args: readonly any[]
) => readonly string[];

export interface DynamicToken<
    TToken extends TokenName = TokenName,
    TResolver extends TokenResolver = TokenResolver,
    TTokenizer extends Tokenizer = Tokenizer,
> {
    kind: "DynamicToken";
    /**
     * boolean flag indicating whether the token is static or is _dynamic_
     * (which multiple variants possible).
     */
    isStatic: false;
    /** the name of the token */
    name: TToken;
    resolver: TResolver;
    tokenizer: TTokenizer;
}

export interface StaticToken<
    TToken extends TokenName = TokenName,
    TType = unknown,
    TG extends (val: unknown) => boolean = (val: unknown) => boolean,
> {
    kind: "StaticToken";
    /**
     * boolean flag indicating whether the token is static or is _dynamic_
     * (which multiple variants possible).
     */
    isStatic: true;
    name: TToken;
    type: TType;
    typeGuard: TG;
}

export type Token<
    TToken extends TokenName = TokenName,
    T1 = any,
    T2 extends TypedFunction = any,
> = T1 extends TypedFunction
    ? DynamicToken<TToken, T1, T2>
    : StaticToken<TToken, T1, T2>;
