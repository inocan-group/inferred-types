import type {
    AfterFirst,
    AfterFirstChar,
    As,
    Dictionary,
    EndsWith,
    Err,
    First,
    FromInputToken,
    FromKv,
    FromStringInputToken,
    KeyValue,
    MakeKeysOptional,
    Not,
    ObjectKey,
    OptionalKeys,
    RetainAfter,
    Split,
    StripAfter,
    StripTrailing,
    ToKv,
    Trim,
    TrimEach,
    UnionToTuple,
    Unset,
} from "inferred-types/types";
import type {
    InputTokenLike,
    IT_ContainerType,
    InputToken__Object
} from "src/runtime-types/type-defn/input-tokens";

type CheckForPropertyErrors<
    TKv extends readonly KeyValue[],
    TSuccess,
    TModule extends string,
    TPrefix extends string
> = [] extends TKv
    ? TSuccess
    : First<TKv>["value"] extends Error
        ? Err<
        `invalid-token/${TModule}`,
        `${TPrefix}problem with '${As<First<TKv>["key"], string>}' key, ${First<TKv>["value"]["message"]}`,
        { context: {
            prop: First<TKv>["key"];
        }; }
        >
        : CheckForPropertyErrors<
            AfterFirst<TKv>,
            TSuccess,
            TModule,
            TPrefix
        >;

type _ConvertObjectLiteral<T extends Required<InputToken__Object>> = {
    [K in keyof T]: T[K] extends InputTokenLike
        ? FromStringInputToken<T[K]>
        : never
};

export type IT_ConvertObjectLiteral<
    T extends InputToken__Object
> = CheckForPropertyErrors<
    As<ToKv<_ConvertObjectLiteral<Required<T>>>, readonly KeyValue[]>,
    MakeKeysOptional<
        _ConvertObjectLiteral<Required<T>>,
        UnionToTuple<OptionalKeys<T>> extends readonly ObjectKey[]
            ? UnionToTuple<OptionalKeys<T>>
            : never
    >,
    `object`,
    `Failed to define object literal: `
>;

type Key<T extends string> = StripTrailing<T, "?">;

type AsKv<
    T extends readonly string[]
> = {
    [K in keyof T]: T[K] extends string
        ? Split<T[K], ":"> extends [string, string]
            ? {
                key: Key<Trim<Split<T[K], ":">[0]>>;
                value: FromInputToken<
                    Trim<Split<T[K], ":">[1]>
                >;
                required: Not<EndsWith<Trim<Split<T[K], ":">[0]>, "?">>;
            }
            : Err<`invalid-token/object`, `The key/value pair '${T[K]}' is invalid!`>
        : never
};

type ParseObjectDefinition<
    T extends string,
    TParts extends readonly string[] = As<TrimEach<Split<T, "," | ";">>, readonly string[]>
> = AsKv<TParts> extends readonly KeyValue[]
    ? AsKv<TParts>
    : never;

type ParseObject<T extends string> = T extends `${string}}${string}`
    ? ParseObjectDefinition<
        Trim<T> extends `{${string}`
            ? StripAfter<
                AfterFirstChar<Trim<T>>,
                "}"
            >
            : never
    >
    : Err<`invalid-token/object`, `The token indicated an object with the '{' character but the '}' character was not found to terminate the definition!`, { token: T }>;

type Rest<T extends string> = Trim<RetainAfter<T, "}">>;

export type IT_TakeObject<
    T extends string,
    TInner extends readonly any[] = [],
    TContainers extends readonly IT_ContainerType[] = []
> = Trim<T> extends `{${string}`
    ? Trim<T> extends `{${string}}${string}`
        ? FromStringInputToken<
            Rest<T>,
            [
                ...TInner,
                ParseObject<T> extends readonly KeyValue[]
                    ? FromKv<ParseObject<T>> extends Dictionary
                        ? FromKv<ParseObject<T>>
                        : never
                    : never
            ],
            TContainers
        >

        : Err<"invalid-token/object", `An object token was started with the '{' character but no terminating '}' was found!`, { token: T }>
    : Unset;

// DEBUG CODE BELOW

// type T = "{ foo?: number, bar: string, baz: String(baz) }| string"
// type TParse = ParseObject<T>;
// type TRest = Rest<T>;
// type TObj = FromKv<ParseObject<T>>;
// type TTake = IT_TakeObject<T>;
