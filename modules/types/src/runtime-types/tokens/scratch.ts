import { As, AsNumber, Contains, Digit, EndsWith, Err, Expand, Extends, IsError, NumericChar, ObjectKey, Or, RetainAfter, RetainUntil, RetainWhile, StartsWith, StringKeys, StringLiteralTemplate, StripLeading, StripTrailing, StripUntil, Trim, TrimStart, Whitespace } from "inferred-types/types";

type AtomicTokens = "string" | "number" | "boolean" | "null" | "undefined" | "false" | "true" | "object";

type AfterAtomic = `|${string}` | "";
type AfterLiteral = `|${string}` | "";


type StringLiteralDelimiters = {
    "\"": "\"",
    "'": "'",
    "`": "`",
    "String(": ")"
}

type StringLiteralStart = Expand<keyof StringLiteralDelimiters>;
type StringLiteralEnd = Expand<keyof StringLiteralDelimiters>;


type Delimiters = {
    "Array<": ">",
    "Record<": ">",
    "Map<": ">",
    "Set<": ">",
    "{": "}",
    "[": "]",
    "\"": "\"",
    "'": "'",
    "`": "`",
    "String(": ")",
    "Number(": ")",
    "Boolean(": ")",
};

type Openners = StringKeys<Delimiters>[number];

type Variant =
| "numeric-literal"
| "string-literal"
| "boolean-literal"
| "record"
| "map"
| "set"
| "object"
| "tuple"
| "atomic"
;

type VariantType<T extends Openners | NumericChar | AtomicTokens> = Or<[
    Extends<T,NumericChar>, Extends<T, "Number(">
]> extends true
    ? "numeric-literal"
    : Or<[
        Extends<T, "`">, Extends<T,"'">, Extends<T,"\"">, Extends<T, "String(">
    ]> extends true
    ? "string-literal"
    : T extends "Boolean("
    ? "boolean-literal"
    : T extends "Record<"
    ? "record"
    : T extends "Array<"
    ? "array"
    : T extends "Map<"
    ? "map"
    : T extends "Set<"
    ? "set"
    : T extends "{"
    ? "object"
    : T extends "["
    ? "tuple"
    : never;


type Take<
    T extends string,
    S extends string = "|",
    TR = Trim<T>
> = TR extends `${Openners | NumericChar | AtomicTokens}${infer Rest}`
? TR extends `${AtomicTokens}${infer Rest}`
    ? TR extends `${infer Atomic}${Rest}`
        ? {
            variant: "atomic",
            token: Atomic,
            leftover: Trim<Rest>,
            separator: S
        }
        : never
: TR extends `${infer Start}${Rest}`
    ? Start extends Openners
            ? Rest extends `${RetainUntil<Rest, Delimiters[Start]>}${Delimiters[Start]}${infer Leftover}`
                ? {
                    variant: VariantType<Start>,
                    token: RetainUntil<Rest, Delimiters[Start]>,
                    leftover: Trim<Leftover>,
                    separator: S
                }
                : never

    : Start extends NumericChar
        ? Rest extends `${number}${infer Leftover}`
            ? {
                variant: VariantType<Start>,
                token: RetainWhile<`${Start}${Rest}`, NumericChar>,
                leftover: Trim<Leftover>,
                separator: S
            }
        : never
        : never
        : never
: never;

type X = Take<"string ">;






type ContainerStart = Expand<keyof Delimiters>;
type ContainerAfter = "" | `|${string}`;

/**
 * Separates a token type which has _variants_ between two delimiters.
 */
type Unwrap<
    TContent extends string,
    TBookends extends Record<string, string>,
    TModule extends string,
    TAfter extends string = "" | `|${string}`
> = TContent extends `${StringKeys<TBookends>[number]}${infer Rest}`
? TContent extends `${infer Begin}${Rest}`
    ? Contains<
        StripTrailing<TContent, TBookends[Begin]>,
        `invalid-token/${TModule}`
    > extends true
        ? Trim<RetainAfter<TContent, TBookends[Begin]>> extends TAfter
            ? [
                StripTrailing<TContent, TBookends[Begin]>,
                Trim<RetainAfter<TContent, TBookends[Begin]>>
            ]
            : Err<`invalid-token/${TModule}`,`Terminating token [${`invalid-token/${TModule}`}] for variant token was found in the variant itself; this is not allowed!`>
        : StripTrailing<TContent, TBookends[Begin]>
    : Err<"fuck-wit">
