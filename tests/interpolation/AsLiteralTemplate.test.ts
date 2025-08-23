import { describe, it } from "vitest";
import {
    AsLiteralTemplate,
    Expect,
    TemplateMap__Generics,
    Test,
} from "inferred-types/types";

describe("AsLiteralTemplate<T,[S]>", () => {

    it("default segments", () => {
        type T1 = AsLiteralTemplate<"{{string}} is {{number}} years old">;

        type cases = [
            Expect<Test<T1, "equals", `${string} is ${number} years old`>>
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



    it("using TemplateMap_Generics", () => {
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


});
