import type { EmptyObject, Err, ExpandRecursively, StringKeys, TokenMapper } from "inferred-types/types";

type Convert<
    TDefn extends Record<string, unknown>,
    TMap extends TokenMapper,
    TKeys extends readonly string[] = StringKeys<TDefn>,
    TResult extends Record<string, unknown> = EmptyObject
> = TKeys extends [ infer Head extends string & keyof TDefn, ...infer Rest extends readonly string[]]
    ? TDefn[Head] extends keyof TMap
        ? Convert<
            TDefn,
            TMap,
            Rest,
        TResult & Record<Head, TMap[TDefn[Head]]>
        >
        : Err<
            `invalid-key/define-object-with`,
        `The TokenMapper provided to DefineObjectWith<T> was unable to map the token type '${Head}'`
        >
    : ExpandRecursively<TResult>

;

/**
 * **DefineObjectWith**`<TDefn,TMap>`
 *
 *
 * **Related:** `DefineObject`, `TokenMapper`
 */
export type DefineObjectWith<
    TDefn extends Record<string, TKeys[number]>,
    TMap extends TokenMapper,
    TKeys extends readonly string[] = StringKeys<TMap>
> = {
    /** a object created with the `DefineObjectWith` utility */
    kind: "define-object-with";
    /** the token based definition of the type */
    defn: TDefn;
    /** the type which the tokens represent */
    type: Convert<TDefn, TMap>;
};
