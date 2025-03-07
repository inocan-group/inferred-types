import type {
    AfterFirst,
    First,
    InputToken,
    IT_ObjectLiteralDefinition,
    IT_TokenSuggest,
    SafeEncode,
    Surround,
    ToJson
} from "inferred-types/types";

export type IT_TupleToOutputToken<
    T extends readonly IT_TokenSuggest[],
    R extends string = ""
> = [] extends T
    ? Surround<R, "<<[ ", " ]>>">
    : IT_TupleToOutputToken<
        AfterFirst<T>,
        R extends ""
            ? `"${SafeEncode<First<T>>}"`
            : `${R}, "${SafeEncode<First<T>>}"`
    >

;

/**
 * **TypeToken**
 *
 * An type token is just a _valid_ string-based `InputToken`
 * wrapped in delimiters.
 *
 * **Related:** `isTypeToken()`, `asTypeToken()`, `ToTypeToken<T>`
 */
export type AsOutputToken<T extends InputToken> = T extends string
    ? `<<"${SafeEncode<T>}">>`
    : T extends IT_ObjectLiteralDefinition
        ? `<<${ToJson<T>}>>`
        : T extends readonly IT_TokenSuggest[]
            ? IT_TupleToOutputToken<T>
            : never;

// type X = AsOutputToken<{ foo: "Number(1)"; bar: "Number(2)"}>;
// type Y = AsOutputToken<[ "number", `String(I'm a lumberjack and I'm "ok")`, "string | undefined"]>;
// type Y2 = AsOutputToken<"string">;
