import type {
    Dictionary,
    EmptyObject,
    Expand,
    KebabCase,
    PascalCase,
    RetainUntil
} from "inferred-types/types";

/**
 * **TypedError**
 *
 * An `Error` which is guarenteed to have a `type` property
 * and may optionally have a `subType` property.
 */
export type TypedError<
    T extends string = string,
    S extends string | undefined = string | undefined
> = Expand<
    Error &
    {
        type: T;
        subType: S;
        [key: string]: any;
    }
>


export type Err<
    TType extends string = string,
    TMsg extends string = string,
    TCtx extends Record<string,any> = EmptyObject
> =
TType extends `${infer Type}/${infer Subtype}`
    ? Expand<
    Error &
    {
        name: PascalCase<TCtx["name"] extends string ? TCtx["name"] : RetainUntil<TType, "/">>;
        type: KebabCase<Type>;
        subType: Subtype extends string ? KebabCase<Subtype> : undefined;
        message: TMsg;
    } & TCtx
    >
    : Expand<
    Error &
    {
        name: PascalCase<TCtx["name"] extends string ? TCtx["name"] : RetainUntil<TType, "/">>;
        type: TType;
        subType: undefined;
        message: TMsg;
    } & TCtx
    >;

/**
 * Adds "context" to an existing `Error`.
 */
export type ErrContext<
    T extends Error,
    C extends Dictionary
> = Expand<Omit<T, keyof C> & C> extends Error
? Expand<Omit<T, keyof C> & C>
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
    ? ErrContext<T, C>
    : T;
