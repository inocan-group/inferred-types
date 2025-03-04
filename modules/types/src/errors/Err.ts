import type { Dictionary, EmptyObject, Expand, IsDefined, MergeObjects, PascalCase, RetainUntil } from "inferred-types/types";

export type ErrOptions = {
    name?: string;
    context?: Record<string, any>;
};

export type Err<
    TType extends string = string,
    TMsg extends string = string,
    TOpt extends ErrOptions = EmptyObject
> =
TType extends `${infer Type}/${infer Subtype}`
    ? Expand<
    Error &
    {
        name: PascalCase<TOpt["name"] extends string ? TOpt["name"] : RetainUntil<TType, "/">>;
        type: Type;
        subType: Subtype;
        message: TMsg;
        context: IsDefined<TOpt["context"]> extends true ? TOpt["context"] : never;
    }
    >
    : Expand<
    Error &
    {
        name: PascalCase<TOpt["name"] extends string ? TOpt["name"] : RetainUntil<TType, "/">>;
        type: TType;
        message: TMsg;
        context: IsDefined<TOpt["context"]> extends true ? TOpt["context"] : never;
    }
    >;

/**
 * Adds "context" to an existing `Error`.
 */
export type ErrContext<
    T extends Error,
    C extends Dictionary
> = "context" extends keyof T
    ? T["context"] extends Dictionary
        ? Expand<
            Omit<T, "context"> & Record<"contect", MergeObjects<T["context"], C>>
        >
        : Expand<
            Omit<T, "context" & Record<"context", C>>
        >
    : Expand<
    T & Record<"context", C>
    >;

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
