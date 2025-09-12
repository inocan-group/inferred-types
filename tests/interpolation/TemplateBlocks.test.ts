import { describe, it } from "vitest";
import type { Expect, GetTemplateBlocks, TemplateBlocks, Test } from "inferred-types/types";

describe("TemplateBlocks<T>", () => {

    it("happy path", () => {
        type T1 = TemplateBlocks<"Hi {{string}}, you're age is {{number}}">;
        type T2 = TemplateBlocks<"Age: {{number}}, Name: {{string}}, Accepted: {{boolean}}">;

        type cases = [
            Expect<Test<T1, "equals", [ "{{string}}", "{{number}}" ]>>,
            Expect<Test<T2, "equals", [ "{{number}}", "{{string}}", "{{boolean}}" ]>>,
        ];
    });

});

describe("GetTemplateBlocks<T>", () => {

    it("happy path", () => {
        type T1 = GetTemplateBlocks<"Hi {{string}}, you're age is {{number}}">;
        type T2 = GetTemplateBlocks<"Age: {{number}}, Name: {{string}}, Accepted: {{boolean}}">;

        type cases = [
            Expect<Test<T1, "equals", [ "{{string}}", "{{number}}" ]>>,
            Expect<Test<T2, "equals", [ "{{number}}", "{{string}}", "{{boolean}}" ]>>,
        ];
    });

    it("with bespoke tokens", () => {
        type T1 = GetTemplateBlocks<"Hi {{A}}, you're age is {{B}}", "{{A}}" | "{{B}}">

        type cases = [
            Expect<Test<T1, "equals", ["{{A}}", "{{B}}"]>>
        ];
    });

});
