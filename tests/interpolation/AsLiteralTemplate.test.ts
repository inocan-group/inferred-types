import { describe, it } from "vitest";
import type { AsLiteralTemplate, Err, Expect, TemplateMap__Generics, Test } from "inferred-types/types";

describe("AsLiteralTemplate<T,[S]>", () => {

    it("default segments", () => {
        type T1 = AsLiteralTemplate<"{{string}} is {{number}} years old">;

        type cases = [
            Expect<Test<T1, "equals", `${string} is ${number} years old`>>
        ];
    });

    it("when no segments exist, there is no mutation of string", () => {
        type T1 = AsLiteralTemplate<`Hi there`>;

        type cases = [
            Expect<Test<T1, "equals", "Hi there">>
        ];
    });

    it("custom segments", () => {
        type T1 = AsLiteralTemplate<"{{T}} is {{U}} years old", {T: "string", U: "number"}>;
        type T2 = AsLiteralTemplate<"{{T}} is {{U}} years old", {T: "'Bob' | 'Mary'", U: "number"}>;

        type cases = [
            Expect<Test<T1, "equals", `${string} is ${number} years old`>>,
            Expect<Test<T2, "equals", `Bob is ${number} years old` | `Mary is ${number} years old`>>,
        ];
    });

    it("using TemplateMap_Generics as part of a string literal", () => {
        type G = [
            {
                name: "T";
                token: "string";
                type: string;
            },
            {
                name: "U";
                token: "number";
                type: number;
            }
        ];

        type T1 = AsLiteralTemplate<"{{T}} is {{U}} years old", TemplateMap__Generics<G>>

        type cases = [
            Expect<Test<T1, "equals", `${string} is ${number} years old`>>
        ];
    });

    it("using TemplateMap__Generics isolated as a string literal value", () => {
        // when a string literal is ONLY a dynamic segment then it will allow
        // for any type to be mutated to rather than be limited to types which
        // can be put into a string literal (aka, string, number, boolean)

        type T1 = AsLiteralTemplate<"{{T}}", { "T": "Record<string,string>" }>;
        type E1 = AsLiteralTemplate<"{{T}} ", { "T": "Record<string,string>" }>;
        type E2 = AsLiteralTemplate<" {{T}}", { "T": "Record<string,string>" }>;

        type cases = [
            Expect<Test<T1, "equals", Record<string,string>>>,
            Expect<Test<E1, "extends", Err<"invalid-type">>>,
            Expect<Test<E2, "extends", Err<"invalid-type">>>,
        ];
    });

});
