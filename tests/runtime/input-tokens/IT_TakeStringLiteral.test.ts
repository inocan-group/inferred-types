import { describe, it } from "vitest";
import type { Expect, IT_TakeStringLiteral, IT_Token, Test } from "inferred-types/types";

describe("IT_TakeStringLiteral<T>", () => {
    it("double quoted", () => {
        type Empty = IT_TakeStringLiteral<`""`>;
        type Complete = IT_TakeStringLiteral<`"foo"`>;
        type Partial = IT_TakeStringLiteral<`"foo" | "bar">`>;
        type StrTemplate = IT_TakeStringLiteral<`"hello{{string}}"`>;
        type NumTemplate = IT_TakeStringLiteral<`"age: {{number}}"`>;

        type Unbalanced = IT_TakeStringLiteral<`"foo`>;
        type WrongQuote = IT_TakeStringLiteral<`"foo'`>;

        type cases = [
            Expect<Test<Empty, "extends", IT_Token<"literal">>>,
            Expect<Test<Complete, "extends", IT_Token<"literal">>>,
            Expect<Test<Partial, "extends", IT_Token<"literal">>>,
            Expect<Test<StrTemplate, "extends", IT_Token<"literal">>>,
            Expect<Test<NumTemplate, "extends", IT_Token<"literal">>>,

            Expect<Test<Unbalanced, "isError", "malformed-token">>,
            Expect<Test<WrongQuote, "isError", "malformed-token">>,

            Expect<Test<Complete["type"], "equals", "foo">>,
            Expect<Test<Partial["type"], "equals", "foo">>,
            Expect<Test<StrTemplate["type"], "equals", `hello${string}`>>,
            Expect<Test<NumTemplate["type"], "equals", `age: ${number}`>>,
        ];
    });

    it("single quoted", () => {
        type Empty = IT_TakeStringLiteral<`''`>;
        type Complete = IT_TakeStringLiteral<`'foo'`>;
        type Partial = IT_TakeStringLiteral<`'foo' | 'bar'>`>;
        type StrTemplate = IT_TakeStringLiteral<`'hello{{string}}'`>;
        type NumTemplate = IT_TakeStringLiteral<`'age: {{number}}'`>;

        type Unbalanced = IT_TakeStringLiteral<`'foo`>;
        type WrongQuote = IT_TakeStringLiteral<`'foo"`>;

        type cases = [
            Expect<Test<Complete, "extends", IT_Token<"literal">>>,
            Expect<Test<Partial, "extends", IT_Token<"literal">>>,
            Expect<Test<StrTemplate, "extends", IT_Token<"literal">>>,
            Expect<Test<NumTemplate, "extends", IT_Token<"literal">>>,

            Expect<Test<Unbalanced, "isError", "malformed-token/string-literal">>,
            Expect<Test<WrongQuote, "isError", "malformed-token/string-literal">>,

            Expect<Test<Complete["type"], "equals", "foo">>,
            Expect<Test<Partial["type"], "equals", "foo">>,
            Expect<Test<StrTemplate["type"], "equals", `hello${string}`>>,
            Expect<Test<NumTemplate["type"], "equals", `age: ${number}`>>,
        ];
    });

    it("grave marker", () => {
        type Complete = IT_TakeStringLiteral<'`foo`'>;
        type Partial = IT_TakeStringLiteral<'`foo` | `bar`'>;
        type StrTemplate = IT_TakeStringLiteral<'`hello{{string}}`'>;
        type NumTemplate = IT_TakeStringLiteral<'`age: {{number}}`'>;

        type Unbalanced = IT_TakeStringLiteral<'`foo'>;
        type WrongQuote = IT_TakeStringLiteral<'`foo"'>;

        type cases = [
            Expect<Test<Complete, "extends", IT_Token<"literal">>>,
            Expect<Test<Partial, "extends", IT_Token<"literal">>>,
            Expect<Test<StrTemplate, "extends", IT_Token<"literal">>>,
            Expect<Test<NumTemplate, "extends", IT_Token<"literal">>>,

            Expect<Test<Unbalanced, "isError", "malformed-token/string-literal">>,
            Expect<Test<WrongQuote, "isError", "malformed-token/string-literal">>,

            Expect<Test<Complete["type"], "equals", "foo">>,
            Expect<Test<Partial["type"], "equals", "foo">>,
            Expect<Test<StrTemplate["type"], "equals", `hello${string}`>>,
            Expect<Test<NumTemplate["type"], "equals", `age: ${number}`>>,
        ];
    });

    it("String() bracketed", () => {
        type Complete = IT_TakeStringLiteral<`String(foo)`>;
        type Partial = IT_TakeStringLiteral<`String(foo) | String(bar)>`>;
        type StrTemplate = IT_TakeStringLiteral<`String(hello{{string}})`>;
        type NumTemplate = IT_TakeStringLiteral<`String(age: {{number}})`>;

        type Unbalanced = IT_TakeStringLiteral<`String(foo`>;
        type WrongQuote = IT_TakeStringLiteral<`'foo"`>;

        type cases = [
            Expect<Test<Complete, "extends", IT_Token<"literal">>>,
            Expect<Test<Partial, "extends", IT_Token<"literal">>>,
            Expect<Test<StrTemplate, "extends", IT_Token<"literal">>>,
            Expect<Test<NumTemplate, "extends", IT_Token<"literal">>>,

            Expect<Test<Unbalanced, "isError", "malformed-token/string-literal">>,
            Expect<Test<WrongQuote, "isError", "malformed-token/string-literal">>,

            Expect<Test<Complete["type"], "equals", "foo">>,
            Expect<Test<Partial["type"], "equals", "foo">>,
            Expect<Test<StrTemplate["type"], "equals", `hello${string}`>>,
            Expect<Test<NumTemplate["type"], "equals", `age: ${number}`>>,
        ];
    });

});
