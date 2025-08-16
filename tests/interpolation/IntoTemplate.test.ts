import { describe, it } from "vitest";
import {
    Expect,
    FromLiteralTemplate,
    IntoTemplate,
    TemplateBlocks,
    TemplateParams,
    Test,
} from "inferred-types/types";

describe("IntoTemplate<TTpl, TArgs>", () => {

    it("single string interpolation", () => {
        type V = IntoTemplate<`Hi ${string}`, ["Bob"]>;
        type B = TemplateBlocks<`Hi ${string}`>; // =>
        type P = TemplateParams<`Hi ${string}`>; // =>
        type L = FromLiteralTemplate<`Hi ${string}`>;

        type cases = [
            Expect<Test<V, "equals", `Hi Bob`>>
        ];
    });

    it("single numeric interpolation", () => {
        type V = IntoTemplate<`Age: ${number}`, [45]>;

        type cases = [
            Expect<Test<V, "equals", `Age: 45`>>
        ];
    });

    it("string -> number -> string", () => {
        type V = IntoTemplate<`${string} is ${number} years old and his favorite color is ${string}.`, ["Bob", 45, "blue"]>;

        type cases = [
            Expect<Test<V, "equals", `Bob is 45 years old and his favorite color is blue.`>>
        ];
    });

    describe("Edge cases", () => {
        it("empty template", () => {
            type cases = [
                Expect<Test<IntoTemplate<"", []>, "equals", "">>
            ];
        });

        it("no placeholders", () => {
            type cases = [
                Expect<Test<IntoTemplate<"Hello World", []>, "equals", "Hello World">>
            ];
        });

        it("consecutive placeholders", () => {
            type cases = [
                Expect<Test<IntoTemplate<`${string}-${string}-${string}`, ["a", "b", "c"]>, "equals", "a-b-c">>,
                Expect<Test<IntoTemplate<`${number}.${number}`, [1, 2]>, "equals", "1.2">>
            ];
        });
    });

    describe("Complex patterns", () => {
        it("mixed placeholder types", () => {
            type cases = [
                Expect<Test<IntoTemplate<`User ${string} has ${number} points`, ["Alice", 150]>, "equals", "User Alice has 150 points">>,
                Expect<Test<IntoTemplate<`Status: ${string} costs ${number}`, ["active", 25]>, "equals", "Status: active costs 25">>
            ];
        });

        it("placeholders at boundaries", () => {
            type cases = [
                Expect<Test<IntoTemplate<`${string} world`, ["Hello"]>, "equals", "Hello world">>,
                Expect<Test<IntoTemplate<`Hello ${string}`, ["World"]>, "equals", "Hello World">>,
                Expect<Test<IntoTemplate<`${string}`, ["solo"]>, "equals", "solo">>
            ];
        });
    });

    describe("Real-world scenarios", () => {
        it("URL construction", () => {
            type cases = [
                Expect<Test<IntoTemplate<`https://api.example.com/users/${string}?id=${number}`, ["john", 123]>, "equals", "https://api.example.com/users/john?id=123">>,
                Expect<Test<IntoTemplate<`/api/v${number}/posts/${string}`, [2, "123"]>, "equals", "/api/v2/posts/123">>
            ];
        });

        it("SQL queries", () => {
            type cases = [
                Expect<Test<IntoTemplate<`SELECT * FROM ${string} WHERE id = ${number}`, ["users", 42]>, "equals", "SELECT * FROM users WHERE id = 42">>
            ];
        });

        it("error messages", () => {
            type cases = [
                Expect<Test<IntoTemplate<`Error ${number}: ${string} failed`, [404, "User"]>, "equals", "Error 404: User failed">>
            ];
        });
    });

    describe("Special characters", () => {
        it("symbols and punctuation", () => {
            type cases = [
                Expect<Test<IntoTemplate<`Price: $${number}.00`, [99]>, "equals", "Price: $99.00">>,
                Expect<Test<IntoTemplate<`Email: ${string}@${string}.com`, ["user", "example"]>, "equals", "Email: user@example.com">>,
                Expect<Test<IntoTemplate<`Hash: #${string}${number}`, ["tag", 123]>, "equals", "Hash: #tag123">>
            ];
        });

        it("unicode and emojis", () => {
            type cases = [
                Expect<Test<IntoTemplate<`Hello ${string} 👋`, ["世界"]>, "equals", "Hello 世界 👋">>,
                Expect<Test<IntoTemplate<`Price: ${number}€`, [99]>, "equals", "Price: 99€">>
            ];
        });
    });

    describe("Performance stress tests", () => {
        it("many placeholders", () => {
            type cases = [
                Expect<Test<IntoTemplate<`${string}-${string}-${string}-${string}-${string}`, ["a", "b", "c", "d", "e"]>, "equals", "a-b-c-d-e">>
            ];
        });

        it("long template", () => {
            type cases = [
                Expect<Test<IntoTemplate<`This is a very long template with multiple ${string} placeholders and ${number} different types`, ["interpolated", 3]>, "equals", "This is a very long template with multiple interpolated placeholders and 3 different types">>
            ];
        });
    });

    describe("Type safety", () => {
        it("literal type preservation", () => {
            type cases = [
                Expect<Test<IntoTemplate<`Hello ${string}`, ["World"]>, "equals", "Hello World">>,
                Expect<Test<IntoTemplate<`Count: ${number}`, [42]>, "equals", "Count: 42">>,
                Expect<Test<IntoTemplate<`Status: ${string}`, ["active"]>, "equals", "Status: active">>
            ];
        });

        it("union types in arguments", () => {
            type cases = [
                Expect<Test<IntoTemplate<`Value: ${string}`, ["A" | "B"]>, "equals", "Value: A" | "Value: B">>,
                Expect<Test<IntoTemplate<`Count: ${number}`, [1 | 2]>, "equals", "Count: 1" | "Count: 2">>
            ];
        });
    });

});
