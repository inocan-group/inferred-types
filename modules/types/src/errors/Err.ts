import type { Dictionary, EmptyObject, Expand, IsEqual, KebabCase, PascalCase, RetainUntil } from "inferred-types/types";

/**
 * **TypedError**
 *
 * An `Error` which is guaranteed to have a `type` property
 * and may optionally have a `subType` property.
 */
export type TypedError<
    T extends string = string,
    S extends string | undefined = string | undefined
> = Expand<
    Error
    & {
        __kind: "Error";
        type: T;
        subType: S;
        [key: string]: any;
    }
>;

type _Err<
    TType extends string = string,
    TMsg extends string = string,
    TCtx extends Record<string, any> = EmptyObject
> = TType extends `${infer Type}/${infer Subtype}`
    ? Expand<
            {
                name: PascalCase<
                    TCtx["name"] extends string
                        ? TCtx["name"]
                        : RetainUntil<TType, "/"> extends string
                            ? RetainUntil<TType, "/">
                            : never
                >;
                type: KebabCase<Type>;
                subType: Subtype extends string ? KebabCase<Subtype> : undefined;
                message: TMsg extends "" ? string : TMsg;
                cause?: unknown;
                stack?: string;
            } & TCtx
    > & Error
    : Expand<
        {
            name: PascalCase<TCtx["name"] extends string ? TCtx["name"] : RetainUntil<TType, "/">>;
            message: TMsg extends "" ? string : TMsg;
            type: TType;
            cause?: unknown;
            stack?: string;
        } & TCtx
    > & Error; ;

/**
 * handles when the "type" is a wide string
 */
type WideErrType<
    TMsg extends string,
    TCtx extends Record<string, any> = EmptyObject
>
    = string extends TMsg
        ? IsEqual<TCtx, EmptyObject> extends true
            ? Error
            : _Err<string, string, TCtx>
        : _Err<string, TMsg, TCtx>
;

/**
 * **Err**`<TType, TMsg, TCtx>`
 *
 * Create a strongly typed error with type and subType information.
 *
 * - TType assigns the type to the errors `type` property until a `/` character is found
 * - the `subType` property is the string literal portion of `TType` after the `/` character
 * - any key/value pairs on `TCtx` will be available on the error too
 *
 * **Related:**
 * - `err(type, msg, ctx)` mirrors same functionality for runtime
 * - `ErrContext<T,C>` allows _adding_ context to an existing Error
 * - `WhenErr<T,C>` allows conditionally adding context to an Error
 *   when/if `T` extends Error. Otherwise proxies `T` through "as is"
 */
export type Err<
    TType extends string = string,
    TMsg extends string = string,
    TCtx extends Record<string, any> = EmptyObject
> = string extends TType
    ? WideErrType<TMsg, TCtx>
    : _Err<TType, TMsg, TCtx>;

/**
 * Adds "context" to an existing `Error`.
 */
export type ErrContext<
    T extends Error,
    C extends Dictionary
> = Expand<Omit<T, keyof C> & C> extends Error
    ? Expand<Omit<T, keyof C> & C> & Error
    : never;

/**
 * **WhenErr**`<T,C>`
 *
 * When `T` extends **Error** then the "context" of `C` will be added to the **Error**.
 *
 * - if `T` is _not_ an error then it will be proxied through "as is".
 */
export type WhenErr<
    T,
    C extends Dictionary
> = T extends Error
    ? ErrContext<T, C> & Error
    : T;