: Err<'end-of-world'>;


type ConvertAtomic<T extends string> = T extends "string"
? string
: T extends "number"
? number
: T extends "boolean"
? boolean
: T extends "null"
? null
: T extends "undefined"
? undefined
: T extends "unknown"
? unknown
: T extends "any"
? any
: Lowercase<T> extends "object"
? Object
: T extends "function"
? (...args: any[]) => any
: Err<"invalid-token/wide", `The token '${T}' is not a valid wide token!`>;



type AsTuple<
    T extends string
> = "tuple";

type AsArray<
    T extends string,
    U extends string | Error = Unwrap<T,{"Array<": ">"}, "array">
> = IsError<U> extends true
    ? U
    : IsError<AsType<As<U,string>>> extends true
        ? AsType<As<U,string>>
        : Array<AsType<As<U,string>>>;

type AsRecord<
    T extends string
> = "rec";

type AsMap<
    T extends string
> = "map";

type AsSet<
    T extends string
> = "set";

type AsObject<
    T extends string
> = "obj";

type ConvertRecord<
    T extends Convertable,
    KV = Convert<T>
> = KV extends Convertable
? KV["leftover"] extends `,${infer Rest}`
    ? AsType<KV["token"]> extends Error
        ? Err<`invalid-token/record`, `the key [${KV["token"]}] in Record<K,V> was invalid: ${T["token"]}`>
        : AsType<Rest> extends Error
            ? Err<`invalid-token/record`, `the value [${Rest}] in Record<K,V> was invalid: ${T["token"]}`>
            : AsType<KV["token"]> extends ObjectKey
                ? Record<
                    AsType<KV["token"]>,
                    AsType<Rest>
                >
                : Err<`invalid-token/record`, `resolved types for both key and value of Record<K,V> but the key does not extend ObjectKey!`>
: Err<`invalid-token/record`, `Unable to parse the Record<K,V>: ${T["token"]}`>
: KV extends Error
? KV
: never
;

type Convert<
    T extends Convertable
> = T["leftover"] extends ""
    ? T["variant"] extends "atomic"
    ? ConvertAtomic<T["token"]>
    : T["variant"] extends "string-literal"
    ? StringLiteralTemplate<T["token"]>
    : T["variant"] extends "numeric-literal"
    ? AsNumber<T["token"]>
    : T["variant"] extends "boolean-literal"
    ? T["token"] extends "true"
        ? true
        : false
    : T["variant"] extends "array"
        ? IsError<AsType<T["token"]>> extends true
            ? Err<`invalid-token/array`, `Detected an Array<...> but the type inside was not parsable: ${T["token"]}`>
            : Array<AsType<T["token"]>>
    : T["variant"] extends "record"
        ? ConvertRecord<T>
        : never
: "leftover"
;

type Convertable = { variant: Variant; token: string; leftover: string };


type AsType<
    T extends string,
> = Take<T> extends Convertable
? Convert<Take<T>>
: Err<`invalid-token/unknown`,`Unable to convert the token "${T}" into a type`>;


// : Trim<T> extends `${infer Atomic extends AtomicTokens}${infer Rest}`
//         ? ConvertAtomic<Atomic> | AsType<Trim<Rest>>
// : Trim<T> extends `Array<${string}`
// ? AsArray<Trim<T>>
// : Trim<T> extends `Map<${string}`
// ? AsMap<Trim<T>>
// : Trim<T> extends `Set<${string}`
// ? AsSet<Trim<T>>
// : Trim<T> extends `Map<${string}`
// ? AsMap<Trim<T>>
// : Trim<T> extends `${StringLiteralStart}${string}`
// ? Unwrap<Trim<T>, AfterStringLiteral, "string-literal"> extends Error
//     ? Unwrap<Trim<T>, AfterStringLiteral, "string-literal">
//     : StringLiteralTemplate<Unwrap<Trim<T>, AfterStringLiteral, "string-literal">>
// : "shit";


function asType<T extends string>(token: T) {
    return token as unknown as AsType<T>;
}


const a = asType("Record<string, object>")


