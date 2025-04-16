import type {
    AsBoolean,
    AsNumber,
    FromStringInputToken,
    ReplaceAll,
    RetainAfter,
    RetainUntil,
    StringLiteralTemplate,
    Trim,
    Unset
} from "inferred-types/types";
import type {
    IT_ContainerType
} from "src/runtime-types/type-defn/input-tokens/_base";

/**
 * The start of a literal token
 */
type LiteralTokenStart = "String(" | "Number(" | "Boolean(";

type LiteralBlock<
    T extends string,
> = {
    kind: RetainUntil<T, "(">,
    variant: RetainUntil<
        RetainAfter<T, "(">,
        ")"
    >,
    rest: RetainAfter<T, ")">
}

/**
 * Converts a Literal token to it's literal type.
 */
type ConvertLiteral<
    T extends string
> = LiteralBlock<T>["kind"] extends "String"
? StringLiteralTemplate<LiteralBlock<T>["variant"]>
: LiteralBlock<T>["kind"] extends "Boolean"
? AsBoolean<LiteralBlock<T>["variant"]>
: LiteralBlock<T>["kind"] extends "Number"
? AsNumber<LiteralBlock<T>["variant"]>
: never;



type LiteralEncoder<T extends string> = ReplaceAll<
    ReplaceAll<T, "\(", "^<op>">,
    "\)", "^<cp>"
>;

export type IT_TakeLiteral<
    T extends string,
    TInner extends readonly any[] = [],
    TContainers extends readonly IT_ContainerType[] = []
>= Trim<T> extends `${LiteralTokenStart}${string}`
? FromStringInputToken<
        Trim<LiteralBlock<Trim<T>>["rest"]>,
        [...TInner, ConvertLiteral<RetainUntil<Trim<T>, ")">>],
        TContainers
    >
: Unset;
