import type { GenericParam, IsDictionary, IsUnion } from "inferred-types/types";

export type IT_TakeKind
= | "atomic"
| "array"
| "literal"
| "kv"
| "set"
| "group"
| "union"
| "intersection"
| "function"
| "generator"
| "promise"
| "literal-array";

export type IT_Combinators
= | "union"
| "intersection"
| "none";

export type IT_KvType
= | "Record"
| "Map"
| "WeakMap";

export type IT_Generics = {
    generics: GenericParam[];
    rest: string;
};

export type IT_Parameter = {
    /** the _name_ of the parameter */
    name: string;
    /**
     * a _string-based_ token for the parameter's **type** which is
     * either:
     *   - an `InputToken`
     *   - a `GenericParam`
     */
    token: string;
    /**
     * **fromGeneric**
     *
     * returns `false` if the _type_ of this variable is NOT derived from a generic,
     * returns a string value mapping to the `name` of the generic involved.
     */
    fromGeneric: false | string;

    /**
     * the _type_ this parameter **extends** (if derived from a generic) or
     * the _type_ it **is** otherwise.
     */
    type: unknown;
};

export type IT_ParameterResults = {
    parameters: readonly IT_Parameter[];
    generics: readonly GenericParam[];
    rest: string;
};
export interface IT_Token_Base<T extends IT_TakeKind> {
    __kind: "IT_Token";
    /**
     * The category/kind of token this is (atomic, kv, literal, etc.).
     *
     * - Depending on the _kind_ additional properties may be exposed
     */
    kind: T;
    /**
     * the string token _representing_ the type
     */
    token: string;
    /**
     * the _type_ which the **token** represents
     */
    type: any;

    /**
     * the _remaining_ text string to be parsed
     */
    rest: string;
}

export interface IT_Token_Atomic extends IT_Token_Base<"atomic"> {};
export interface IT_Token_Promise extends IT_Token_Base<"promise"> {};
export interface IT_Token_Set extends IT_Token_Base<"set"> {};
export interface IT_Token_Group extends IT_Token_Base<"group"> {
    underlying: IT_Token
};
export interface IT_Token_Literal extends IT_Token_Base<"literal"> {};
export interface IT_Token_Array extends IT_Token_Base<"array"> {};
export interface IT_Token_Literal_Array extends IT_Token_Base<"literal-array"> {};

export interface IT_Token_Union extends IT_Token_Base<"union"> {
    /** all members of the union */
    members: readonly IT_Token[];
};
export interface IT_Token_Intersection extends IT_Token_Base<"intersection"> {
    /** all members of the intersection type */
    members: readonly IT_Token[];
};

export interface IT_Token_Kv extends IT_Token_Base<"kv"> {
    /** the KV container type */
    container: IT_KvType;
    /** the token for a KV container's "key" */
    keyToken: unknown;
    /** the token for a KV container's "value" */
    valueToken: unknown;
}

export interface IT_Token_Function extends IT_Token_Base<"function"> {
    /** the name of the function; `null` if anonymous */
    name: string | null;

    /** the generics used for the parameters of the function */
    generics: readonly GenericParam[];

    /** a tuple representing the parameters in the function */
    parameters: readonly IT_Parameter[];
    /**
     * whether the function is shaped as a _narrowing_ function
     * with generics (`true`) or a _static_ function (`false`).
     */
    narrowing: boolean;

    /** the tokenized representation of the return */
    returnToken: string;

    /**
     * the _return type_ of the function
     */
    returnType: unknown;

    /**
     * whether or not the function is asynchronous
     */
    isAsync: boolean;
}

/**
 * **IT_Token**`<T>`
 *
 * When a take utility for input tokens attempts to parse the token string
 * it can result in one of two conditions:
 *
 * 1. utility can not _take_ from the head of the token string and returns
 * an Error
 * 2. utility returns a `IT_Token` dictionary
 *
 * The generic `T` represents the _kind_ of token that was parsed and depending
 * on what it's set to, certain properties particular to that _kind_ will be
 * exposed.
 */
export type IT_Token<T extends IT_TakeKind = IT_TakeKind> = IsUnion<T> extends true
    ? IT_Token_Base<T>
    : T extends "atomic"
        ? IT_Token_Atomic
        : T extends "literal"
            ? IT_Token_Literal
            : T extends "set"
                ? IT_Token_Set
                : T extends "kv"
                    ? IT_Token_Kv
                    : T extends "group"
                        ? IT_Token_Group
                        : T extends "literal-array"
                            ? IT_Token_Literal_Array
                            : T extends "array"
                                ? IT_Token_Array
                                : T extends "union"
                                    ? IT_Token_Union
                                    : T extends "function"
                                        ? IT_Token_Function
                                        : T extends "promise"
                                            ? IT_Token_Promise
                                            : T extends "intersection"
                                                ? IT_Token_Intersection
                                                : never;

/**
 * a validation utility to make sure `T` is of the type `IT_TakeSuccess`
 */
export type IsInputTokenSuccess<T> = IsDictionary<T> extends true
    ? "kind" extends keyof T
        ? T["kind"] extends IT_TakeKind
            ? "rest" extends keyof T
                ? T["rest"] extends string
                    ? true
                    : false
                : false
            : false
        : false
    : false;

/**
 * the error _types_ associated with trying to parse input tokens
 */
export type IT_Failure
    = | "invalid-token" // no handler exists for the head of the token string
    | "malformed-token" // correct handler but token is malformed
    | "wrong-handler"; // the handler recognizes that it is not meant for parsing Head

/**
 * a string literal (aka, `foo`, `bar`, etc.)
 */
export type IT_StringLiteralToken = `String(${string})` | `"${string}"` | `'${string}'` | `\`${string}\``;
/**
 * a numeric literal (aka, `1`, `42`, `99`, etc.)
 */
export type IT_NumericLiteralToken = `Number(${number})` | `${number}`;
/**
 * a literal value of `true` or `false`
 */
export type IT_BooleanLiteralToken = `Boolean(${"true" | "false"})` | "true" | "false";

export type IT_TakeOutcome<T extends IT_TakeKind = IT_TakeKind>
= | IT_Token<T>
| (Error & { type: IT_Failure });
