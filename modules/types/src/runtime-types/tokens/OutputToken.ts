import type {
    AfterFirst,
    DefineObject,
    First,
    InputToken,
    InputTokenSuggestions,
    SafeEncode,
    Surround,
    ToJson
} from "inferred-types/types";

export type IT_TupleToOutputToken<
    T extends readonly InputTokenSuggestions[],
    R extends string = ""
> = [] extends T
    ? Surround<R, "<<[ ", " ]>>">
    : IT_TupleToOutputToken<
        AfterFirst<T>,
        R extends ""
            ? `"${SafeEncode<First<T>>}"`
            : `${R}, "${SafeEncode<First<T>>}"`
    >;

/**
 * **OutputToken**
 *
 * An _output token_ is a variant of an _input token_ which is always a string
 * based value which represents a "type" in full fidelity.
 *
 * - this is a _branded_ type and to validate that a value is of this
 * type you should use the `isOutputToken()` type guard.
 */
export type OutputToken = `<<${string}>>` & {
    brand: "OutputToken";
};

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
    : T extends DefineObject
        ? `<<${ToJson<T>}>>`
        : T extends readonly InputTokenSuggestions[]
            ? IT_TupleToOutputToken<T>
            : never;

// type X = AsOutputToken<{ foo: "Number(1)"; bar: "Number(2)"}>;
// type Y = AsOutputToken<[ "number", `String(I'm a lumberjack and I'm "ok")`, "string | undefined"]>;
// type Y2 = AsOutputToken<"string">;
