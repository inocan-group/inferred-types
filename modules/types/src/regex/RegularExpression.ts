import type {
    AsFromTo,
    IsStringLiteral,
    RegexArray,
    ReplaceAllFromTo,
} from "inferred-types/types";

type RegexToTemplate = AsFromTo<{
    "(.+?)": `${string}`;
    "(\\d+)": `${number}`;
    "(true|false)": `${boolean}`;
}>;

type AsTemplateString<
    T extends string
> = T extends `^${infer Inner}$`
    ? ReplaceAllFromTo<Inner, RegexToTemplate>
    : T extends `.*(${infer Inner}).*`
        ? `${string}${ReplaceAllFromTo<Inner, RegexToTemplate>}${string}`
        : never;

/**
 * A typed version of `RegExpExecArray`
 */
type RegexExecFn<
    TTmpl extends string
> = <T extends string>(test: T) => RegexArray<TTmpl, T>;

/**
 * Provides strong typing to the **RegExp**'s `test()` function.
 *
 * - knows whether outcome is `true` or `false` if input string is a string literal
 * - if the input string is wide then result is always just a boolean value
 */
type TestFn<
    TInput extends string,
    TTempl extends string
> = IsStringLiteral<TInput> extends true
    ? TInput extends AsTemplateString<TTempl> ? true : false
    : boolean;

/**
 * **RegularExpression**`<TLitTemplate>`
 *
 * A `RegExp` created by a runtime utility which adds a `pattern` property
 * expressing the pattern used for the regular expression in a string literal form.
 */
export type RegularExpression<
    TLitTemplate extends string
> = Omit<RegExp, "test" | "exec"> & {
    kind: "RegexpArray";
    test: <T extends string>(test: T) => TestFn<T, TLitTemplate>;
    exec: RegexExecFn<TLitTemplate>;
    pattern: TLitTemplate;
};
